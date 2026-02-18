import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { getProductBySlug, products } from '@/data/productData'
import { siteInfo } from '@/data/siteData'

type PageProps = {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => products.map((product) => ({ slug: product.slug }))

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} | ${product.category}`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
  }
}

const ProductDetailPage = ({ params }: PageProps) => {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [`https://www.milestonestructures.com${product.image}`],
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: siteInfo.name,
    },
    category: product.category,
    sku: `MS-${product.id}`,
  }

  return (
    <>
      <Script id={`product-schema-${product.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="bg-white py-12">
        <div className="container-custom">
          <Link href="/products" className="text-sm font-semibold text-brand-700">← Back to products</Link>
          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <div className="relative h-[420px] w-full">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{product.category}</p>
              <h1 className="mt-2 font-display text-4xl text-charcoal-900">{product.name}</h1>
              <p className="mt-4 text-charcoal-700">{product.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
                <div><p className="text-charcoal-500">Width</p><p className="font-semibold text-charcoal-900">{product.width}</p></div>
                <div><p className="text-charcoal-500">Length</p><p className="font-semibold text-charcoal-900">{product.length}</p></div>
                <div><p className="text-charcoal-500">Leg Height</p><p className="font-semibold text-charcoal-900">{product.legHeight}</p></div>
                <div><p className="text-charcoal-500">Framing</p><p className="font-semibold text-charcoal-900">{product.gauge}</p></div>
                <div className="col-span-2"><p className="text-charcoal-500">Roof Style</p><p className="font-semibold text-charcoal-900">{product.roofStyle}</p></div>
              </div>

              <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-5">
                <h2 className="font-display text-xl text-brand-900">Included highlights</h2>
                <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
                  {product.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${siteInfo.phoneDigits}`} className="btn-primary">Call for Quote</a>
                <Link href="/contact" className="btn-outline">Request Pricing</Link>
                <button type="button" className="btn-secondary">Open 3D Builder</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetailPage
