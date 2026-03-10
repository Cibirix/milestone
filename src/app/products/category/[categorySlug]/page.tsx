import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowRight, FiCheckCircle, FiShield, FiTool, FiZap } from 'react-icons/fi'
import { MdVerified } from 'react-icons/md'
import CategoryIcon from '@/components/CategoryIcon'
import ModelCard from '@/components/ModelCard'
import { getProductBySlug, products } from '@/data/productData'
import { getProductsCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { getCategoryInfoByLabel, getCategoryInfoBySlug, getCategoryMenuItems, toCategorySlug } from '@/lib/productCategories'
import { resolveSiteInfo } from '@/lib/siteSettings'

type PageProps = {
  params: {
    categorySlug: string
  }
}

type ListingProduct = {
  slug: string
  title: string
  category: string
  stockNumber?: string
  imageSrc?: string
  imageAlt: string
  basePriceLabel?: string
  startingPrice?: number
}

async function getListingProducts(): Promise<ListingProduct[]> {
  const cmsProducts = (await getProductsCmsContent()) || []
  const cmsProductsWithSlug = cmsProducts.filter((item) => item.slug && item.title)

  if (cmsProductsWithSlug.length) {
    return cmsProductsWithSlug.map((product) => {
      const fallbackProduct = product.slug ? getProductBySlug(product.slug as string) : undefined
      return {
        slug: product.slug as string,
        title: product.title as string,
        category: product.category || 'Other',
        stockNumber: product.stockNumber,
        imageSrc: product.imageUrl || product.sourcePath || fallbackProduct?.image,
        imageAlt: product.imageAlt || `${product.title} image`,
        basePriceLabel: product.basePriceLabel || fallbackProduct?.basePriceLabel,
        startingPrice: product.startingPrice,
      }
    })
  }

  return products.map((product, index) => ({
    slug: product.slug,
    title: product.name,
    category: product.category,
    stockNumber: product.stockNumber || `MS#${index + 1}`,
    imageSrc: product.image,
    imageAlt: product.name,
    basePriceLabel: product.basePriceLabel,
  }))
}

export async function generateStaticParams() {
  const listingProducts = await getListingProducts()
  const slugs = Array.from(new Set(listingProducts.map((item) => toCategorySlug(item.category))))
  return slugs.map((categorySlug) => ({ categorySlug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const listingProducts = await getListingProducts()
  const category = listingProducts.find((item) => toCategorySlug(item.category) === params.categorySlug)?.category
  const categoryInfo = category ? getCategoryInfoByLabel(category) : getCategoryInfoBySlug(params.categorySlug)

  if (!categoryInfo) return { title: 'Category Not Found' }

  return {
    title: `${categoryInfo.menuLabel} | Products`,
    description: categoryInfo.summary,
    alternates: { canonical: `/products/category/${params.categorySlug}` },
  }
}

const trustItems = [
  { icon: FiShield, label: 'Certified wind & snow ratings' },
  { icon: FiCheckCircle, label: 'Veteran-built quality' },
  { icon: FiZap, label: 'Fast professional installation' },
]

const brandPoints = [
  {
    icon: FiShield,
    title: 'Veteran-Led Quality',
    body: 'Military precision and accountability in every structure we build and every customer we serve.',
  },
  {
    icon: MdVerified,
    title: 'Nationwide Delivery',
    body: 'Professional logistics handling from the factory to your site. Available across our full coverage area.',
  },
  {
    icon: FiTool,
    title: 'Fully Customizable',
    body: 'Choose your size, roof style, colors, doors, and windows. Configured around your exact needs.',
  },
]

const CategoryProductsPage = async ({ params }: PageProps) => {
  const siteSettings = await getSiteSettingsCmsContent()
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)
  const listingProducts = await getListingProducts()
  const categoryProducts = listingProducts.filter((item) => toCategorySlug(item.category) === params.categorySlug)

  if (!categoryProducts.length) notFound()

  const categoryLabel = categoryProducts[0].category
  const categoryInfo = getCategoryInfoByLabel(categoryLabel)
  const featuredProduct = categoryProducts[0]
  const otherCategories = getCategoryMenuItems().filter((c) => c.slug !== params.categorySlug).slice(0, 4)

  return (
    <>
      {/* ── HERO ── Stitch 3 split-column */}
      <section className="relative overflow-hidden bg-[#101922] py-16 md:py-24">
        {/* Subtle texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 75% 60%, rgba(185,28,28,0.1) 0%, transparent 55%)' }}
        />

        <div className="container-custom relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left: text */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-rust-500">
                <span className="h-[2px] w-8 bg-rust-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Premium Steel Solutions</span>
              </div>

              <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
                {categoryInfo.menuLabel.replace('Steel ', 'Steel ')}
              </h1>

              <p className="max-w-lg text-lg leading-8 text-slate-400">
                {categoryInfo.summary}
              </p>

              <div className="flex flex-col gap-3 pt-2">
                {trustItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="shrink-0 text-rust-500" />
                    <span className="text-sm font-medium text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${resolvedSiteInfo.phoneDigits}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-rust-700 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(185,28,28,0.5)] transition hover:bg-rust-800"
                >
                  Call for a Quote
                </a>
                <a
                  href={resolvedSiteInfo.threeDBuilderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Open 3D Builder <FiArrowRight />
                </a>
              </div>
            </div>

            {/* Right: featured product image */}
            <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_-24px_rgba(0,0,0,0.5)] group">
              <div className="relative h-[420px]">
                {featuredProduct.imageSrc ? (
                  <Image
                    src={featuredProduct.imageSrc}
                    alt={featuredProduct.imageAlt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="h-full w-full bg-charcoal-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101922]/90 via-[#101922]/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rust-400">Featured Model</p>
                <h3 className="mt-1 font-display text-2xl font-black text-white">{featuredProduct.title}</h3>
                {featuredProduct.imageSrc && (
                  <Link
                    href={`/products/${featuredProduct.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition hover:text-white"
                  >
                    View details <FiArrowRight className="text-xs" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="bg-slate-50 py-16">
        <div className="container-custom">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-black text-charcoal-950">
                {categoryInfo.menuLabel} Models
              </h2>
              <p className="mt-2 text-sm text-charcoal-500">
                {categoryProducts.length} model{categoryProducts.length !== 1 ? 's' : ''} available · all customizable to your exact dimensions
              </p>
            </div>
            <Link
              href="/products"
              className="shrink-0 text-sm font-bold text-rust-700 transition hover:text-rust-800"
            >
              View all categories →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <ModelCard
                key={product.slug}
                href={`/products/${product.slug}`}
                title={product.title}
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt}
                category={product.category}
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

          {/* Other categories */}
          {otherCategories.length > 0 && (
            <div className="mt-14 border-t border-slate-200 pt-10">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-400">Browse Other Categories</p>
              <div className="flex flex-wrap gap-3">
                {otherCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products/category/${cat.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-charcoal-700 transition hover:border-rust-300 hover:text-rust-700"
                  >
                    <CategoryIcon category={cat.label} className="h-4 w-4 text-rust-600" />
                    {cat.menuLabel}
                  </Link>
                ))}
                <Link
                  href="/products"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-charcoal-700 transition hover:border-charcoal-900 hover:bg-charcoal-900 hover:text-white"
                >
                  All Products <FiArrowRight />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BRAND REINFORCEMENT ── Stitch 3 bottom section */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="container-custom">
          <div className="grid gap-10 md:grid-cols-3">
            {brandPoints.map((point) => (
              <div key={point.title} className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rust-50 text-rust-700">
                  <point.icon className="text-xl" />
                </div>
                <h4 className="text-xl font-bold text-charcoal-950">{point.title}</h4>
                <p className="text-sm leading-7 text-charcoal-500">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default CategoryProductsPage
