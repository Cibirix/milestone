import { Metadata } from 'next'
import Image from 'next/image'
import { products } from '@/data/productData'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Preview Milestone Steel Structures demo gallery images.',
}

const GalleryPage = () => (
  <>
    <section className="bg-charcoal-900 py-14 text-white">
      <div className="container-custom">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">Gallery</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Project inspiration and model previews</h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          Manufacturer media is being added. These preview images showcase model styles and building possibilities.
        </p>
      </div>
    </section>

    <section className="bg-slate-50 py-10">
      <div className="container-custom grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 18).map((product) => (
          <div key={product.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative h-60 bg-slate-100">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{product.category}</p>
              <p className="mt-1 text-sm font-semibold text-charcoal-900">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
)

export default GalleryPage
