import { MetadataRoute } from 'next'
import { products } from '@/data/productData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.milestonestructures.com'

  const staticRoutes = ['', '/products', '/gallery', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
