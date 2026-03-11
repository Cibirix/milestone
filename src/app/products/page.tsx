import { Metadata } from 'next'
import Link from 'next/link'
import { FiPhone } from 'react-icons/fi'
import CategoryIcon, { getCategoryTheme } from '@/components/CategoryIcon'
import ModelCard from '@/components/ModelCard'
import PageHero from '@/components/PageHero'
import { getProductBySlug, products } from '@/data/productData'
import { getProductsCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { getCategoryInfoByLabel } from '@/lib/productCategories'
import { resolveSiteInfo } from '@/lib/siteSettings'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse custom metal building models from Milestone Structures.',
}

type ListingProduct = {
  slug: string
  title: string
  category: string
  stockNumber?: string
  imageSrc?: string
  imageAlt: string
  width?: string
  length?: string
  height?: string
  basePriceLabel?: string
  startingPrice?: number
}

const ProductsPage = async () => {
  const siteSettings = await getSiteSettingsCmsContent()
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)
  const cmsProducts = (await getProductsCmsContent()) || []
  const cmsProductsWithSlug = cmsProducts.filter((item) => item.slug && item.title)

  const listingProducts: ListingProduct[] = cmsProductsWithSlug.length
    ? cmsProductsWithSlug.map((product) => {
        const fallbackProduct = product.slug ? getProductBySlug(product.slug as string) : undefined
        return {
          slug: product.slug as string,
          title: product.title as string,
          category: product.category || 'Other',
          stockNumber: product.stockNumber,
          imageSrc: product.imageUrl || product.sourcePath || fallbackProduct?.image,
          imageAlt: product.imageAlt || `${product.title} image`,
          width: product.width || fallbackProduct?.width,
          length: product.length || fallbackProduct?.length,
          height: product.height || fallbackProduct?.height,
          basePriceLabel: product.basePriceLabel || fallbackProduct?.basePriceLabel,
          startingPrice: product.startingPrice,
        }
      })
    : products.map((product, index) => ({
        slug: product.slug,
        title: product.name,
        category: product.category,
        stockNumber: product.stockNumber || `MS#${index + 1}`,
        imageSrc: product.image,
        imageAlt: product.name,
        width: product.width,
        length: product.length,
        height: product.height,
        basePriceLabel: product.basePriceLabel,
      }))

  const categories = Array.from(new Set(listingProducts.map((product) => product.category)))
    .filter((category) => getCategoryInfoByLabel(category).slug !== 'steel-structures')
  const grouped = categories.map((category) => ({
    category,
    info: getCategoryInfoByLabel(category),
    items: listingProducts.filter((product) => product.category === category),
  }))

  return (
    <>
      <PageHero
        eyebrow="Product Catalog"
        title="Browse Milestone Structures Models"
        description="Every building is fully configurable. Browse by category, then open the product page for specifications and next steps."
      />

      <section className="bg-white py-12">
        <div className="container-custom grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="border-b border-slate-200 px-5 py-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rust-700">
                  Browse by Category
                </p>
              </div>
              <div className="p-3">
                {grouped.map((group) => (
                  <Link
                    key={group.category}
                    href={`/products/category/${group.info.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-charcoal-700 transition hover:bg-white hover:text-rust-700"
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${getCategoryTheme(group.category).surfaceClass}`}>
                      <CategoryIcon category={group.category} className="h-4 w-4" />
                    </span>
                    <span>{group.info.menuLabel}</span>
                    <span className="ml-auto text-xs font-semibold text-charcoal-400">{group.items.length}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl bg-[#101922] p-5 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rust-400">Need help choosing?</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Call for help with dimensions, layouts, delivery, and financing questions.
              </p>
              <a
                href={`tel:${resolvedSiteInfo.phoneDigits}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-rust-400"
              >
                <FiPhone className="text-rust-500" /> {resolvedSiteInfo.phone}
              </a>
              <Link
                href="/rto-financing"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-rust-400 transition hover:text-rust-300"
              >
                Financing options: LightStream + Allegacy
              </Link>
            </div>
          </aside>

          {/* Product groups */}
          <div className="space-y-12">
            {grouped.map((group) => (
              <section key={group.category}>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rust-700">Category</p>
                    <h2 className="mt-2 font-display text-2xl font-black text-charcoal-950 md:text-3xl">
                      {group.info.menuLabel}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-charcoal-600">{group.info.summary}</p>
                  </div>
                  <Link
                    href={`/products/category/${group.info.slug}`}
                    className="hidden shrink-0 text-sm font-bold text-rust-700 transition hover:text-rust-800 md:inline-flex"
                  >
                    View category →
                  </Link>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((product) => (
                    <ModelCard
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      title={product.title}
                      imageSrc={product.imageSrc}
                      imageAlt={product.imageAlt}
                      category={product.category}
                      phoneDigits={resolvedSiteInfo.phoneDigits}
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
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsPage
