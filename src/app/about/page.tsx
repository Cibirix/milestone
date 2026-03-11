import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FiCheckCircle, FiCompass, FiShield } from 'react-icons/fi'
import PageHero from '@/components/PageHero'
import { getAboutPageCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'

export async function generateMetadata(): Promise<Metadata> {
  const [aboutPage, siteSettings] = await Promise.all([
    getAboutPageCmsContent(),
    getSiteSettingsCmsContent(),
  ])

  const pageSeo = aboutPage?.seo
  const defaultSeo = siteSettings?.seoDefault

  return {
    title: pageSeo?.metaTitle || 'About | Milestone Structures',
    description:
      pageSeo?.metaDescription ||
      'Learn about Milestone Structures and how we guide custom metal building projects.',
    keywords:
      pageSeo?.keywords?.length
        ? pageSeo.keywords
        : defaultSeo?.keywords?.length
          ? defaultSeo.keywords
          : undefined,
    alternates: { canonical: '/about' },
    openGraph: pageSeo?.ogImageUrl
      ? {
          images: [{ url: pageSeo.ogImageUrl }],
        }
      : undefined,
  }
}

const defaultValuesList = [
  'Fully customizable building options',
  'Clear communication from quote to delivery',
  'Hands-on project support from start to finish',
  'Reliable delivery coordination',
]

const AboutPage = async () => {
  const aboutPage = await getAboutPageCmsContent()

  const heroEyebrow = aboutPage?.heroEyebrow || 'About Milestone'
  const heroHeading = aboutPage?.heroHeading || 'About Milestone Structures'
  const heroBody =
    aboutPage?.heroBody ||
    'Learn who we are, what we build, and how we guide your project from first quote to final delivery.'
  const storyCardHeading = aboutPage?.storyCardHeading || 'Owner Story'
  const storyCardBodyPrimary =
    aboutPage?.storyCardBodyPrimary ||
    'After serving in the Marine Corps, Josh and his wife launched Milestone Structures to provide straightforward guidance and reliable custom metal building solutions.'
  const storyCardBodySecondary =
    aboutPage?.storyCardBodySecondary ||
    'The focus is simple: clear communication, practical recommendations, and helping each customer move from quote to completed structure without confusion.'
  const valuesCardHeading = aboutPage?.valuesCardHeading || 'What sets us apart'
  const valuesList = aboutPage?.valuesList?.length ? aboutPage.valuesList : defaultValuesList
  return (
    <>
      <PageHero
        eyebrow={heroEyebrow}
        title={heroHeading}
        description={heroBody}
        compact
      />

    <section className="py-14">
      <div className="container-custom grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="panel-card h-fit self-start overflow-hidden">
          <div className="relative h-64">
            <Image
              src="/pages/about-story.jpg"
              alt="Owner reviewing metal building plans with field team"
              fill
              className="object-cover object-[center_18%]"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101922]/80 via-[#101922]/42 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="flex items-center gap-3">
                <span className="icon-frame border-white/20 bg-white/15 shadow-none">
                  <FiCompass />
                </span>
                <p className="section-chip bg-white/10 text-tan-100 ring-1 ring-white/20">The Story</p>
              </div>
              <h2 className="mt-3 font-display text-2xl">{storyCardHeading}</h2>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-charcoal-700">
              {storyCardBodyPrimary}
            </p>
            <p className="mt-3 text-charcoal-700">
              {storyCardBodySecondary}
            </p>
            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rust-700">How We Work</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-charcoal-900">1. Discovery</p>
                  <p className="mt-2 text-xs leading-6 text-charcoal-600">We confirm size, use case, and site details before recommending options.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-charcoal-900">2. Configuration</p>
                  <p className="mt-2 text-xs leading-6 text-charcoal-600">Roof style, doors, windows, and color selections are matched to your goals.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-charcoal-900">3. Delivery</p>
                  <p className="mt-2 text-xs leading-6 text-charcoal-600">We coordinate timelines and keep communication clear through completion.</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="panel-card overflow-hidden">
          <div className="bg-[linear-gradient(135deg,_#132547_0%,_#102140_52%,_#121519_100%)] p-8 text-white">
            <div className="flex items-center gap-3">
              <span className="icon-frame border-white/10 bg-white/10">
                <FiShield />
              </span>
              <p className="section-chip bg-white/10 text-tan-100 ring-1 ring-white/10">Why Customers Choose Us</p>
            </div>
            <h2 className="mt-5 font-display text-2xl text-white">{valuesCardHeading}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">A higher-trust experience matters as much as the building configuration itself.</p>
          </div>
          <div className="space-y-3 p-8">
            {valuesList.map((item) => (
              <p key={item} className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-charcoal-700">
                <FiCheckCircle className="mt-1 text-brand-700" /> {item}
              </p>
            ))}

            <div className="relative mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <div className="relative h-36">
                <Image
                  src="/pages/about-approach.jpg"
                  alt="Customer consultation with building plans and laptop"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#101922]/78 via-[#101922]/34 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rust-300">Our Approach</p>
                  <p className="mt-1 text-sm text-slate-200">Straight answers, practical options, and consistent follow-through.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section className="pb-14">
      <div className="container-custom">
        <div className="panel-card overflow-hidden">
          <div className="grid gap-0 md:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)]">
            <div className="relative min-h-[15rem]">
              <Image
                src="/products/milestone/24x60x12-two-car-garage.jpg"
                alt="Milestone service coverage"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101922]/72 via-[#101922]/30 to-transparent" />
            </div>
            <div className="p-7 md:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rust-700">Service Coverage</p>
              <h3 className="mt-3 font-display text-2xl text-charcoal-900">See Our Multi-State Service Area</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal-600">
                Review where Milestone currently delivers and get a quick coverage confirmation for your address.
              </p>
              <Link href="/service-area" className="btn-primary mt-5 inline-flex">
                View Service Area
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)
}

export default AboutPage
