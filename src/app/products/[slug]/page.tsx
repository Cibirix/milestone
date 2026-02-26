import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { getProductBySlug, products } from '@/data/productData'
import { siteInfo } from '@/data/siteData'
import { getProductBySlugCmsContent, getProductsCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

type PageProps = {
  params: {
    slug: string
  }
}

export const generateStaticParams = async () => {
  const cmsProducts = (await getProductsCmsContent()) || []
  const cmsSlugs = cmsProducts.map((item) => item.slug).filter(Boolean) as string[]
  const fallbackSlugs = products.map((product) => product.slug)
  const uniqueSlugs = Array.from(new Set([...fallbackSlugs, ...cmsSlugs]))
  return uniqueSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fallbackProduct = getProductBySlug(params.slug)
  const cmsProduct = await getProductBySlugCmsContent(params.slug)
  const metadataTitle = cmsProduct?.title || fallbackProduct?.name
  const metadataCategory = cmsProduct?.category || fallbackProduct?.category
  const metadataDescription = cmsProduct?.description || cmsProduct?.shortDescription || fallbackProduct?.description

  return {
    title: metadataTitle ? `${metadataTitle}${metadataCategory ? ` | ${metadataCategory}` : ''}` : 'Product Not Found',
    description: metadataDescription,
    alternates: { canonical: `/products/${params.slug}` },
  }
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const siteSettings = await getSiteSettingsCmsContent()
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)
  const fallbackProduct = getProductBySlug(params.slug)
  const cmsProduct = await getProductBySlugCmsContent(params.slug)

  if (!fallbackProduct && !cmsProduct) notFound()

  const title = cmsProduct?.title || fallbackProduct?.name || 'Product'
  const category = cmsProduct?.category || fallbackProduct?.category
  const description = cmsProduct?.description || cmsProduct?.shortDescription || fallbackProduct?.description
  const imageSrc = cmsProduct?.imageUrl || cmsProduct?.sourcePath || fallbackProduct?.image
  const imageAlt = cmsProduct?.imageAlt || fallbackProduct?.name || `${title} image`
  const highlights = (cmsProduct?.highlights?.length ? cmsProduct.highlights : fallbackProduct?.highlights) || []
  const width = cmsProduct?.width || fallbackProduct?.width
  const length = cmsProduct?.length || fallbackProduct?.length
  const height = cmsProduct?.height || fallbackProduct?.height
  const roofStyle = cmsProduct?.roofStyle || fallbackProduct?.roofStyle
  const financingAvailable = typeof cmsProduct?.financingAvailable === 'boolean' ? cmsProduct.financingAvailable : fallbackProduct?.financingAvailable
  const rtoAvailable = typeof cmsProduct?.rtoAvailable === 'boolean' ? cmsProduct.rtoAvailable : fallbackProduct?.rtoAvailable
  const basePriceLabel = cmsProduct?.basePriceLabel || fallbackProduct?.basePriceLabel
  const sourceNumber = cmsProduct?.sourceNumber || fallbackProduct?.sourceNumber

  const schemaImage =
    fallbackProduct?.image
      ? `https://www.milestonestructures.com${fallbackProduct.image}`
      : cmsProduct?.imageUrl
        ? cmsProduct.imageUrl
        : cmsProduct?.sourcePath
          ? `https://www.milestonestructures.com${cmsProduct.sourcePath}`
          : undefined

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    image: schemaImage ? [schemaImage] : undefined,
    description,
    brand: {
      '@type': 'Brand',
      name: siteInfo.name,
    },
    category,
    sku: sourceNumber ? `MS-${sourceNumber}` : undefined,
  }

  const specItems = [
    { label: 'Width', value: width },
    { label: 'Length', value: length },
    { label: 'Height', value: height },
    { label: 'Roof Style', value: roofStyle },
    { label: 'Financing', value: typeof financingAvailable === 'boolean' ? (financingAvailable ? 'Available' : 'Not Available') : undefined },
    { label: 'RTO', value: typeof rtoAvailable === 'boolean' ? (rtoAvailable ? 'Available' : 'Not Available') : undefined },
  ].filter((item) => item.value)

  return (
    <>
      <Script id={`product-schema-${params.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section className="bg-stone-50 py-12">
        <div className="container-custom">
          <Link href="/products" className="text-sm font-semibold text-brand-700">← Back to products</Link>
          <div className="mt-4 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="self-start overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <div className="relative h-[420px] w-full">
                {imageSrc && (
                  <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Veteran-Owned &amp; Operated
              </div>
              {category && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{category}</p>
              )}
              <h1 className="mt-2 font-display text-4xl text-charcoal-900">{title}</h1>
              {description && <p className="mt-4 text-charcoal-700">{description}</p>}

              {(typeof cmsProduct?.startingPrice === 'number' || (basePriceLabel && basePriceLabel.toLowerCase() !== 'n/a')) && (
                <p className="mt-3 text-sm font-semibold text-rust-700">
                  {typeof cmsProduct?.startingPrice === 'number'
                    ? `Starting at $${cmsProduct.startingPrice}. Final pricing depends on configuration, size, and delivery.`
                    : basePriceLabel}
                </p>
              )}

              {!!specItems.length && (
                <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
                  {specItems.map((item) => (
                    <div key={item.label}>
                      <p className="text-charcoal-500">{item.label}</p>
                      <p className="font-semibold text-charcoal-900">{item.value}</p>
                    </div>
                  ))}
                  {sourceNumber && (
                    <div className="col-span-2">
                      <p className="text-charcoal-500">Product Reference</p>
                      <p className="font-semibold text-charcoal-900">S{sourceNumber}</p>
                    </div>
                  )}
                </div>
              )}

              {!!highlights.length && (
                <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-5">
                  <h2 className="font-display text-xl text-brand-900">Included highlights</h2>
                  <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
                    {highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${resolvedSiteInfo.phoneDigits}`} className="btn-primary">Call for Quote</a>
                <Link href="/contact" className="btn-outline">Request Pricing</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetailPage
