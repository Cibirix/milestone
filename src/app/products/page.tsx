import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { productCategories, products } from '@/data/productData'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse demo metal building models from Milestone Steel Structures.',
}

const ProductsPage = () => (
  <>
    <section className="bg-brand-900 py-14 text-white">
      <div className="container-custom">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">Product Catalog</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Custom metal building options</h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          Browse our current demo lineup. Every structure can be customized for dimensions, doors, insulation, panel orientation, and finishes.
        </p>
      </div>
    </section>

    <section className="bg-white py-6">
      <div className="container-custom flex flex-wrap gap-2">
        {productCategories.map((category) => (
          <span key={category} className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-800">
            {category}
          </span>
        ))}
      </div>
    </section>

    <section className="bg-slate-50 py-10">
      <div className="container-custom grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-52 bg-slate-100">
              <Image src={product.image} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{product.category}</p>
              <h2 className="mt-2 text-lg font-semibold text-charcoal-900">{product.name}</h2>
              <p className="mt-1 text-sm text-charcoal-600">{product.width} x {product.length}</p>
              <p className="mt-3 text-sm font-semibold text-brand-700">View Details</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  </>
)

export default ProductsPage
