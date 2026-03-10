import { Metadata } from 'next'
import { FiCheckCircle, FiDollarSign, FiExternalLink, FiPhone } from 'react-icons/fi'
import PageHero from '@/components/PageHero'
import { getFinancingPageCmsContent, getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

export async function generateMetadata(): Promise<Metadata> {
  const financingPage = await getFinancingPageCmsContent()
  const pageSeo = financingPage?.seo

  return {
    title: pageSeo?.metaTitle || 'Financing Options',
    description:
      pageSeo?.metaDescription ||
      'Review available financing options and apply through our lending partners.',
    keywords: pageSeo?.keywords?.length ? pageSeo.keywords : undefined,
    alternates: { canonical: '/rto-financing' },
    openGraph: pageSeo?.ogImageUrl
      ? {
          images: [{ url: pageSeo.ogImageUrl }],
        }
      : undefined,
  }
}

const defaultHighlights = [
  'Qualified buyers may apply for unsecured loans from $5,000 to $100,000.',
  'Good-to-excellent credit may qualify for fixed rates and no origination, late, or prepayment fees.',
  'Funds are typically deposited directly to the customer for cash-style project payment.',
]

const defaultApplicationFlowSteps = [
  'Apply directly with LightStream or Allegacy.',
  'Review your offer and terms with the lender.',
  'Once approved, move forward with your project like a cash purchase.',
]

const FinancingPage = async () => {
  const [financingPage, siteSettings] = await Promise.all([
    getFinancingPageCmsContent(),
    getSiteSettingsCmsContent(),
  ])
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)

  const heroEyebrow = financingPage?.heroEyebrow || 'Financing'
  const heroHeading = financingPage?.heroHeading || 'Financing Options'
  const heroBody =
    financingPage?.heroBody ||
    'Apply directly through our lending partners and move your project forward.'
  const financingHeading = financingPage?.financingHeading || 'Available Financing'
  const financingBody =
    financingPage?.financingBody ||
    'Financing is available for qualified buyers. Terms and approvals depend on lender review and customer profile.'
  const lightstreamButtonLabel =
    financingPage?.lightstreamButtonLabel ||
    financingPage?.legacyLightstreamButtonLabel ||
    'Apply with LightStream'
  const lightstreamButtonUrl =
    financingPage?.lightstreamButtonUrl ||
    financingPage?.legacyLightstreamButtonUrl ||
    'https://www.lightstream.com/apply'
  const allegacyButtonLabel =
    financingPage?.allegacyButtonLabel ||
    financingPage?.legacyAllegacyButtonLabel ||
    'Apply with Allegacy Bank'
  const allegacyButtonUrl =
    financingPage?.allegacyButtonUrl ||
    financingPage?.legacyAllegacyButtonUrl ||
    'https://allegrologin.com/app/a5ef9ce5'
  const financingHighlights = financingPage?.financingHighlights?.length
    ? financingPage.financingHighlights
    : defaultHighlights
  const applicationFlowHeading = financingPage?.applicationFlowHeading || 'Simple Application Flow'
  const applicationFlowSteps = financingPage?.applicationFlowSteps?.length
    ? financingPage.applicationFlowSteps
    : defaultApplicationFlowSteps
  const ctaHeading = financingPage?.ctaHeading || 'Need help choosing the right financing path?'
  const ctaBody =
    financingPage?.ctaBody ||
    'Call our team and we will help you decide which partner fits your project and timeline.'
  const disclaimerText =
    financingPage?.disclaimerText || 'All financing is subject to lender approval and final terms.'

  return (
    <>
      <PageHero
        eyebrow={heroEyebrow}
        title={heroHeading}
        description={heroBody}
        compact
      />

      <section className="py-14">
        <div className="container-custom grid grid-cols-1 gap-8 lg:grid-cols-2">
          <article className="panel-card overflow-hidden">
            <div className="bg-[linear-gradient(135deg,_#132547_0%,_#102140_52%,_#121519_100%)] p-8 text-white">
              <div className="flex items-center gap-3">
                <span className="icon-frame border-white/10 bg-white/10">
                  <FiDollarSign />
                </span>
                <p className="section-chip bg-white/10 text-tan-100 ring-1 ring-white/10">Financing</p>
              </div>
              <h2 className="mt-5 font-display text-3xl text-white">{financingHeading}</h2>
            </div>
            <div className="p-8">
              <p className="text-charcoal-700">{financingBody}</p>
              <ul className="mt-5 space-y-2 text-sm text-charcoal-700">
                {financingHighlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={lightstreamButtonUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {lightstreamButtonLabel} <FiExternalLink className="text-sm" />
                </a>
                <a
                  href={allegacyButtonUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  {allegacyButtonLabel} <FiExternalLink className="text-sm" />
                </a>
              </div>
              <p className="mt-4 text-xs text-charcoal-500">
                {disclaimerText}
              </p>
            </div>
          </article>

          <article className="panel-card p-8">
            <p className="section-chip bg-slate-100 text-charcoal-700 ring-1 ring-slate-200">What to Expect</p>
            <h2 className="mt-5 font-display text-3xl text-charcoal-900">{applicationFlowHeading}</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-charcoal-700">
              {applicationFlowSteps.map((step) => (
                <p key={step} className="flex gap-3">
                  <FiCheckCircle className="mt-1 shrink-0 text-brand-700" />
                  {step}
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-bold text-charcoal-900">{ctaHeading}</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal-700">{ctaBody}</p>
              <a
                href={`tel:${resolvedSiteInfo.phoneDigits}`}
                className="btn-outline mt-4 inline-flex items-center gap-2"
              >
                <FiPhone /> Call {resolvedSiteInfo.phone}
              </a>
            </div>
          </article>
        </div>
      </section>

    </>
  )
}

export default FinancingPage
