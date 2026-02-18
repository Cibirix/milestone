const fs = require('fs')
const path = require('path')
const { getCliClient } = require('sanity/cli')

function resolveLocalFile(sourcePath) {
  if (!sourcePath || typeof sourcePath !== 'string') return null
  const normalized = sourcePath.startsWith('/') ? sourcePath.slice(1) : sourcePath
  return path.resolve(process.cwd(), '..', 'public', normalized)
}

async function run() {
  const client = getCliClient({ apiVersion: '2023-08-01' })
  const docs = await client.fetch(
    `*[_type == "galleryItem" && defined(sourcePath)]{
      _id,
      title,
      sourcePath,
      "hasImage": defined(image.asset)
    }`,
  )

  if (!Array.isArray(docs) || docs.length === 0) {
    console.log('No gallery items found.')
    return
  }

  let patched = 0
  let skippedExisting = 0
  let skippedMissingFile = 0

  for (const doc of docs) {
    if (doc.hasImage) {
      skippedExisting += 1
      continue
    }

    const filePath = resolveLocalFile(doc.sourcePath)
    if (!filePath || !fs.existsSync(filePath)) {
      skippedMissingFile += 1
      console.log(`Missing file for ${doc._id}: ${doc.sourcePath}`)
      continue
    }

    const filename = path.basename(filePath)
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename })

    await client
      .patch(doc._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit()

    patched += 1
    console.log(`Uploaded + linked image for ${doc._id} (${filename})`)
  }

  console.log(
    `Done. Patched: ${patched}, skipped (already had image): ${skippedExisting}, skipped (missing file): ${skippedMissingFile}`,
  )
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
