import { getMerchantFeedProductsCmsContent } from '@/lib/sanity/content'

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function GET() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.milestonestructures.com').replace(/\/+$/, '')
  const products = (await getMerchantFeedProductsCmsContent()) || []

  const items = products
    .filter((product) => product.slug && product.title && (product.imageUrl || product.sourcePath) && typeof product.feedPrice === 'number')
    .map((product) => {
      const title = xmlEscape(product.title as string)
      const description = xmlEscape(stripHtml((product.description || product.shortDescription || product.title) as string))
      const link = `${siteUrl}/products/${product.slug}`
      const imageLink = product.imageUrl || `${siteUrl}${(product.sourcePath || '').startsWith('/') ? product.sourcePath : `/${product.sourcePath}`}`
      const availability = xmlEscape((product.availability || 'in stock').toLowerCase())
      const currency = xmlEscape((product.currency || 'USD').toUpperCase())
      const price = Number(product.feedPrice || 0).toFixed(2)
      const googleCategory = product.category ? xmlEscape(product.category) : 'Hardware'

      return `
    <item>
      <g:id>${xmlEscape(product.slug as string)}</g:id>
      <title>${title}</title>
      <description>${description}</description>
      <link>${xmlEscape(link)}</link>
      <g:image_link>${xmlEscape(imageLink)}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${price} ${currency}</g:price>
      <g:condition>new</g:condition>
      <g:brand>${xmlEscape('Milestone Structures')}</g:brand>
      <g:product_type>${googleCategory}</g:product_type>
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xmlEscape('Milestone Structures Product Feed')}</title>
    <link>${xmlEscape(siteUrl)}</link>
    <description>${xmlEscape('Merchant feed generated from Sanity product documents')}</description>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=86400',
    },
  })
}
