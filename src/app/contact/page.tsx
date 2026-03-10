import { Metadata } from 'next'
import Image from 'next/image'
import { FaFacebookF } from 'react-icons/fa'
import { FiClock, FiExternalLink, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import LeadForm from '@/components/LeadForm'
import PageHero from '@/components/PageHero'
import { getContactPageCmsContent, getFinancingPageCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
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
  const [contactPage, financingPage, siteSettings] = await Promise.all([
    getContactPageCmsContent(),
    getFinancingPageCmsContent(),
    getSiteSettingsCmsContent(),
  ])
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)

  const heroEyebrow = contactPage?.heroEyebrow || 'Contact'
  const heroHeading = contactPage?.heroHeading || 'Contact Milestone Structures'
  const heroBody =
    contactPage?.heroBody ||
    'Tell us what you are planning and we will help you choose the right building, options, and next step.'
  const contactCardHeading = contactPage?.contactCardHeading || resolvedSiteInfo.name
  const contactCardIntro = contactPage?.contactCardIntro
  const facebookLabel = contactPage?.facebookLabel || 'Visit Page'
  const warrantyNote =
    contactPage?.warrantyNote ||
    'Warranty and insulation options vary by manufacturer. We will help you compare details during your quote consultation.'
  const financingPartnersHeading = contactPage?.financingPartnersHeading || 'Financing Partners'
  const financingPartnersIntro =
    contactPage?.financingPartnersIntro ||
    'Apply directly with either lender. Most customers complete this step in just a few minutes.'
  const lightstreamLabel =
    financingPage?.lightstreamButtonLabel ||
    financingPage?.legacyLightstreamButtonLabel ||
    'LightStream'
  const lightstreamUrl =
    financingPage?.lightstreamButtonUrl ||
    financingPage?.legacyLightstreamButtonUrl ||
    'https://www.lightstream.com/apply'
  const allegacyLabel =
    financingPage?.allegacyButtonLabel ||
    financingPage?.legacyAllegacyButtonLabel ||
    'Allegacy Bank'
  const allegacyUrl =
    financingPage?.allegacyButtonUrl ||
    financingPage?.legacyAllegacyButtonUrl ||
    'https://allegrologin.com/app/a5ef9ce5'
  const lightstreamCtaLabel = contactPage?.lightstreamCtaLabel || 'Apply online'
  const lightstreamImagePath =
    contactPage?.lightstreamImagePath || '/products/milestone/26x30x12-walk-out-garage.jpg'
  const allegacyCtaLabel = contactPage?.allegacyCtaLabel || 'Open partner link'
  const allegacyImagePath =
    contactPage?.allegacyImagePath || '/products/milestone/30x60x12-premium-workshop.jpg'

  return (
    <>
      <PageHero
        eyebrow={heroEyebrow}
        title={heroHeading}
        description={heroBody}
        compact
      />

    <section className="py-14">
      <div className="container-custom grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="panel-card p-8 md:p-10">
          <h2 className="font-display text-2xl text-charcoal-900">{contactCardHeading}</h2>
          {contactCardIntro && <p className="mt-3 text-sm text-charcoal-600">{contactCardIntro}</p>}
          <div className="mt-6 space-y-3 text-charcoal-700">
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FiPhone className="mt-1 text-brand-700" /><span><span className="font-semibold">Phone:</span> <a href={`tel:${resolvedSiteInfo.phoneDigits}`}>{resolvedSiteInfo.phone}</a></span></p>
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FiMail className="mt-1 text-brand-700" /><span><span className="font-semibold">Email:</span> <a href={`mailto:${resolvedSiteInfo.email}`}>{resolvedSiteInfo.email}</a></span></p>
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FiMapPin className="mt-1 text-brand-700" /><span><span className="font-semibold">Address:</span> {resolvedSiteInfo.address}</span></p>
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FiClock className="mt-1 text-brand-700" /><span><span className="font-semibold">Hours:</span> {resolvedSiteInfo.hours}</span></p>
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FaFacebookF className="mt-1 text-brand-700" /><span><span className="font-semibold">Facebook:</span> <a href={resolvedSiteInfo.social.facebook} target="_blank" rel="noreferrer">{facebookLabel}</a></span></p>
          </div>

          <div className="mt-6 rounded-[1.3rem] border border-emerald-100 bg-gradient-to-r from-emerald-50 to-tan-50 p-4 text-sm text-charcoal-700">
            {warrantyNote}
          </div>

          <div className="mt-6 rounded-[1.3rem] border border-slate-200 bg-white p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rust-700">{financingPartnersHeading}</p>
            <p className="mt-2 text-sm leading-6 text-charcoal-600">
              {financingPartnersIntro}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={lightstreamUrl}
                target="_blank"
                rel="noreferrer"
                className="group hover-lift overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
              >
                <div className="relative h-20">
                  <Image
                    src={lightstreamImagePath}
                    alt="LightStream financing"
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#101922]/80 via-[#101922]/50 to-transparent" />
                  <p className="absolute left-3 top-3 text-sm font-bold text-white">{lightstreamLabel}</p>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-charcoal-800">
                  <span>{lightstreamCtaLabel}</span>
                  <FiExternalLink className="text-rust-600 transition group-hover:translate-x-0.5" />
                </div>
              </a>

              <a
                href={allegacyUrl}
                target="_blank"
                rel="noreferrer"
                className="group hover-lift overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
              >
                <div className="relative h-20">
                  <Image
                    src={allegacyImagePath}
                    alt="Allegacy financing"
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#132547]/80 via-[#132547]/45 to-transparent" />
                  <p className="absolute left-3 top-3 text-sm font-bold text-white">{allegacyLabel}</p>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-charcoal-800">
                  <span>{allegacyCtaLabel}</span>
                  <FiExternalLink className="text-rust-600 transition group-hover:translate-x-0.5" />
                </div>
              </a>
            </div>
          </div>
        </div>

        <LeadForm phone={resolvedSiteInfo.phone} />
      </div>
    </section>
  </>
)
}

export default ContactPage
