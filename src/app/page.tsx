import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiCheckCircle, FiPhone, FiShield } from 'react-icons/fi'
import LeadForm from '@/components/LeadForm'
import { featuredProducts } from '@/data/productData'
import { homepageSeo, siteInfo } from '@/data/siteData'
import { getHomepageCmsContent } from '@/lib/sanity/content'

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepageCmsContent()
  const title = homepage?.seo?.metaTitle || homepageSeo.title
  const description = homepage?.seo?.metaDescription || homepageSeo.description
  const keywords = homepage?.seo?.keywords?.length ? homepage.seo.keywords : [...homepageSeo.keywords]

  return {
    title,
    description,
    keywords,
    alternates: { canonical: '/' },
  }
}

const HomePage = async () => {
  const homepage = await getHomepageCmsContent()
  const heroHeadline = homepage?.heroHeadline || 'Custom Metal Buildings Built Around Your Goals'
  const heroSubheadline = homepage?.heroSubheadline || 'From garages and workshops to agricultural and commercial structures, Milestone Steel Structures delivers configurable steel buildings with veteran-led service every step of the way.'
  const introHeading = homepage?.localIntroHeading || 'Veteran Discipline. Family Values. Built to Last.'
  const introBody = homepage?.localIntroBody || 'After serving in the Marine Corps, Josh and his wife built Milestone Steel Structures on honesty, trustworthiness, and extreme dedication to every customer. We guide you from first call to completed project so your building is delivered exactly how you envisioned it.'
  const sectionHeading = homepage?.remodelingHeading || 'Featured Demo Products'
  const sectionBody = homepage?.remodelingBody || 'These demo models show style and configuration options while your full catalog is being finalized.'

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(36,72,135,0.5),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(191,66,36,0.35),_transparent_45%)]" />
        <div className="container-custom relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">Milestone Steel Structures</p>
              <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl lg:text-6xl">{heroHeadline}</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200">{heroSubheadline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn-primary">Browse Products <FiArrowRight className="ml-2" /></Link>
                <button type="button" className="btn-secondary border-tan-300 bg-transparent text-tan-100 hover:bg-tan-200 hover:text-charcoal-900">Launch 3D Builder</button>
              </div>
              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/20 bg-white/10 p-4"><p className="text-2xl font-bold">54</p><p className="text-sm text-slate-200">Demo Models</p></div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-4"><p className="text-2xl font-bold">18+</p><p className="text-sm text-slate-200">Coverage States</p></div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-4"><p className="text-2xl font-bold">7 Days</p><p className="text-sm text-slate-200">Support Schedule</p></div>
              </div>
            </div>
            <LeadForm variant="dark" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom">
          <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Our Story</p>
            <h2 className="mt-3 font-display text-3xl text-brand-900">{introHeading}</h2>
            <p className="mt-3 max-w-4xl text-charcoal-700">{introBody}</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-charcoal-700">
              <span className="inline-flex items-center gap-2"><FiShield className="text-brand-700" /> Veteran-led team</span>
              <span className="inline-flex items-center gap-2"><FiCheckCircle className="text-brand-700" /> Honest project guidance</span>
              <span className="inline-flex items-center gap-2"><FiPhone className="text-brand-700" /> Direct communication</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-custom">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl text-charcoal-900">{sectionHeading}</h2>
              <p className="mt-2 max-w-2xl text-charcoal-600">{sectionBody}</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 font-semibold text-brand-700">View All Products <FiArrowRight /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-52 bg-slate-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{product.category}</p>
                  <h3 className="mt-2 text-lg font-semibold text-charcoal-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-charcoal-600">{product.width} x {product.length}</p>
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
            {featuredProducts.slice(0, 4).map((item) => (
              <div key={item.slug} className="relative h-40 overflow-hidden rounded-xl border border-white/15 bg-slate-800">
                <Image src={item.image} alt={item.name} fill className="object-cover opacity-85" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom rounded-2xl border border-tan-200 bg-gradient-to-r from-tan-50 to-white p-8">
          <h2 className="font-display text-3xl text-charcoal-900">Ready for your next milestone?</h2>
          <p className="mt-3 max-w-3xl text-charcoal-700">Call {siteInfo.phone} or submit the lead form to start your custom building quote. Financing and RTO programs are coming soon as partner options are finalized.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={`tel:${siteInfo.phoneDigits}`} className="btn-primary">Call {siteInfo.phone}</a>
            <Link href="/contact" className="btn-outline">Request Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
