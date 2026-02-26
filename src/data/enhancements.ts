export type ServiceSlug = 'garages' | 'workshops' | 'agricultural-buildings' | 'carports'

export interface ServiceLegacyContent {
  headline: string
  narrative: string[]
  checklist: string[]
}

export const serviceLegacyContent: Record<ServiceSlug, ServiceLegacyContent> = {
  garages: {
    headline: 'Custom garage layouts built for vehicles, storage, and daily use',
    narrative: [
      'Milestone Structures focuses on configurable garage buildings with layout options based on vehicle count, access needs, and storage goals.',
      'Customers can review door placements, windows, walk-in access, and finish options before finalizing the right garage design.',
    ],
    checklist: [
      'Single-, two-, and multi-bay garage layouts',
      'Door, window, and walk-in entry configuration support',
      'Quote-first process with customization guidance',
    ],
  },
  workshops: {
    headline: 'Workshop buildings designed for utility, access, and long-term durability',
    narrative: [
      'Workshop models are selected for flexible use cases ranging from equipment storage to active workspaces.',
      'Milestone Structures helps compare dimensions, openings, and roof styles to fit the intended workflow.',
    ],
    checklist: [
      'Utility and premium workshop options',
      'Multiple roll-up door configurations',
      'Custom sizing and feature planning',
    ],
  },
  'agricultural-buildings': {
    headline: 'Agricultural structures with clearance and span options for farm operations',
    narrative: [
      'Agricultural buildings are designed around equipment, hay, livestock support, and general farm storage needs.',
      'Milestone Structures helps align building dimensions and entry points with the customer’s equipment and daily use requirements.',
    ],
    checklist: [
      'Farm equipment and hay storage layouts',
      'High-clearance configuration guidance',
      'Manufacturer-dependent warranty and insulation options',
    ],
  },
  carports: {
    headline: 'Carports and RV covers built for dependable weather protection',
    narrative: [
      'Open-span carports and RV covers provide efficient vehicle protection without a full enclosed footprint.',
      'Customers can compare width, length, height, and roof style options based on the vehicles they need to cover.',
    ],
    checklist: [
      'Vehicle, RV, and boat cover options',
      'Vertical roof configurations',
      'Custom sizing support',
    ],
  },
}

export interface ServiceRegion {
  slug: string
  label: string
  mapQuery: string
  summary: string
  communities: string[]
  zipCount: number
}

export const serviceAreaRegions: ServiceRegion[] = [
  {
    slug: 'north-carolina-hub',
    label: 'NC Hub',
    mapQuery: 'Pilot Mountain NC',
    summary: 'Core coordination area centered around Pilot Mountain and surrounding North Carolina communities.',
    communities: ['Pilot Mountain', 'Siloam', 'Mount Airy', 'Winston-Salem', 'Greensboro'],
    zipCount: 5,
  },
  {
    slug: 'southeast',
    label: 'Southeast',
    mapQuery: 'Charlotte NC',
    summary: 'Regional coverage across the Carolinas, Georgia, Alabama, and Florida based on project type and manufacturer availability.',
    communities: ['Charlotte', 'Columbia', 'Atlanta', 'Birmingham', 'Jacksonville'],
    zipCount: 25,
  },
  {
    slug: 'mid-atlantic-northeast',
    label: 'Mid-Atlantic + NE',
    mapQuery: 'Richmond VA',
    summary: 'Service coverage extends into the Mid-Atlantic and Northeast for qualifying metal building projects.',
    communities: ['Richmond', 'Baltimore', 'Philadelphia', 'Newark', 'Pittsburgh'],
    zipCount: 40,
  },
]

export type GalleryCategory = 'Garages' | 'Workshops' | 'Agricultural Buildings' | 'Carports'

export interface InteractiveGalleryImage {
  src: string
  alt: string
  category: GalleryCategory
  location: string
  serviceSlugs: ServiceSlug[]
}

export const interactiveGalleryImages: InteractiveGalleryImage[] = [
  {
    src: '/products/milestone/30x30x10-two-car-garage.png',
    alt: 'Milestone Structures two-car garage example',
    category: 'Garages',
    location: 'Multi-State Service Area',
    serviceSlugs: ['garages'],
  },
  {
    src: '/products/milestone/26x40x10-three-car-garage.png',
    alt: 'Milestone Structures three-car garage example',
    category: 'Garages',
    location: 'Multi-State Service Area',
    serviceSlugs: ['garages'],
  },
  {
    src: '/products/milestone/30x70x12-utility-workshop.png',
    alt: 'Milestone Structures utility workshop example',
    category: 'Workshops',
    location: 'Multi-State Service Area',
    serviceSlugs: ['workshops'],
  },
  {
    src: '/products/milestone/30x60x12-premium-workshop.jpg',
    alt: 'Milestone Structures premium workshop example',
    category: 'Workshops',
    location: 'Multi-State Service Area',
    serviceSlugs: ['workshops'],
  },
  {
    src: '/products/milestone/30x60x16-premium-agriculture-building.png',
    alt: 'Milestone Structures agricultural building example',
    category: 'Agricultural Buildings',
    location: 'Multi-State Service Area',
    serviceSlugs: ['agricultural-buildings'],
  },
  {
    src: '/products/milestone/40x70x14-prime-agricultural-building.jpg',
    alt: 'Milestone Structures prime agricultural building example',
    category: 'Agricultural Buildings',
    location: 'Multi-State Service Area',
    serviceSlugs: ['agricultural-buildings'],
  },
  {
    src: '/products/milestone/18x25x12-carport.jpg',
    alt: 'Milestone Structures carport example',
    category: 'Carports',
    location: 'Multi-State Service Area',
    serviceSlugs: ['carports'],
  },
  {
    src: '/products/milestone/18x10x14-rv-cover.png',
    alt: 'Milestone Structures RV cover example',
    category: 'Carports',
    location: 'Multi-State Service Area',
    serviceSlugs: ['carports'],
  },
]

export const galleryCategories: GalleryCategory[] = ['Garages', 'Workshops', 'Agricultural Buildings', 'Carports']
