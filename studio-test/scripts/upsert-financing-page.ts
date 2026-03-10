import { getCliClient } from 'sanity/cli'

const financingDoc = {
  _id: 'financingPage.main',
  _type: 'financingPage',
  title: 'Financing Page Content',
  heroEyebrow: 'Payment Options',
  heroHeading: 'Financing Options',
  heroBody:
    'Apply directly through our lending partners and move your project forward.',
  financingHeading: 'Available Financing',
  financingBody:
    'Financing is available through LightStream for qualified buyers. Terms and approvals depend on lender review and customer profile.',
  lightstreamButtonLabel: 'Apply with LightStream',
  lightstreamButtonUrl: 'https://www.lightstream.com/apply',
  allegacyButtonLabel: 'Apply with Allegacy Bank',
  allegacyButtonUrl: 'https://allegrologin.com/app/a5ef9ce5',
  financingHighlights: [
    'Qualified buyers may apply for unsecured loans from $5,000 to $100,000.',
    'Good-to-excellent credit may qualify for fixed rates and no origination, late, or prepayment fees.',
    'Funds are typically deposited directly to the customer for cash-style project payment.',
  ],
  applicationFlowHeading: 'Simple Application Flow',
  applicationFlowSteps: [
    'Apply directly with LightStream or Allegacy.',
    'Review your offer and terms with the lender.',
    'Once approved, move forward with your project like a cash purchase.',
  ],
  ctaHeading: 'Need help choosing the right financing path?',
  ctaBody:
    'Call our team and we will help you decide which partner fits your project and timeline.',
  disclaimerText: 'All financing is subject to lender approval and final terms.',
}

async function run() {
  const client = getCliClient({ apiVersion: '2024-10-01' }).withConfig({ useCdn: false })
  await client.createOrReplace(financingDoc)
  console.log('Upserted financingPage.main')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
