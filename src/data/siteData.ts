export const siteInfo = {
  name: 'Milestone Structures',
  tagline: 'Veteran-owned and operated custom metal buildings with hands-on service from quote to completion',
  phone: '(855) 789-4395',
  phoneDigits: '18557894395',
  email: 'info@milestonestructures.com',
  address: '3311 NC 268, Pilot Mountain, NC 27047',
  hours: 'M-S 8-8PM',
  serviceArea:
    'New York, Pennsylvania, New Jersey, Delaware, Maryland, Washington D.C., Virginia, West Virginia, North Carolina, South Carolina, Georgia, Alabama, Florida, East Texas, Oklahoma, Arkansas, Louisiana',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61587551009468',
    instagram: 'https://www.instagram.com/milestonestructures',
    linkedin: '',
    youtube: '',
    yelp: '',
    googleReviews: '',
  },
}

export const zipCodes: string[] = []

export type ServiceCategory = {
  slug: string
  title: string
  description: string
  image: string
  type: 'metal-buildings'
}

export const serviceCategories: ServiceCategory[] = []

export type ServiceCategorySlug = string

export const homepageSeo = {
  title: 'Custom Metal Buildings | Milestone Structures',
  description:
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
    'milestone structures',
  ],
} as const

type ServiceSeoProfile = {
  title: string
  description: string
  headline: string
  intro: string
  keywords: readonly string[]
}

export const serviceSeoProfiles: Partial<Record<ServiceCategorySlug, ServiceSeoProfile>> = {}

export const serviceDetails: Record<string, never> = {}

export const processSteps = [
  {
    title: 'Share Your Project Goals',
    description: 'Tell us the building type, approximate size, location, and intended use.',
  },
  {
    title: 'Review Layout & Options',
    description: 'We help compare doors, windows, roof style, colors, and configuration details.',
  },
  {
    title: 'Finalize Quote',
    description: 'We provide guidance on pricing, delivery expectations, and manufacturer options.',
  },
  {
    title: 'Move Toward Delivery',
    description: 'Our team stays in contact from first call through the final build process.',
  },
] as const

type FaqItem = {
  question: string
  answer: string
}

export const serviceFaqs: Partial<Record<ServiceCategorySlug, FaqItem[]>> = {}

export const faqs: FaqItem[] = [
  {
    question: 'Are you a dealer or manufacturer?',
    answer: 'Milestone Structures is a dealer focused on fully customizable metal buildings from trusted manufacturers.',
  },
  {
    question: 'What types of buildings do you offer?',
    answer: 'We offer garages, workshops, storage buildings, agricultural structures, commercial spaces, carports, and custom metal building solutions.',
  },
  {
    question: 'Do you offer financing or rent-to-own?',
    answer: 'Financing options are being explored. Rent-to-own programs are not currently offered.',
  },
  {
    question: 'Are warranty and insulation options available?',
    answer: 'Warranty and insulation details depend on the manufacturer and selected building package.',
  },
  {
    question: 'Do you serve areas outside North Carolina?',
    answer: 'Yes. Milestone Structures serves a multi-state coverage area across parts of the Northeast, Mid-Atlantic, Southeast, and South-Central regions.',
  },
]

export const testimonials: Array<{
  name: string
  location: string
  rating: number
  text: string
  date: string
}> = []

export const galleryImages: Array<{
  src: string
  alt: string
}> = []

export const videoGallery: Array<{
  title: string
  url: string
}> = []

export const blogPosts: Array<{
  slug: string
  title: string
  excerpt: string
  publishedAt: string
}> = []
