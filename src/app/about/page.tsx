import { Metadata } from 'next'
import { FiCheckCircle, FiCompass, FiShield } from 'react-icons/fi'
import CoverageMap from '@/components/CoverageMap'
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
      <div className="container-custom grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="panel-card p-8 md:p-10">
          <div className="flex items-center gap-3">
            <span className="icon-frame border-slate-200 bg-brand-50 text-brand-800 shadow-none">
              <FiCompass />
            </span>
            <p className="section-chip bg-brand-50 text-brand-800 ring-1 ring-brand-200/80">The Story</p>
          </div>
          <h2 className="font-display text-2xl text-charcoal-900">{storyCardHeading}</h2>
          <p className="mt-4 text-charcoal-700">
            {storyCardBodyPrimary}
          </p>
          <p className="mt-3 text-charcoal-700">
            {storyCardBodySecondary}
          </p>
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
          </div>
        </article>
      </div>
    </section>

    <section className="pb-14">
      <div className="container-custom">
        <CoverageMap />
      </div>
    </section>
  </>
)
}

export default AboutPage
