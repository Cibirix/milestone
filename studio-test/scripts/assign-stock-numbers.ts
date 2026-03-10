import { getCliClient } from 'sanity/cli'

type ProductDoc = {
  _id: string
  title?: string
  sourceNumber?: number
  stockNumber?: string
}

function toStockNumber(index: number) {
  return `MS#${index}`
}

function parseStockNumber(value?: string) {
  if (!value) return null
  const match = value.match(/^MS#(\d+)$/)
  if (!match) return null
  const parsed = Number(match[1])
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

async function run() {
  const client = getCliClient({ apiVersion: '2024-10-01' }).withConfig({ useCdn: false })
  const products = await client.fetch<ProductDoc[]>(
    `*[_type == "product"] | order(coalesce(sourceNumber, 9999) asc, title asc){
      _id,
      title,
      sourceNumber,
      stockNumber
    }`,
  )

  let highestExisting = 0
  for (const product of products) {
    const parsed = parseStockNumber(product.stockNumber)
    if (parsed && parsed > highestExisting) highestExisting = parsed
  }

  let nextNumber = highestExisting > 0 ? highestExisting + 1 : 1
  let updated = 0

  for (const product of products) {
    if (parseStockNumber(product.stockNumber)) continue
    const stockNumber = toStockNumber(nextNumber)
    nextNumber += 1
    await client.patch(product._id).set({ stockNumber }).commit()
    updated += 1
    console.log(`assigned ${stockNumber} -> ${product.title || product._id}`)
  }

  console.log(`Done. Updated ${updated} products. Total products: ${products.length}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
