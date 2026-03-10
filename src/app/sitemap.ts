import { MetadataRoute } from 'next'
import { products } from '@/data/productData'
import { getProductsCmsContent } from '@/lib/sanity/content'
import { toCategorySlug } from '@/lib/productCategories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.milestonestructures.com').replace(/\/+$/, '')
  const cmsProducts = (await getProductsCmsContent()) || []
  const cmsSlugs = cmsProducts.map((item) => item.slug).filter(Boolean) as string[]
  const fallbackSlugs = products.map((product) => product.slug)
  const productSlugs = Array.from(new Set([...fallbackSlugs, ...cmsSlugs]))
  const cmsCategories = cmsProducts.map((item) => item.category).filter(Boolean) as string[]
  const fallbackCategories = products.map((product) => product.category)
  const categorySlugs = Array.from(new Set([...fallbackCategories, ...cmsCategories].map((category) => toCategorySlug(category))))

  const staticRoutes = ['', '/products', '/gallery', '/about', '/contact', '/rto-financing'].map((route) => ({
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

  const categoryRoutes = categorySlugs.map((slug) => ({
    url: `${baseUrl}/products/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
