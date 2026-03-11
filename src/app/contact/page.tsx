import { Metadata } from 'next'
import Image from 'next/image'
import { FaFacebookF } from 'react-icons/fa'
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import LeadForm from '@/components/LeadForm'
import PageHero from '@/components/PageHero'
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
  const mapQuery = encodeURIComponent(resolvedSiteInfo.address)
  const googleMapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`

  return (
    <>
      <PageHero
        eyebrow={heroEyebrow}
        title={heroHeading}
        description={heroBody}
        compact
      />

    <section className="bg-slate-50 py-14">
      <div className="container-custom grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="panel-card border-brand-100 bg-gradient-to-b from-white to-brand-50/35 p-8 md:p-10">
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="relative h-36">
              <Image
                src="/pages/contact-advisor.jpg"
                alt="Advisor discussing project planning options with customers"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101922]/80 via-[#101922]/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rust-300">Advisor Support</p>
                <p className="mt-1 text-sm text-slate-200">Talk with a real advisor for scope, budget, and timeline planning.</p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl text-charcoal-900">{contactCardHeading}</h2>
          {contactCardIntro && <p className="mt-3 text-sm text-charcoal-600">{contactCardIntro}</p>}
          <div className="mt-6 space-y-3 border-b border-slate-200 pb-6 text-charcoal-700">
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FiPhone className="mt-1 text-brand-700" /><span><span className="font-semibold">Phone:</span> <a href={`tel:${resolvedSiteInfo.phoneDigits}`}>{resolvedSiteInfo.phone}</a></span></p>
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FiMail className="mt-1 text-brand-700" /><span><span className="font-semibold">Email:</span> <a href={`mailto:${resolvedSiteInfo.email}`}>{resolvedSiteInfo.email}</a></span></p>
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FiMapPin className="mt-1 text-brand-700" /><span><span className="font-semibold">Address:</span> {resolvedSiteInfo.address}</span></p>
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FiClock className="mt-1 text-brand-700" /><span><span className="font-semibold">Hours:</span> {resolvedSiteInfo.hours}</span></p>
            <p className="flex gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3"><FaFacebookF className="mt-1 text-brand-700" /><span><span className="font-semibold">Facebook:</span> <a href={resolvedSiteInfo.social.facebook} target="_blank" rel="noreferrer">{facebookLabel}</a></span></p>
          </div>

          <div className="mt-6 rounded-[1.3rem] border border-emerald-100 bg-gradient-to-r from-emerald-50 to-tan-50 p-4 text-sm text-charcoal-700">
            {warrantyNote}
          </div>
        </div>

        <div className="relative h-full lg:pl-2">
          <div className="pointer-events-none absolute inset-y-2 left-0 hidden w-px bg-gradient-to-b from-transparent via-brand-200 to-transparent lg:block" />
          <LeadForm phone={resolvedSiteInfo.phone} className="h-full" />
        </div>
      </div>
    </section>

    <section className="bg-slate-50 pb-14">
      <div className="container-custom">
        <div className="overflow-hidden rounded-[1.3rem] border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal-500">Google Maps</p>
          </div>
          <iframe
            src={googleMapSrc}
            title="Milestone Structures location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full"
          />
        </div>
      </div>
    </section>
  </>
)
}

export default ContactPage
