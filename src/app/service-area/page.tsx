import { Metadata } from 'next'
import Link from 'next/link'
import { FiArrowRight, FiCheckCircle, FiMapPin, FiPhone } from 'react-icons/fi'
import CoverageMap from '@/components/CoverageMap'
import PageHero from '@/components/PageHero'
import { getServiceAreaPageCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const [serviceAreaPage, siteSettings] = await Promise.all([
    getServiceAreaPageCmsContent(),
    getSiteSettingsCmsContent(),
  ])

  const pageSeo = serviceAreaPage?.seo
  const defaultSeo = siteSettings?.seoDefault

  return {
    title: pageSeo?.metaTitle || 'Service Area | Milestone Structures',
    description:
      pageSeo?.metaDescription ||
      'View Milestone Structures service coverage states and delivery footprint.',
    keywords:
      pageSeo?.keywords?.length
        ? pageSeo.keywords
        : defaultSeo?.keywords?.length
          ? defaultSeo.keywords
          : undefined,
    alternates: { canonical: '/service-area' },
    openGraph: pageSeo?.ogImageUrl
      ? {
          images: [{ url: pageSeo.ogImageUrl }],
        }
      : undefined,
  }
}

const defaultCoverageStates = [
  'New York',
  'Pennsylvania',
  'New Jersey',
  'Delaware',
  'Maryland',
  'Washington, D.C.',
  'Virginia',
  'West Virginia',
  'North Carolina',
  'South Carolina',
  'Georgia',
  'Alabama',
  'Florida',
  'East Texas',
  'Oklahoma',
  'Arkansas',
  'Louisiana',
]

const defaultNotes = [
  'Coverage shown is representative and can vary by project scope and manufacturer routing.',
  'Final delivery timing depends on configuration, site prep readiness, and factory scheduling.',
]

const ServiceAreaPage = async () => {
  const [serviceAreaPage, siteSettings] = await Promise.all([
    getServiceAreaPageCmsContent(),
    getSiteSettingsCmsContent(),
  ])
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)

  const heroEyebrow = serviceAreaPage?.heroEyebrow || 'Service Area'
  const heroHeading = serviceAreaPage?.heroHeading || 'Coverage That Moves With Your Project'
  const heroBody =
    serviceAreaPage?.heroBody ||
    'Milestone Structures supports customers across a wide multi-state footprint with coordinated delivery and practical project guidance.'
  const coverageHeading = serviceAreaPage?.coverageHeading || 'Where We Currently Serve'
  const coverageBody =
    serviceAreaPage?.coverageBody ||
    'Select highlighted states on the map to review the active service footprint. Reach out if your project sits near a border state.'
  const coverageStates = serviceAreaPage?.coverageStates?.length
    ? serviceAreaPage.coverageStates
    : defaultCoverageStates
  const notes = (serviceAreaPage?.notes?.length ? serviceAreaPage.notes : defaultNotes)
    .filter((item) => !/lead\s*times/i.test(item))

  return (
    <>
      <PageHero
        eyebrow={heroEyebrow}
        title={heroHeading}
        description={heroBody}
        compact
      />

      <section className="py-14">
        <div className="container-custom space-y-8">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <article className="panel-card p-7 md:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rust-700">Active Coverage</p>
              <h2 className="mt-2 font-display text-3xl text-charcoal-900">{coverageHeading}</h2>
              <p className="mt-3 text-base leading-8 text-charcoal-600">{coverageBody}</p>
              <div className="mt-6 space-y-3">
                {notes.slice(0, 2).map((note) => (
                  <p key={note} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-charcoal-700">
                    <FiCheckCircle className="mt-1 shrink-0 text-rust-600" />
                    {note}
                  </p>
                ))}
              </div>
            </article>

            <article className="panel-card p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal-500">Coverage States</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {coverageStates.map((state) => (
                  <span
                    key={state}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-charcoal-700"
                  >
                    {state}
                  </span>
                ))}
              </div>
              <a
                href={`tel:${resolvedSiteInfo.phoneDigits}`}
                className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2"
              >
                <FiPhone /> Call {resolvedSiteInfo.phone}
              </a>
              <a
                href={resolvedSiteInfo.threeDBuilderUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline mt-3 inline-flex w-full items-center justify-center gap-2"
              >
                Open 3D Builder <FiArrowRight />
              </a>
            </article>
          </div>

          <CoverageMap />

          {notes.length > 2 && (
            <div className="grid gap-4 md:grid-cols-3">
              {notes.slice(2).map((note) => (
              <article key={note} className="panel-card p-5">
                <p className="flex gap-3 text-sm leading-7 text-charcoal-700">
                  <FiCheckCircle className="mt-1 shrink-0 text-rust-600" />
                  {note}
                </p>
              </article>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-rust-50 px-6 py-5">
            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-charcoal-700">
              <FiMapPin className="text-rust-600" />
              Need an exact delivery check for your address?
              <Link href="/contact" className="text-rust-700 hover:text-rust-800">
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceAreaPage
