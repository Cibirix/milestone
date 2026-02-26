import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiCheckCircle, FiPhone, FiShield } from 'react-icons/fi'
import LeadForm from '@/components/LeadForm'
import { products } from '@/data/productData'
import { homepageSeo } from '@/data/siteData'
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
  const heroHeadline = homepage?.heroHeadline || 'Custom Metal Buildings Built Around Your Goals'
  const heroSubheadline =
    homepage?.heroSubheadline ||
    'From garages and workshops to agricultural and commercial structures, Milestone Structures delivers configurable metal buildings with veteran-owned service every step of the way.'
  const localIntroHeading = homepage?.localIntroHeading || 'Veteran Discipline. Family Values. Built to Last.'
  const localIntroBody =
    homepage?.localIntroBody ||
    'After serving in the Marine Corps, Josh and his wife built Milestone Structures on honesty, trustworthiness, and extreme dedication to every customer. We guide you from first call to completed project so your building is delivered exactly how you envisioned it.'
  const featuredHeading = homepage?.remodelingHeading || 'Featured Products'
  const featuredBody =
    homepage?.remodelingBody ||
    'Browse current Milestone Structures offerings. Every building can be customized for your exact needs.'
  const categoryCopy: Record<string, string> = {
    Garages: 'Secure, customizable garage buildings for vehicles, tools, boats, and extra storage.',
    Workshops: 'Work-ready utility and premium workshop layouts with flexible door and access options.',
    'Agricultural Buildings': 'Open-span and high-clearance agricultural buildings for equipment, hay, and farm operations.',
    Carports: 'Durable vertical-roof carports and covers for RVs, boats, and daily weather protection.',
  }
  const catalogProducts = cmsProducts.filter((product) => product.slug && product.title).length
    ? cmsProducts
      .filter((product) => product.slug && product.title)
      .map((product) => ({
        name: product.title as string,
        category: product.category || 'Other',
        image: product.imageUrl || product.sourcePath || '',
      }))
    : products.map((product) => ({
      name: product.name,
      category: product.category,
      image: product.image,
    }))

  const categoryShowcases = Array.from(new Set(catalogProducts.map((product) => product.category)))
    .map((category) => {
      const categoryProducts = catalogProducts.filter((product) => product.category === category)
      return {
        category,
        anchor: `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        image: categoryProducts[0]?.image,
        productCount: categoryProducts.length,
        sampleNames: categoryProducts.slice(0, 2).map((product) => product.name),
        description: categoryCopy[category] || 'Custom metal building options tailored to your needs.',
      }
    })
    .filter((item) => item.productCount > 0)
  const heroStars = Array.from({ length: 42 }, (_, index) => {
    const columns = 7
    const row = Math.floor(index / columns)
    const column = index % columns
    return {
      key: `star-${row}-${column}`,
      left: `${7 + column * 12 + (row % 2 ? 4 : 0)}%`,
      top: `${9 + row * 12}%`,
      size: row % 3 === 0 ? 12 : row % 2 === 0 ? 10 : 11,
      opacity: row % 2 === 0 ? 0.34 : 0.22,
    }
  })

  return (
    <>
      <section className="relative overflow-hidden bg-[#07142b] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_#0a1d3f_0%,_#07142b_55%,_#0b1220_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_16%,_rgba(61,113,203,0.35),_transparent_40%),radial-gradient(circle_at_82%_88%,_rgba(166,54,31,0.28),_transparent_40%),radial-gradient(circle_at_44%_58%,_rgba(9,25,54,0.36),_transparent_58%)]" />
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.2,
              backgroundImage:
                'repeating-linear-gradient(180deg, rgba(182,68,44,0.34) 0px, rgba(182,68,44,0.34) 10px, rgba(255,255,255,0.04) 10px, rgba(255,255,255,0.04) 22px)',
            }}
          />
          <div
            className="absolute left-0 top-0 h-[68%] w-[56%]"
            style={{
              background:
                'linear-gradient(135deg, rgba(9,31,70,0.7) 0%, rgba(8,24,55,0.46) 60%, rgba(8,24,55,0.05) 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, black 0%, black 76%, transparent 100%), linear-gradient(to bottom, black 0%, black 84%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, black 0%, black 76%, transparent 100%), linear-gradient(to bottom, black 0%, black 84%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
            }}
          />
          <div
            className="absolute left-0 top-0 h-[68%] w-[56%]"
            style={{
              background:
                'radial-gradient(circle at 24% 20%, rgba(67,122,214,0.22), transparent 56%)',
              WebkitMaskImage:
                'linear-gradient(to right, black 0%, black 78%, transparent 100%), linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, black 0%, black 78%, transparent 100%), linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
            }}
          />
          <div
            className="absolute left-0 top-0 h-[68%] w-[56%] overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, black 0%, black 82%, transparent 100%), linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, black 0%, black 82%, transparent 100%), linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
            }}
          >
            {heroStars.map((star) => (
              <span
                key={star.key}
                className="absolute text-white"
                style={{
                  left: star.left,
                  top: star.top,
                  fontSize: `${star.size}px`,
                  opacity: star.opacity,
                  textShadow: '0 0 10px rgba(255,255,255,0.18)',
                }}
              >
                ★
              </span>
            ))}
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(7,20,43,0.48)_0%,_rgba(7,20,43,0.38)_34%,_rgba(7,20,43,0.3)_62%,_rgba(7,20,43,0.32)_100%)]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 58% 48%, rgba(3,8,16,0.24) 0%, rgba(3,8,16,0.12) 18%, rgba(3,8,16,0) 34%)',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_42%,_rgba(3,8,18,0.22)_100%)]" />
        </div>
        <div className="container-custom relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                <FiShield className="text-sm" />
                Veteran-Owned &amp; Operated
              </div>
              <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{heroHeadline}</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200">{heroSubheadline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" className="rounded-lg bg-rust-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-rust-900/30 transition hover:bg-rust-700">Launch 3D Builder</button>
                <Link href="/products" className="btn-primary">Browse Products <FiArrowRight className="ml-2" /></Link>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-200/20 bg-emerald-500/10 p-4">
                  <p className="text-xl font-bold">Veteran Owned</p>
                  <p className="text-sm text-slate-200">Disciplined service &amp; direct communication</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="text-xl font-bold">Custom Built</p>
                  <p className="text-sm text-slate-200">Garages, workshops, ag buildings &amp; covers</p>
                </div>
                <div className="rounded-xl border border-tan-200/20 bg-tan-200/10 p-4">
                  <p className="text-xl font-bold">Financing Help</p>
                  <p className="text-sm text-slate-200">Guidance available while options are finalized</p>
                </div>
              </div>
            </div>
            <LeadForm variant="dark" phone={resolvedSiteInfo.phone} />
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14">
        <div className="container-custom">
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-stone-50 to-emerald-50 p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Our Story</p>
            <h2 className="mt-3 font-display text-3xl text-brand-900">{localIntroHeading}</h2>
            <p className="mt-3 max-w-4xl text-charcoal-700">{localIntroBody}</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-charcoal-700">
              <span className="inline-flex items-center gap-2"><FiShield className="text-emerald-700" /> Veteran-owned &amp; operated</span>
              <span className="inline-flex items-center gap-2"><FiCheckCircle className="text-brand-700" /> Honest project guidance</span>
              <span className="inline-flex items-center gap-2"><FiPhone className="text-brand-700" /> Direct communication</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 py-16">
        <div className="container-custom">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl text-charcoal-900">{featuredHeading}</h2>
              <p className="mt-2 max-w-2xl text-charcoal-600">{featuredBody}</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 font-semibold text-brand-700">View All Products <FiArrowRight /></Link>
          </div>
          <div className="space-y-5">
            {categoryShowcases.map((item) => (
              <Link
                key={item.category}
                href={`/products#${item.anchor}`}
                className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="flex flex-col justify-center bg-gradient-to-br from-white to-stone-50 p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                      {item.productCount} {item.productCount === 1 ? 'Model' : 'Models'} Available
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-charcoal-900 md:text-3xl">{item.category}</h3>
                    <p className="mt-3 text-charcoal-600">{item.description}</p>
                    <p className="mt-3 text-sm text-charcoal-500">
                      {item.productCount} current {item.productCount === 1 ? 'model' : 'models'} • {item.sampleNames.join(' • ')}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                      Explore {item.category} <FiArrowRight className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                  <div className="relative h-64 bg-slate-100 md:h-full md:min-h-[250px]">
                    {item.image && (
                      <>
                        <Image src={item.image} alt={`${item.category} category image`} fill className="object-cover transition duration-300 group-hover:scale-[1.02]" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/55 via-white/10 to-transparent md:from-transparent md:via-transparent md:to-transparent" />
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-900 py-16 text-white">
        <div className="container-custom grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tan-200">Warranty & Insulation</p>
            <h2 className="mt-3 font-display text-3xl">Manufacturer-backed options</h2>
            <p className="mt-3 text-slate-300">
              Warranty and insulation details vary by manufacturer. We help you compare options and choose a package that matches your region and use case.
            </p>
            <Link href="/contact" className="btn-primary mt-6">Talk With Our Team</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((item) => (
              <div key={item.slug} className="relative h-40 overflow-hidden rounded-xl border border-white/15 bg-slate-800">
                <Image src={item.image} alt={item.name} fill className="object-cover opacity-85" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14">
        <div className="container-custom rounded-2xl border border-tan-200 bg-gradient-to-r from-tan-50 via-white to-emerald-50 p-8 shadow-sm">
          <h2 className="font-display text-3xl text-charcoal-900">Ready for your next milestone?</h2>
          <p className="mt-3 max-w-3xl text-charcoal-700">Call {resolvedSiteInfo.phone} or submit the lead form to start your custom building quote. Financing guidance is available, and RTO programs are not currently offered.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={`tel:${resolvedSiteInfo.phoneDigits}`} className="btn-primary">Call {resolvedSiteInfo.phone}</a>
            <Link href="/contact" className="btn-outline">Request Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
