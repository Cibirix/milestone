import { Metadata } from 'next'
import GalleryMasonry from '@/components/GalleryMasonry'
import PageHero from '@/components/PageHero'
import { products } from '@/data/productData'
import { getGalleryCmsContent, getProductsCmsContent } from '@/lib/sanity/content'

export const metadata: Metadata = {
  title: 'Gallery | Milestone Structures',
  description: 'Explore recent Milestone Structures projects, layouts, and custom building styles.',
}

const GalleryPage = async () => {
  const cmsGalleryItems = (await getGalleryCmsContent()) || []
  const cmsProducts = (await getProductsCmsContent()) || []

  const galleryTilesFromCms = cmsGalleryItems
    .filter((item) => (item.imageUrl || item.sourcePath) && item.title)
    .map((item, index) => ({
      id: `gallery-${index}-${item.title}`,
      title: item.title as string,
      category: item.category || 'Project',
      image: (item.imageUrl || item.sourcePath) as string,
      alt: item.alt || `${item.title} gallery image`,
      location: item.location,
    }))

  const galleryTilesFromProducts = cmsProducts.filter((item) => item.slug && item.title).length
    ? cmsProducts
        .filter((item) => (item.imageUrl || item.sourcePath) && item.slug && item.title)
        .map((item) => ({
          id: `product-${item.slug}`,
          title: item.title as string,
          category: item.category || 'Other',
          image: (item.imageUrl || item.sourcePath) as string,
          alt: item.imageAlt || `${item.title} model image`,
          sku: item.stockNumber,
          href: `/products/${item.slug}`,
        }))
    : products.map((product, index) => ({
        id: `fallback-${product.slug}`,
        title: product.name,
        category: product.category,
        image: product.image,
        alt: `${product.name} model image`,
        sku: product.stockNumber || `MS#${index + 1}`,
        href: `/products/${product.slug}`,
      }))

  const galleryTiles = galleryTilesFromCms.length
    ? [...galleryTilesFromCms, ...galleryTilesFromProducts]
    : galleryTilesFromProducts

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Project Gallery"
        description="Browse recent Milestone structures by category and open the matching model page when you are ready."
        compact
      />

    <section className="py-12">
      <div className="container-custom">
        <GalleryMasonry tiles={galleryTiles} />
      </div>
    </section>
    </>
  )
}

export default GalleryPage
