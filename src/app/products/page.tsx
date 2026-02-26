import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/productData'
import { getProductsCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse custom metal building models from Milestone Structures.',
}

type ListingProduct = {
  slug: string
  title: string
  category: string
  imageSrc?: string
  imageAlt: string
  width?: string
  length?: string
  height?: string
  roofStyle?: string
  description?: string
  basePriceLabel?: string
  startingPrice?: number
  financingAvailable?: boolean
  rtoAvailable?: boolean
}

const categoryDescriptions: Record<string, string> = {
  Garages: 'Vehicle storage, enclosed work space, and multi-door layouts built for everyday use.',
  Workshops: 'Utility and premium workshop designs with flexible access and durable vertical roof systems.',
  'Agricultural Buildings': 'High-clearance farm-ready structures for equipment storage and agricultural operations.',
  Carports: 'Open-span protection for RVs, boats, and vehicles with efficient weather runoff.',
}

const categoryAnchor = (category: string) => `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

const ProductsPage = async () => {
  const siteSettings = await getSiteSettingsCmsContent()
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)
  const cmsProducts = (await getProductsCmsContent()) || []
  const cmsProductsWithSlug = cmsProducts.filter((item) => item.slug && item.title)

  const listingProducts: ListingProduct[] = cmsProductsWithSlug.length
    ? cmsProductsWithSlug.map((product) => ({
      slug: product.slug as string,
      title: product.title as string,
      category: product.category || 'Other',
      imageSrc: product.imageUrl || product.sourcePath,
      imageAlt: product.imageAlt || `${product.title} image`,
      width: product.width,
      length: product.length,
      height: product.height,
      roofStyle: product.roofStyle,
      description: product.shortDescription || product.description,
      basePriceLabel: product.basePriceLabel,
      startingPrice: product.startingPrice,
      financingAvailable: product.financingAvailable,
      rtoAvailable: product.rtoAvailable,
    }))
    : products.map((product) => ({
      slug: product.slug,
      title: product.name,
      category: product.category,
      imageSrc: product.image,
      imageAlt: product.name,
      width: product.width,
      length: product.length,
      height: product.height,
      roofStyle: product.roofStyle,
      description: product.description,
      basePriceLabel: product.basePriceLabel,
      financingAvailable: product.financingAvailable,
      rtoAvailable: product.rtoAvailable,
    }))

  const categories = Array.from(new Set(listingProducts.map((product) => product.category)))
  const grouped = categories.map((category) => ({
    category,
    anchor: categoryAnchor(category),
    description: categoryDescriptions[category] || 'Custom metal building options available in this category.',
    items: listingProducts.filter((product) => product.category === category),
  }))

  return (
    <>
      <section className="bg-brand-900 py-14 text-white">
        <div className="container-custom">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">Product Catalog</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-100">
            Veteran-Owned &amp; Operated
          </div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Explore Milestone Structures products</h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            Browse current building categories and product options. Every structure can be configured for dimensions, access, and features.
          </p>
        </div>
      </section>

      <section className="bg-stone-100 py-10">
        <div className="container-custom grid grid-cols-1 gap-8 xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Categories</p>
              <nav className="mt-4 space-y-2">
                {grouped.map((group) => (
                  <a
                    key={group.category}
                    href={`#${group.anchor}`}
                    className="block rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-charcoal-700 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {group.category}
                    <span className="ml-2 text-xs font-medium text-charcoal-500">({group.items.length})</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-10">
            {grouped.map((group) => (
              <section key={group.category} id={group.anchor} className="scroll-mt-32">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Browse Category</p>
                  <h2 className="mt-2 font-display text-3xl text-charcoal-900">{group.category}</h2>
                  <p className="mt-2 max-w-3xl text-charcoal-600">{group.description}</p>
                </div>

                <div className="space-y-5">
                  {group.items.map((product) => (
                    <article
                      key={product.slug}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
                        <div className="bg-gradient-to-br from-white to-stone-50 p-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{product.category}</p>
                          <h3 className="mt-2 text-2xl font-semibold text-charcoal-900">{product.title}</h3>

                          <p className="mt-2 text-sm text-charcoal-600">
                            {[product.width, product.length, product.height].filter(Boolean).join(' × ')}
                            {product.roofStyle ? ` • ${product.roofStyle}` : ''}
                          </p>

                          <p className="mt-3 line-clamp-3 text-sm text-charcoal-700">
                            {product.description || 'Call our team to discuss configuration, options, and delivery for this model.'}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                            {typeof product.financingAvailable === 'boolean' && (
                              <span className={`rounded-full px-3 py-1 ${product.financingAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                Financing {product.financingAvailable ? 'Available' : 'Unavailable'}
                              </span>
                            )}
                            {typeof product.rtoAvailable === 'boolean' && (
                              <span className={`rounded-full px-3 py-1 ${product.rtoAvailable ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-600'}`}>
                                RTO {product.rtoAvailable ? 'Available' : 'Unavailable'}
                              </span>
                            )}
                          </div>

                          <div className="mt-5 border-t border-slate-200 pt-4">
                            <p className="text-3xl font-bold text-emerald-700">
                              {typeof product.startingPrice === 'number'
                                ? `$${product.startingPrice.toLocaleString()}`
                                : 'Call for Quote'}
                            </p>
                            <p className="mt-1 text-sm text-charcoal-500">
                              {typeof product.startingPrice === 'number'
                                ? 'Starting price (final pricing varies by configuration)'
                                : product.basePriceLabel && product.basePriceLabel.toLowerCase() !== 'n/a'
                                  ? product.basePriceLabel
                                  : 'Pricing varies by options, location, and certifications'}
                            </p>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3">
                            <a href={`tel:${resolvedSiteInfo.phoneDigits}`} className="btn-outline px-5 py-2.5">
                              Call {resolvedSiteInfo.phone}
                            </a>
                            <Link href={`/products/${product.slug}`} className="btn-primary px-5 py-2.5">
                              View Details
                            </Link>
                          </div>
                        </div>

                        <Link
                          href={`/products/${product.slug}`}
                          className="group relative block min-h-[260px] border-t border-slate-200 bg-slate-100 lg:min-h-[320px] lg:border-l lg:border-t-0"
                          aria-label={`View details for ${product.title}`}
                        >
                          {product.imageSrc && (
                            <Image
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              fill
                              className="object-cover transition duration-300 group-hover:scale-[1.02]"
                            />
                          )}
                          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                            {product.width && <span className="rounded-md bg-white/95 px-3 py-1 text-xs font-semibold text-charcoal-800 shadow-sm">W {product.width}</span>}
                            {product.length && <span className="rounded-md bg-white/95 px-3 py-1 text-xs font-semibold text-charcoal-800 shadow-sm">L {product.length}</span>}
                            {product.height && <span className="rounded-md bg-white/95 px-3 py-1 text-xs font-semibold text-charcoal-800 shadow-sm">H {product.height}</span>}
                          </div>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsPage
