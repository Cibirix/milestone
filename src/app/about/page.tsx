import { Metadata } from 'next'
import { FiCheckCircle } from 'react-icons/fi'
import { getAboutPageCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

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
      'Learn about the veteran-owned story and mission behind Milestone Structures.',
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
  'Veteran-level discipline and reliability',
  'Hands-on project support from start to finish',
  'Transparent communication through delivery',
]

const AboutPage = async () => {
  const [aboutPage, siteSettings] = await Promise.all([
    getAboutPageCmsContent(),
    getSiteSettingsCmsContent(),
  ])
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)

  const heroEyebrow = aboutPage?.heroEyebrow || 'About Milestone'
  const heroHeading = aboutPage?.heroHeading || 'Built on discipline, honesty, and service'
  const heroBody =
    aboutPage?.heroBody ||
    'After serving in the Marine Corps, Josh launched Milestone Structures with his wife to deliver quality custom buildings backed by dependable guidance from first call to final install.'
  const veteranBadgeLabel = aboutPage?.veteranBadgeLabel || 'Veteran-Owned & Operated'
  const storyCardHeading = aboutPage?.storyCardHeading || 'Why the name Milestone?'
  const storyCardBodyPrimary =
    aboutPage?.storyCardBodyPrimary ||
    'The business name represents two journeys: a major milestone for our family as we built this company, and a milestone for each customer building something meaningful for their future.'
  const storyCardBodySecondary =
    aboutPage?.storyCardBodySecondary ||
    'Every completed structure is more than a project. It is a step toward your goals, your plans, and your legacy.'
  const valuesCardHeading = aboutPage?.valuesCardHeading || 'What sets us apart'
  const valuesList = aboutPage?.valuesList?.length ? aboutPage.valuesList : defaultValuesList
  const coverageHeading = aboutPage?.coverageHeading || 'Service Coverage'
  const coverageBody = aboutPage?.coverageBody || resolvedSiteInfo.serviceArea

  return (
    <>
    <section className="bg-brand-900 py-16 text-white">
      <div className="container-custom">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">{heroEyebrow}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{heroHeading}</h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          {heroBody}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100">
          {veteranBadgeLabel}
        </div>
      </div>
    </section>

    <section className="bg-stone-50 py-14">
      <div className="container-custom grid grid-cols-1 gap-10 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl text-charcoal-900">{storyCardHeading}</h2>
          <p className="mt-4 text-charcoal-700">
            {storyCardBodyPrimary}
          </p>
          <p className="mt-3 text-charcoal-700">
            {storyCardBodySecondary}
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
          <h2 className="font-display text-2xl text-brand-900">{valuesCardHeading}</h2>
          <div className="mt-4 space-y-3 text-charcoal-700">
            {valuesList.map((item) => (
              <p key={item} className="flex gap-2"><FiCheckCircle className="mt-1 text-brand-700" /> {item}</p>
            ))}
          </div>
        </article>
      </div>
    </section>

    <section className="bg-stone-100 py-12">
      <div className="container-custom rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-2xl text-charcoal-900">{coverageHeading}</h2>
        <p className="mt-3 text-charcoal-700">{coverageBody}</p>
      </div>
    </section>
  </>
)
}

export default AboutPage
