import { Metadata } from 'next'
import { products } from '@/data/productData'
import ProductGalleryCarousel from '@/components/ProductGalleryCarousel'
import { getProductsCmsContent } from '@/lib/sanity/content'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse Milestone Structures product gallery images.',
}

const GalleryPage = async () => {
  const cmsProducts = (await getProductsCmsContent()) || []
  const galleryProducts = cmsProducts.filter((item) => item.slug && item.title).length
    ? cmsProducts
      .filter((item) => item.slug && item.title)
      .map((item) => ({
        slug: item.slug as string,
        name: item.title as string,
        category: item.category || 'Other',
        image: item.imageUrl || item.sourcePath || '',
      }))
      .filter((item) => item.image)
    : products.map((product) => ({
      slug: product.slug,
      name: product.name,
      category: product.category,
      image: product.image,
    }))

  return (
    <>
    <section className="bg-charcoal-900 py-14 text-white">
      <div className="container-custom">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">Gallery</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Product gallery and building inspiration</h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          Browse current product images and building examples. More manufacturer media will be added as the catalog grows.
        </p>
      </div>
    </section>

    <section className="bg-stone-50 py-10">
      <div className="container-custom">
        <ProductGalleryCarousel products={galleryProducts.slice(0, 24)} />
      </div>
    </section>
    </>
  )
}

export default GalleryPage
