import { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'
import { getContactPageCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const [contactPage, siteSettings] = await Promise.all([
    getContactPageCmsContent(),
    getSiteSettingsCmsContent(),
  ])

  const pageSeo = contactPage?.seo
  const defaultSeo = siteSettings?.seoDefault

  return {
    title: pageSeo?.metaTitle || 'Contact | Milestone Structures',
    description:
      pageSeo?.metaDescription || 'Contact Milestone Structures for custom metal building quotes.',
    keywords:
      pageSeo?.keywords?.length
        ? pageSeo.keywords
        : defaultSeo?.keywords?.length
          ? defaultSeo.keywords
          : undefined,
    alternates: { canonical: '/contact' },
    openGraph: pageSeo?.ogImageUrl
      ? {
          images: [{ url: pageSeo.ogImageUrl }],
        }
      : undefined,
  }
}

const ContactPage = async () => {
  const [contactPage, siteSettings] = await Promise.all([
    getContactPageCmsContent(),
    getSiteSettingsCmsContent(),
  ])
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)

  const heroEyebrow = contactPage?.heroEyebrow || 'Contact'
  const heroHeading = contactPage?.heroHeading || 'Start your custom building quote'
  const heroBody =
    contactPage?.heroBody ||
    'Share your project details and our team will guide you through your options, timelines, and configuration choices.'
  const veteranBadgeLabel = contactPage?.veteranBadgeLabel || 'Veteran-Owned & Operated'
  const contactCardHeading = contactPage?.contactCardHeading || resolvedSiteInfo.name
  const contactCardIntro = contactPage?.contactCardIntro
  const facebookLabel = contactPage?.facebookLabel || 'Visit Page'
  const warrantyNote =
    contactPage?.warrantyNote ||
    'Warranty and insulation options vary by manufacturer. We will help you compare details during your quote consultation.'

  return (
    <>
    <section className="bg-brand-900 py-14 text-white">
      <div className="container-custom">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-tan-200">{heroEyebrow}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{heroHeading}</h1>
        <p className="mt-4 max-w-3xl text-slate-200">{heroBody}</p>
      </div>
    </section>

    <section className="bg-stone-50 py-14">
      <div className="container-custom grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {veteranBadgeLabel}
          </div>
          <h2 className="font-display text-2xl text-charcoal-900">{contactCardHeading}</h2>
          {contactCardIntro && <p className="mt-3 text-sm text-charcoal-600">{contactCardIntro}</p>}
          <div className="mt-4 space-y-3 text-charcoal-700">
            <p><span className="font-semibold">Phone:</span> <a href={`tel:${resolvedSiteInfo.phoneDigits}`}>{resolvedSiteInfo.phone}</a></p>
            <p><span className="font-semibold">Email:</span> <a href={`mailto:${resolvedSiteInfo.email}`}>{resolvedSiteInfo.email}</a></p>
            <p><span className="font-semibold">Address:</span> {resolvedSiteInfo.address}</p>
            <p><span className="font-semibold">Hours:</span> {resolvedSiteInfo.hours}</p>
            <p><span className="font-semibold">Facebook:</span> <a href={resolvedSiteInfo.social.facebook} target="_blank" rel="noreferrer">{facebookLabel}</a></p>
          </div>

          <div className="mt-6 rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-tan-50 p-4 text-sm text-charcoal-700">
            {warrantyNote}
          </div>
        </div>

        <LeadForm phone={resolvedSiteInfo.phone} />
      </div>
    </section>
  </>
)
}

export default ContactPage
