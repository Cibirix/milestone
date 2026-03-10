import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { FiArrowRight, FiPhone, FiShield, FiTool, FiZap } from 'react-icons/fi'
import ModelCard from '@/components/ModelCard'
import { getProductBySlug, products } from '@/data/productData'
import { siteInfo } from '@/data/siteData'
import { getProductBySlugCmsContent, getProductsCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

type PageProps = {
  params: { slug: string }
}

export const generateStaticParams = async () => {
  const cmsProducts = (await getProductsCmsContent()) || []
  const cmsSlugs = cmsProducts.map((item) => item.slug).filter(Boolean) as string[]
  const fallbackSlugs = products.map((p) => p.slug)
  return Array.from(new Set([...fallbackSlugs, ...cmsSlugs])).map((slug) => ({ slug }))
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

const whyPoints = [
  {
    icon: FiShield,
    title: 'Built to Last',
    body: 'Heavy-gauge galvanized steel framing engineered for decades of reliable performance in any climate.',
  },
  {
    icon: FiZap,
    title: 'Fully Custom',
    body: 'Choose your dimensions, roof style, colors, doors, and windows. Every detail built around your site.',
  },
  {
    icon: FiTool,
    title: 'Professional Delivery',
    body: 'We coordinate logistics from the factory directly to your prepared site.',
  },
]

const ProductDetailPage = async ({ params }: PageProps) => {
  const siteSettings = await getSiteSettingsCmsContent()
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)
  const fallbackProduct = getProductBySlug(params.slug)
  const cmsProduct = await getProductBySlugCmsContent(params.slug)

  if (!fallbackProduct && !cmsProduct) notFound()

  const title = cmsProduct?.title || fallbackProduct?.name || 'Product'
  const category = cmsProduct?.category || fallbackProduct?.category || 'Other'
  const description = cmsProduct?.description || cmsProduct?.shortDescription || fallbackProduct?.description
  const imageSrc = cmsProduct?.imageUrl || cmsProduct?.sourcePath || fallbackProduct?.image
  const imageAlt = cmsProduct?.imageAlt || fallbackProduct?.name || `${title} image`
  const width = cmsProduct?.width || fallbackProduct?.width
  const length = cmsProduct?.length || fallbackProduct?.length
  const height = cmsProduct?.height || fallbackProduct?.height
  const roofStyle = cmsProduct?.roofStyle || fallbackProduct?.roofStyle
  const financingAvailable = typeof cmsProduct?.financingAvailable === 'boolean' ? cmsProduct.financingAvailable : fallbackProduct?.financingAvailable
  const rtoAvailable = typeof cmsProduct?.rtoAvailable === 'boolean' ? cmsProduct.rtoAvailable : fallbackProduct?.rtoAvailable
  const basePriceLabel = cmsProduct?.basePriceLabel || fallbackProduct?.basePriceLabel
  const startingPrice = typeof cmsProduct?.startingPrice === 'number' ? cmsProduct.startingPrice : undefined
  const fallbackStockNumber = fallbackProduct ? `MS#${products.findIndex((p) => p.slug === fallbackProduct.slug) + 1}` : undefined
  const stockNumber = cmsProduct?.stockNumber || fallbackProduct?.stockNumber || fallbackStockNumber
  const sourceNumber = cmsProduct?.sourceNumber || fallbackProduct?.sourceNumber

  // Related products
  const allCmsProducts = (await getProductsCmsContent()) || []
  const allProducts = allCmsProducts.filter((p) => p.slug && p.title).length
    ? allCmsProducts
        .filter((p) => p.slug && p.title && p.slug !== params.slug)
        .map((p) => {
          const fb = p.slug ? getProductBySlug(p.slug as string) : undefined
          return {
            slug: p.slug as string,
            name: p.title as string,
            category: p.category || 'Other',
            image: p.imageUrl || p.sourcePath || fb?.image || '',
            startingPrice: p.startingPrice,
            basePriceLabel: p.basePriceLabel || fb?.basePriceLabel,
          }
        })
    : products
        .filter((p) => p.slug !== params.slug)
        .map((p) => ({
          slug: p.slug,
          name: p.name,
          category: p.category,
          image: p.image,
          startingPrice: undefined as number | undefined,
          basePriceLabel: p.basePriceLabel,
        }))

  const relatedProducts = [
    ...allProducts.filter((p) => p.category === category),
    ...allProducts.filter((p) => p.category !== category),
  ].slice(0, 4)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    image: imageSrc ? [imageSrc.startsWith('http') ? imageSrc : `https://www.milestonestructures.com${imageSrc}`] : undefined,
    description,
    brand: { '@type': 'Brand', name: siteInfo.name },
    category,
    sku: stockNumber || (sourceNumber ? `MS#${sourceNumber}` : undefined),
  }

  // Specs — displayed ONCE in the right panel
  const specs = [
    { label: 'Width', value: width },
    { label: 'Length', value: length },
    { label: 'Height', value: height },
    { label: 'Roof Style', value: roofStyle },
  ].filter((s) => s.value) as { label: string; value: string }[]

  const orderDetails = [
    { label: 'Financing', value: financingAvailable ? 'LightStream + Allegacy' : undefined },
    { label: 'Rent-to-Own', value: rtoAvailable ? 'Available' : undefined },
  ].filter((s) => s.value) as { label: string; value: string }[]

  const cleanDescription = description?.replace(
    /^((This|The)\s+)?\d{1,2}x\d{1,3}x\d{1,2}\s+/i,
    '',
  )

  return (
    <>
      <Script
        id={`product-schema-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ── PRODUCT DETAIL ── Stitch 2 layout */}
      <section className="bg-white py-8 md:py-10">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-charcoal-400">
            <Link href="/" className="transition hover:text-charcoal-900">Home</Link>
            <span>/</span>
            <Link href="/products" className="transition hover:text-charcoal-900">Products</Link>
            <span>/</span>
            <span className="text-charcoal-700">{title}</span>
          </nav>

          {/* Stitch 2: 7/12 image + 5/12 info */}
          <div className="grid items-start gap-8 lg:grid-cols-12">

            {/* ── LEFT: Image ── */}
            <div className="lg:col-span-7 space-y-3">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_12px_40px_-16px_rgba(15,29,54,0.14)]">
                <div className="relative aspect-[4/3]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-200" />
                  )}
                  {/* Main View label */}
                  <div className="absolute bottom-4 right-4 rounded bg-[#101922]/65 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                    Main View
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_-18px_rgba(15,29,54,0.18)]">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal-400">
                  Why This Model Works
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {whyPoints.map((point) => (
                    <div key={point.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rust-50 text-rust-600">
                          <point.icon className="text-sm" />
                        </span>
                        <p className="text-sm font-bold text-charcoal-900">{point.title}</p>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-charcoal-500">{point.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Info panel ── */}
            <div className="lg:col-span-5 space-y-5">

              {/* SKU line */}
              <div className="flex items-center gap-2">
                {stockNumber && (
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-400">
                    SKU Number: {stockNumber}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl font-black leading-tight text-charcoal-950 md:text-4xl">
                {title}
              </h1>

              {/* Description */}
              {cleanDescription && (
                <p className="text-base leading-7 text-charcoal-600">{cleanDescription}</p>
              )}

              {/* Price */}
              <div className="flex items-end gap-4 border-y border-slate-100 py-4">
                <p className="text-3xl font-black text-charcoal-950">
                  {typeof startingPrice === 'number'
                    ? `Starting at $${startingPrice.toLocaleString()}`
                    : 'Call for Quote'}
                </p>
                {basePriceLabel && basePriceLabel.toLowerCase() !== 'n/a' && typeof startingPrice !== 'number' && (
                  <p className="mb-1 text-sm text-charcoal-500">{basePriceLabel}</p>
                )}
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${resolvedSiteInfo.phoneDigits}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-rust-700 px-4 py-3 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(185,28,28,0.4)] transition hover:bg-rust-800"
                >
                  <FiPhone className="text-xs" /> Call for Quote
                </a>
                <a
                  href={resolvedSiteInfo.threeDBuilderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-charcoal-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-charcoal-800"
                >
                  <FiTool className="text-xs" /> Open 3D Builder
                </a>
              </div>

              {/* Specs — Stitch 2 style: border-left grid */}
              {specs.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal-400">
                    Product Specifications
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex flex-col border-l-2 border-rust-200 pl-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400">{spec.label}</span>
                        <span className="mt-0.5 text-base font-bold text-charcoal-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order details (financing, RTO) */}
              {orderDetails.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="grid grid-cols-2 gap-4">
                    {orderDetails.map((detail) => (
                      <div key={detail.label} className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">{detail.label}</span>
                        <span className="mt-0.5 text-sm font-semibold text-charcoal-800">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                  {financingAvailable && (
                    <Link
                      href="/rto-financing"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-rust-700 transition hover:text-rust-800"
                    >
                      View financing options <FiArrowRight className="text-[11px]" />
                    </Link>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-14">
          <div className="container-custom">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rust-700">More to Explore</p>
                <h2 className="mt-2 font-display text-2xl font-black text-charcoal-950 md:text-3xl">
                  Other Models You May Like
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden items-center gap-2 text-sm font-bold text-rust-700 transition hover:text-rust-800 md:inline-flex"
              >
                View All Products <FiArrowRight />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((product) => (
                <ModelCard
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  title={product.name}
                  imageSrc={product.image}
                  imageAlt={product.name}
                  category={product.category}
                  imageHeightClassName="h-44"
                  priceLabel={
                    typeof product.startingPrice === 'number'
                      ? `Starting at $${product.startingPrice.toLocaleString()}`
                      : product.basePriceLabel && product.basePriceLabel.toLowerCase() !== 'n/a'
                        ? product.basePriceLabel
                        : 'Call for Quote'
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetailPage
