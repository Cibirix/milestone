import fs from 'node:fs'
import path from 'node:path'
import { getCliClient } from 'sanity/cli'

type ProductDoc = {
  _id: string
  title?: string
  sourcePath?: string
  image?: {
    asset?: {
      _ref?: string
    }
  }
  imageAlt?: string
}

async function run() {
  const client = getCliClient({ apiVersion: '2024-10-01' }).withConfig({ useCdn: false })

  const products = await client.fetch<ProductDoc[]>(
    `*[_type == "product"] | order(title asc){
      _id,
      title,
      sourcePath,
      image{asset->{_id}},
      imageAlt
    }`,
  )

  const repoRoot = path.resolve(process.cwd(), '..')
  const publicDir = path.join(repoRoot, 'public')

  let uploaded = 0
  let skippedNoSource = 0
  let skippedMissingFile = 0
  let alreadyHadImage = 0
  let patched = 0

  for (const product of products) {
    const sourcePath = product.sourcePath?.trim()
    if (!sourcePath) {
      skippedNoSource += 1
      console.log(`skip(no sourcePath): ${product.title || product._id}`)
      continue
    }

    const relativePath = sourcePath.startsWith('/') ? sourcePath.slice(1) : sourcePath
    const filePath = path.join(publicDir, relativePath)

    if (!fs.existsSync(filePath)) {
      skippedMissingFile += 1
      console.log(`skip(missing file): ${product.title || product._id} -> ${filePath}`)
      continue
    }

    if (product.image?.asset?._ref) {
      alreadyHadImage += 1
      console.log(`replace(existing image): ${product.title || product._id}`)
    } else {
      console.log(`upload: ${product.title || product._id}`)
    }

    const stream = fs.createReadStream(filePath)
    const asset = await client.assets.upload('image', stream, {
      filename: path.basename(filePath),
      label: product.title || path.basename(filePath),
    })
    uploaded += 1

    const patchPayload: Record<string, unknown> = {
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    }

    if (!product.imageAlt && product.title) {
      patchPayload.imageAlt = product.title
    }

    await client.patch(product._id).set(patchPayload).commit()
    patched += 1
  }

  console.log('\nDone.')
  console.log(`Products found: ${products.length}`)
  console.log(`Assets uploaded: ${uploaded}`)
  console.log(`Products patched: ${patched}`)
  console.log(`Replaced existing images: ${alreadyHadImage}`)
  console.log(`Skipped (no sourcePath): ${skippedNoSource}`)
  console.log(`Skipped (missing file): ${skippedMissingFile}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})

