import { Metadata } from 'next'
import Image from 'next/image'
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

      <section className="pt-8">
        <div className="container-custom">
          <div className="panel-card overflow-hidden">
            <div className="relative h-[260px] md:h-[320px] lg:h-[360px]">
              <Image
                src="/pages/financing-hero.jpg"
                alt="Advisor walking customers through financing options for a building project"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101922]/72 via-[#101922]/35 to-[#101922]/18" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rust-300">Financing Options</p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl">Choose the Right Lending Path</h2>
                <p className="mt-2 max-w-3xl text-sm text-slate-200 md:text-base">
                  Compare partner options, apply directly, and move forward with your project like a cash purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-custom grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <article className="space-y-6">
            <div className="panel-card h-full overflow-hidden">
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

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={lightstreamButtonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-xl border border-slate-200 bg-gradient-to-br from-white to-brand-50 p-4 transition hover:border-brand-300"
                  >
                    <div className="flex h-12 items-center">
                      <Image
                        src="/partners/lightstream-logo.png"
                        alt="LightStream logo"
                        width={180}
                        height={38}
                        className="h-6 w-auto object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm font-semibold text-charcoal-800">
                      <span>{lightstreamButtonLabel}</span>
                      <FiExternalLink className="text-rust-600 transition group-hover:translate-x-0.5" />
                    </div>
                  </a>

                  <a
                    href={allegacyButtonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-xl border border-slate-200 bg-gradient-to-br from-white to-rust-50 p-4 transition hover:border-rust-300"
                  >
                    <div className="flex h-12 items-center">
                      <Image
                        src="/partners/allegacy-logo.svg"
                        alt="Allegacy logo"
                        width={180}
                        height={38}
                        className="h-6 w-auto object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm font-semibold text-charcoal-800">
                      <span>{allegacyButtonLabel}</span>
                      <FiExternalLink className="text-rust-600 transition group-hover:translate-x-0.5" />
                    </div>
                  </a>
                </div>
                <p className="mt-4 text-xs text-charcoal-500">
                  {disclaimerText}
                </p>
              </div>
            </div>
          </article>

          <article className="space-y-6">
            <div className="panel-card flex h-full flex-col p-8">
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
              <div className="mt-auto rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-charcoal-900">{ctaHeading}</h3>
                <p className="mt-2 text-sm leading-6 text-charcoal-700">{ctaBody}</p>
                <a
                  href={`tel:${resolvedSiteInfo.phoneDigits}`}
                  className="btn-outline mt-4 inline-flex items-center gap-2"
                >
                  <FiPhone /> Call {resolvedSiteInfo.phone}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

    </>
  )
}

export default FinancingPage
