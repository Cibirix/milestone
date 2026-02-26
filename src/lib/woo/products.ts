import { wooFetchJson } from './client'
import type { WooProduct } from './types'

function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export type CommerceProduct = {
  id: string
  slug: string
  name: string
  category?: string
  image?: { src: string; alt: string }
  description?: string
  priceLabel?: string
}

export async function getWooProducts(limit = 200): Promise<CommerceProduct[]> {
  const perPage = 100
  const maxPages = Math.max(1, Math.ceil(limit / perPage))
  const products: WooProduct[] = []

  for (let page = 1; page <= maxPages; page += 1) {
    const pageItems = await wooFetchJson<WooProduct[]>({
      path: '/wp-json/wc/v3/products',
      searchParams: {
        status: 'publish',
        per_page: perPage,
        page,
        orderby: 'date',
        order: 'desc',
      },
    })

    products.push(...pageItems)
    if (pageItems.length < perPage) break
  }

  return products.map(mapWooProduct)
}

export async function getWooProductBySlug(slug: string): Promise<CommerceProduct | null> {
  const items = await wooFetchJson<WooProduct[]>({
    path: '/wp-json/wc/v3/products',
    searchParams: {
      status: 'publish',
      slug,
      per_page: 1,
    },
  })

  const product = items[0]
  return product ? mapWooProduct(product) : null
}

function getPriceMode(): 'call' | 'starting' | 'show' {
  const raw = (process.env.NEXT_PUBLIC_PRICE_MODE || 'call').trim().toLowerCase()
  if (raw === 'starting') return 'starting'
  if (raw === 'show') return 'show'
  return 'call'
}

function mapWooProduct(product: WooProduct): CommerceProduct {
  const category = product.categories?.[0]?.name
  const imageSrc = product.images?.[0]?.src
  const imageAlt = product.images?.[0]?.alt || `${product.name} photo`
  const description = stripHtml(product.short_description || product.description || '')

  // Pricing is optional (many clients are quote-first, not e-commerce checkout).
  const rawPrice = product.price || product.sale_price || product.regular_price
  const priceMode = getPriceMode()
  const priceLabel = (priceMode === 'show' && rawPrice)
    ? `$${rawPrice}`
    : (priceMode === 'starting' && rawPrice)
        ? `Starting at $${rawPrice}`
        : undefined

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    category,
    image: imageSrc ? { src: imageSrc, alt: imageAlt } : undefined,
    description: description || undefined,
    priceLabel,
  }
}
