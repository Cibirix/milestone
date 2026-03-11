import { getCliClient } from 'sanity/cli'

type SeoPayload = {
  metaTitle: string
  metaDescription: string
  keywords: string[]
}

type SeoDocConfig = {
  id: string
  type: string
  title: string
  seoField: 'seo' | 'seoDefault'
  seo: SeoPayload
}

const seoDocs: SeoDocConfig[] = [
  {
    id: 'homepage.main',
    type: 'homepage',
    title: 'Homepage Content',
    seoField: 'seo',
    seo: {
      metaTitle: 'Custom Metal Buildings | Milestone Structures',
      metaDescription:
        'Milestone Structures delivers custom metal garages, workshops, barns, and carports with veteran-led guidance and professional delivery.',
      keywords: [
        'custom metal buildings',
        'metal garages',
        'metal workshops',
        'steel barns',
        'metal carports',
        'Milestone Structures',
      ],
    },
  },
  {
    id: 'aboutPage.main',
    type: 'aboutPage',
    title: 'About Page Content',
    seoField: 'seo',
    seo: {
      metaTitle: 'About Milestone Structures | Veteran-Led Building Team',
      metaDescription:
        'Learn the Milestone Structures story and why customers choose our veteran-led team for clear communication, customization, and dependable delivery.',
      keywords: [
        'about milestone structures',
        'veteran owned building company',
        'metal building company story',
        'custom steel building experts',
      ],
    },
  },
  {
    id: 'contactPage.main',
    type: 'contactPage',
    title: 'Contact Page Content',
    seoField: 'seo',
    seo: {
      metaTitle: 'Contact Milestone Structures | Request a Building Quote',
      metaDescription:
        'Contact Milestone Structures for custom metal building quotes, project guidance, and financing support from our team.',
      keywords: [
        'contact milestone structures',
        'metal building quote',
        'custom steel building contact',
        'metal garage quote',
      ],
    },
  },
  {
    id: 'financingPage.main',
    type: 'financingPage',
    title: 'Financing Page Content',
    seoField: 'seo',
    seo: {
      metaTitle: 'Financing Options | Milestone Structures',
      metaDescription:
        'Review Milestone Structures financing options and apply through LightStream or Allegacy Bank for qualified custom building projects.',
      keywords: [
        'metal building financing',
        'LightStream financing',
        'Allegacy financing',
        'custom building payment options',
      ],
    },
  },
  {
    id: 'serviceAreaPage.main',
    type: 'serviceAreaPage',
    title: 'Service Area Page Content',
    seoField: 'seo',
    seo: {
      metaTitle: 'Service Area | Milestone Structures Delivery Coverage',
      metaDescription:
        'Explore Milestone Structures service coverage across the Southeast, Mid-Atlantic, and surrounding states.',
      keywords: [
        'metal building service area',
        'milestone structures coverage',
        'steel building delivery states',
        'custom building service map',
      ],
    },
  },
  {
    id: 'siteSettings.main',
    type: 'siteSettings',
    title: 'Site Settings',
    seoField: 'seoDefault',
    seo: {
      metaTitle: 'Milestone Structures | Custom Metal Buildings',
      metaDescription:
        'Milestone Structures provides custom metal buildings with veteran-led service, configurable options, and streamlined project support.',
      keywords: [
        'Milestone Structures',
        'custom metal buildings',
        'steel buildings',
        'metal garages and workshops',
      ],
    },
  },
]

async function run() {
  const client = getCliClient({ apiVersion: '2024-10-01' }).withConfig({ useCdn: false })

  for (const config of seoDocs) {
    await client.createIfNotExists({
      _id: config.id,
      _type: config.type,
      title: config.title,
    })

    await client
      .patch(config.id)
      .set({ [config.seoField]: config.seo })
      .commit()

    console.log(`Upserted ${config.seoField} on ${config.id}`)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
