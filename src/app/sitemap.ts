import { MetadataRoute } from 'next'
import { products } from '@/data/productData'
import { getProductsCmsContent } from '@/lib/sanity/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.milestonestructures.com').replace(/\/+$/, '')
  const cmsProducts = (await getProductsCmsContent()) || []
  const cmsSlugs = cmsProducts.map((item) => item.slug).filter(Boolean) as string[]
  const fallbackSlugs = products.map((product) => product.slug)
  const productSlugs = Array.from(new Set([...fallbackSlugs, ...cmsSlugs]))

  const staticRoutes = ['', '/products', '/gallery', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productRoutes = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
