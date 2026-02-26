import fs from 'node:fs'
import path from 'node:path'
import { products } from '../src/data/productData'

const homepageDoc = {
  _id: 'homepage.main',
  _type: 'homepage',
  title: 'Homepage Content',
  heroHeadline: 'Custom Metal Buildings Built Around Your Goals',
  heroSubheadline:
    'From garages and workshops to agricultural and commercial structures, Milestone Structures delivers configurable metal buildings with veteran-owned service every step of the way.',
  localIntroHeading: 'Veteran Discipline. Family Values. Built to Last.',
  localIntroBody:
    'After serving in the Marine Corps, Josh and his wife built Milestone Structures on honesty, trustworthiness, and extreme dedication to every customer. We guide you from first call to completed project so your building is delivered exactly how you envisioned it.',
  trustedHeading: 'Trusted by customers across multiple states',
  remodelingHeading: 'Featured Products',
  remodelingBody:
    'Browse current Milestone Structures offerings. Every building can be customized for your property and use case.',
  emergencyHeading: 'Ready for your next milestone?',
  emergencyBody:
    'Call 855-789-4395 or submit the lead form to start your custom building quote. Financing options may be added in a future update.',
  seo: {
    metaTitle: 'Custom Metal Buildings | Milestone Structures',
    metaDescription:
      'Milestone Structures provides fully customizable metal buildings with veteran-owned service, project guidance, and quality structures built around your exact needs.',
    keywords: [
      'custom metal buildings',
      'metal building dealer',
      'metal garages',
      'metal workshops',
      'steel barns',
      'commercial steel buildings',
      'Pilot Mountain NC metal buildings',
      'veteran owned metal building company',
      'milestone steel structures',
    ],
  },
}

const siteSettingsDoc = {
  _id: 'siteSettings.main',
  _type: 'siteSettings',
  companyName: 'Milestone Structures',
  tagline: 'Veteran-owned and operated custom metal buildings with hands-on service from quote to completion',
  phone: '(855) 789-4395',
  phoneDigits: '18557894395',
  email: 'info@milestonestructures.com',
  address: '3311 NC 268, Pilot Mountain, NC 27047',
  hours: 'M-S 8-8PM',
  serviceArea:
    'New York, Pennsylvania, New Jersey, Delaware, Maryland, Washington D.C., Virginia, West Virginia, North Carolina, South Carolina, Georgia, Alabama, Florida, East Texas, Oklahoma, Arkansas, Louisiana',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61587551009468',
  instagramUrl: 'https://www.instagram.com/milestonestructures',
  footerSummary:
    'Veteran-owned and operated metal building dealer focused on custom structures, transparent service, and dependable delivery.',
}

const aboutPageDoc = {
  _id: 'aboutPage.main',
  _type: 'aboutPage',
  title: 'About Page Content',
  heroEyebrow: 'About Milestone',
  heroHeading: 'Built on discipline, honesty, and service',
  heroBody:
    'After serving in the Marine Corps, Josh launched Milestone Structures with his wife to deliver quality custom buildings backed by dependable guidance from first call to final install.',
  veteranBadgeLabel: 'Veteran-Owned & Operated',
  storyCardHeading: 'Why the name Milestone?',
  storyCardBodyPrimary:
    'The business name represents two journeys: a major milestone for our family as we built this company, and a milestone for each customer building something meaningful for their future.',
  storyCardBodySecondary:
    'Every completed structure is more than a project. It is a step toward your goals, your plans, and your legacy.',
  valuesCardHeading: 'What sets us apart',
  valuesList: [
    'Fully customizable building options',
    'Veteran-level discipline and reliability',
    'Hands-on project support from start to finish',
    'Transparent communication through delivery',
  ],
  coverageHeading: 'Service Coverage',
}

const contactPageDoc = {
  _id: 'contactPage.main',
  _type: 'contactPage',
  title: 'Contact Page Content',
  heroEyebrow: 'Contact',
  heroHeading: 'Start your custom building quote',
  heroBody:
    'Share your project details and our team will guide you through your options, timelines, and configuration choices.',
  veteranBadgeLabel: 'Veteran-Owned & Operated',
  contactCardHeading: 'Milestone Structures',
  facebookLabel: 'Visit Page',
  warrantyNote:
    'Warranty and insulation options vary by manufacturer. We will help you compare details during your quote consultation.',
}

const productDocs = products.map((product) => ({
  _id: `product.${product.slug}`,
  _type: 'product',
  title: product.name,
  slug: {
    _type: 'slug',
    current: product.slug,
  },
  category: product.category,
  sourceNumber: product.sourceNumber,
  width: product.width,
  length: product.length,
  height: product.height,
  roofStyle: product.roofStyle,
  basePriceLabel: product.basePriceLabel,
  shortDescription: product.description,
  description: product.description,
  sourcePath: product.image,
  imageAlt: `${product.name} metal building`,
  highlights: product.highlights,
  financingAvailable: product.financingAvailable,
  rtoAvailable: product.rtoAvailable,
  includeInFeed: false,
  currency: 'USD',
  availability: 'in stock',
}))

const docs = [homepageDoc, siteSettingsDoc, aboutPageDoc, contactPageDoc, ...productDocs]
const outNdjsonPath = path.join(process.cwd(), 'sanity-seed-milestone.ndjson')
const outJsonPath = path.join(process.cwd(), 'sanity-seed-milestone.json')
const ndjson = docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n'

fs.writeFileSync(outNdjsonPath, ndjson, 'utf8')
fs.writeFileSync(outJsonPath, JSON.stringify(docs, null, 2), 'utf8')

console.log(`Wrote ${docs.length} Milestone documents to ${outNdjsonPath} and ${outJsonPath}`)
