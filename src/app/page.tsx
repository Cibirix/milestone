import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  FiArrowRight,
  FiCheckCircle,
  FiCompass,
  FiDollarSign,
  FiMapPin,
  FiShield,
  FiTool,
  FiTruck,
} from 'react-icons/fi'
import CategoryIcon from '@/components/CategoryIcon'
import LeadForm from '@/components/LeadForm'
import ModelCard from '@/components/ModelCard'
import { getProductBySlug, products } from '@/data/productData'
import { homepageSeo } from '@/data/siteData'
import { getCategoryInfoByLabel } from '@/lib/productCategories'
import { getHomepageCmsContent, getProductsCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepageCmsContent()

  return {
    title: homepage?.seo?.metaTitle || homepageSeo.title,
    description: homepage?.seo?.metaDescription || homepageSeo.description,
    keywords: homepage?.seo?.keywords?.length ? homepage.seo.keywords : [...homepageSeo.keywords],
    alternates: { canonical: '/' },
  }
}

const HomePage = async () => {
  const homepage = await getHomepageCmsContent()
  const siteSettings = await getSiteSettingsCmsContent()
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)
  const cmsProducts = (await getProductsCmsContent()) || []

  const heroHeadline = homepage?.heroHeadline || 'Precision Steel, Veteran Integrity.'
  const heroSubheadline =
    homepage?.heroSubheadline ||
    'Custom metal buildings engineered for your home or business. Delivered and installed with the discipline and care of veteran-led service.'
  const localIntroHeading = homepage?.localIntroHeading || 'Built Different. Backed by Veterans.'
  const localIntroBody =
    homepage?.localIntroBody ||
    'Milestone Structures is a veteran-owned and operated metal building dealer focused on straight talk, clean product guidance, and fully customizable steel structures for any need.'
  const featuredHeading = homepage?.remodelingHeading || 'Explore Our Building Categories'
  const featuredBody =
    homepage?.remodelingBody ||
    'From covered parking to full commercial workshops — every structure is configurable to your exact dimensions, roof style, and site requirements.'

  const catalogProducts = cmsProducts.filter((product) => product.slug && product.title).length
    ? cmsProducts
        .filter((product) => product.slug && product.title)
        .map((product) => {
          const fallbackProduct = product.slug ? getProductBySlug(product.slug as string) : undefined
          return {
            slug: product.slug as string,
            name: product.title as string,
            category: product.category || 'Other',
            image: product.imageUrl || product.sourcePath || fallbackProduct?.image || '',
            stockNumber: product.stockNumber,
            description: product.shortDescription || product.description || '',
            width: product.width || fallbackProduct?.width,
            length: product.length || fallbackProduct?.length,
            height: product.height || fallbackProduct?.height,
            startingPrice: product.startingPrice,
            basePriceLabel: product.basePriceLabel || fallbackProduct?.basePriceLabel,
          }
        })
    : products.map((product, index) => ({
        slug: product.slug,
        name: product.name,
        category: product.category,
        image: product.image,
        stockNumber: product.stockNumber || `MS#${index + 1}`,
        description: product.description,
        width: product.width,
        length: product.length,
        height: product.height,
        startingPrice: undefined,
        basePriceLabel: product.basePriceLabel,
      }))

  const categoryShowcases = Array.from(new Set(catalogProducts.map((product) => product.category)))
    .map((category) => {
      const categoryProducts = catalogProducts.filter((product) => product.category === category)
      const categoryInfo = getCategoryInfoByLabel(category)
      return {
        category,
        categorySlug: categoryInfo.slug,
        menuLabel: categoryInfo.menuLabel,
        image: categoryProducts[0]?.image,
        description: categoryInfo.summary,
      }
    })
    .filter((item) => item.image)

  const popularProducts = catalogProducts.slice(0, 6)

  const trustPoints = [
    {
      title: 'Veteran-led service',
      body: 'Clear communication and hands-on project guidance throughout the process.',
      icon: FiShield,
    },
    {
      title: 'Fully customizable',
      body: 'Garages, workshops, barns, carports, and commercial structures.',
      icon: FiCompass,
    },
    {
      title: 'Nationwide Delivery',
      body: 'We coordinate logistics from the factory directly to your site.',
      icon: FiTruck,
    },
    {
      title: 'Financing options',
      body: 'Flexible rent-to-own and financing paths available.',
      icon: FiDollarSign,
    },
    {
      title: 'Multi-state coverage',
      body: 'Serving the Mid-Atlantic, Southeast, South-Central, and beyond.',
      icon: FiMapPin,
    },
  ]

  return (
    <>
      {/* ── HERO ── full-bleed image with lighter overlay */}
      <section className="relative flex min-h-[74vh] items-center overflow-hidden md:min-h-[78vh] lg:min-h-[80vh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-realistic.jpg"
            alt="Milestone Structures steel building"
            fill
            className="object-cover object-[center_42%]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101922]/52 via-[#101922]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101922]/24 via-transparent to-transparent" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-[40%] opacity-[0.2]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'44\' height=\'36\' viewBox=\'0 0 44 36\'%3E%3Cpolygon points=\'22,3 25.6,13.4 36.6,13.4 27.8,19.8 31.2,30.2 22,23.8 12.8,30.2 16.2,19.8 7.4,13.4 18.4,13.4\' fill=\'white\' fill-opacity=\'.62\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
              backgroundSize: '44px 36px',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.35) 78%, transparent 100%)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.35) 78%, transparent 100%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-[40%] opacity-[0.16]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'44\' height=\'36\' viewBox=\'0 0 44 36\'%3E%3Cpolygon points=\'22,3 25.6,13.4 36.6,13.4 27.8,19.8 31.2,30.2 22,23.8 12.8,30.2 16.2,19.8 7.4,13.4 18.4,13.4\' fill=\'white\' fill-opacity=\'.54\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
              backgroundSize: '44px 36px',
              backgroundPosition: '22px 16px',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.88), rgba(0,0,0,0.3) 78%, transparent 100%)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,0.88), rgba(0,0,0,0.3) 78%, transparent 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 py-14 md:py-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
              <FiShield className="text-rust-400" />
              Veteran-Owned & Operated
            </span>

            <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[5.2rem]">
              {heroHeadline}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
              {heroSubheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={resolvedSiteInfo.threeDBuilderUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-rust-700 px-8 py-4 text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(185,28,28,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rust-800 hover:shadow-[0_20px_40px_-12px_rgba(185,28,28,0.5)]"
              >
                <FiTool className="transition-transform group-hover:rotate-12" />
                Launch 3D Builder
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Trust items */}
            <div className="mt-9 flex w-full flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-white/20 bg-[#101922]/42 px-4 py-3 backdrop-blur-sm">
              {['Nationwide Delivery', 'Certified Wind & Snow Ratings', 'No Hidden Fees'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 whitespace-nowrap">
                  <FiCheckCircle className="shrink-0 text-base text-rust-300" />
                  <span className="text-base font-semibold tracking-[0.01em] text-white/92">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST CARDS ── */}
      <section className="bg-white pt-8 pb-14 md:pt-10">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-rust-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-rust-700 ring-1 ring-rust-200/80">
              What Milestone Delivers
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-charcoal-950 md:text-4xl">
              {localIntroHeading}
            </h2>
            <p className="mt-3 text-base leading-7 text-charcoal-600">{localIntroBody}</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {trustPoints.map((card) => (
              <div
                key={card.title}
                className="card-hover group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-rust-200"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-charcoal-900 transition-colors group-hover:bg-rust-50 group-hover:text-rust-700">
                  <card.icon className="text-lg" />
                </span>
                <h3 className="mt-4 text-base font-bold leading-tight text-charcoal-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-charcoal-500">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-slate-50 py-16">
        <div className="container-custom">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-block rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-charcoal-600 ring-1 ring-slate-200">
                Building Categories
              </span>
              <h2 className="mt-4 font-display text-[2rem] font-black leading-tight text-charcoal-950 md:text-[2.6rem]">
                {featuredHeading}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-charcoal-600">{featuredBody}</p>
            </div>
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-rust-700 transition hover:text-rust-800"
            >
              View All Products <FiArrowRight />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryShowcases.map((item, index) => (
              <Link
                key={item.category}
                href={`/products/category/${item.categorySlug}`}
                className={`group relative overflow-hidden rounded-3xl bg-charcoal-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-8'}`}
                style={{ aspectRatio: '4/5' }}
              >
                <Image
                  src={item.image!}
                  alt={item.menuLabel}
                  fill
                  className="object-cover opacity-60 transition duration-700 group-hover:scale-110 group-hover:opacity-80"
                  loading="eager"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101922] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 backdrop-blur-md transition group-hover:bg-white/20">
                    <CategoryIcon category={item.category} className="h-3.5 w-3.5 text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{item.menuLabel}</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-300 transition-colors group-hover:text-white">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rust-400 transition-all group-hover:gap-3 group-hover:text-rust-300">
                    Explore <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR MODELS ── */}
      <section className="bg-white py-14">
        <div className="container-custom">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-block rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-charcoal-600 ring-1 ring-slate-200">
                Popular Models
              </span>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-charcoal-950 md:text-4xl">
                Browse Current Milestone Models
              </h2>
              <p className="mt-2 text-sm leading-7 text-charcoal-500">
                Browse the current lineup, then move into the right product page for details and the next step.
              </p>
            </div>
            <Link
              href="/products"
              className="shrink-0 text-sm font-bold text-rust-700 transition hover:text-rust-800 sm:mb-1"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {popularProducts.map((product) => (
              <ModelCard
                key={product.slug}
                href={`/products/${product.slug}`}
                title={product.name}
                imageSrc={product.image}
                imageAlt={product.name}
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

          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-charcoal-700 transition hover:border-charcoal-900 hover:bg-charcoal-900 hover:text-white"
            >
              View All Models <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISSION STRIP ── dark section with red accent */}
      <section className="relative overflow-hidden bg-[#101922] py-20 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="container-custom relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-block rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-rust-400">
                Our Mission
              </span>
              <h2 className="mt-5 font-display text-[2rem] font-black leading-tight text-white md:text-[2.6rem]">
                Built on Integrity. Delivered with Discipline.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-400">
                Milestone Structures was founded by veterans who wanted to bring the same standard of accountability they
                carried in service to every customer interaction and every structure delivered.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Honest pricing', body: 'No hidden fees. The quote you see is what you build around.' },
                  { title: 'American materials', body: 'We prioritize domestic steel and trusted manufacturing partners.' },
                  { title: 'Standing behind the work', body: 'Our relationship continues well past the day the truck pulls away.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-rust-500" />
                    <div>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '15+', label: 'Years of experience' },
                { value: '50', label: 'States served' },
                { value: '10k+', label: 'Structures delivered' },
                { value: '4.9★', label: 'Average customer rating' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <p className="font-display text-4xl font-black text-rust-500">{stat.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE / CONTACT ── */}
      <section id="quote-form" className="bg-slate-50 py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch">
            <article className="panel-card overflow-hidden">
              <div className="relative h-full min-h-[24rem]">
                <Image
                  src="/products/milestone/26x30x12-walk-out-garage.jpg"
                  alt="Milestone quote support"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#101922]/84 via-[#101922]/52 to-[#101922]/26" />

                <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white md:p-10">
                  <div>
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-rust-300">
                      Start Your Quote
                    </span>
                    <h2 className="mt-4 font-display text-3xl font-black leading-tight md:text-4xl">
                      Tell us what you need. We handle the next step.
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                      Submit one short form and our team will follow up with sizing guidance, product options, delivery info, and financing paths.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-rust-300">
                        <FiCheckCircle /> Fast Response
                      </p>
                      <p className="mt-1 text-sm text-slate-200">Quick follow-up from a real project advisor.</p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-rust-300">
                        <FiTool /> 3D Builder Support
                      </p>
                      <p className="mt-1 text-sm text-slate-200">Move directly from quote into live configuration.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <div className="lg:pl-2">
              <LeadForm phone={resolvedSiteInfo.phone} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
