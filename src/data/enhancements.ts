export type ServiceSlug =
  | 'roofing'
  | 'windows'
  | 'siding-gutters'
  | 'kitchen-bath'
  | 'home-additions'
  | 'decks-patios'
  | 'emergency-services'
  | 'water-damage'
  | 'fire-smoke-damage'
  | 'storm-damage'

export interface ServiceLegacyContent {
  headline: string
  narrative: string[]
  checklist: string[]
}

export const serviceLegacyContent: Record<ServiceSlug, ServiceLegacyContent> = {
  roofing: {
    headline: 'Roofing expertise built over a decade in Maryland and the DC metro',
    narrative: [
      'The legacy House Transformers roofing message emphasizes reliable inspections, clear estimates, and workmanship that protects the property through Maryland weather extremes.',
      'Their roofing teams have historically handled everything from targeted shingle repairs to full custom replacement systems while focusing on premium material standards and clean jobsite execution.',
    ],
    checklist: [
      'Roof replacements installed to manufacturer guidance and local code',
      'Repair and replacement options with warranty-backed scope',
      'Financing pathways including zero-interest promotional options for qualified clients',
    ],
  },
  windows: {
    headline: 'Precision window installation using trained crews and specialized methods',
    narrative: [
      'Legacy site copy stresses that windows are not a handyman job and must be installed with exact fit and float tolerances for long-term energy performance.',
      'Clients are guided through style and material selection so the final package aligns with architectural goals and efficiency targets.',
    ],
    checklist: [
      'Window style options include double-hung, sliding, casement, bay, bow, and specialty units',
      'Material options include wood, vinyl, aluminum, and composite systems',
      'Installation and trim finishing completed by dedicated in-house teams',
    ],
  },
  'siding-gutters': {
    headline: 'Exterior upgrades focused on curb appeal, protection, and low maintenance',
    narrative: [
      'Legacy content positions siding as both visual transformation and weather defense, with lower maintenance compared to frequent repaint cycles.',
      'Gutter services are framed as a complete water-management package to protect foundations, fascia, and exterior envelope integrity.',
    ],
    checklist: [
      'Siding repair and replacement with finish matching',
      'Gutter replacement, installation, repairs, and cleaning support',
      'Lifetime workmanship emphasis tied to long-term durability',
    ],
  },
  'kitchen-bath': {
    headline: 'Design-build kitchen and bath remodeling with permit and code focus',
    narrative: [
      'Legacy messaging highlights a coordinated designer-craftsman approach for kitchens and baths, with modern, classic, and traditional finish packages.',
      'The team emphasizes up-to-date permitting, plumbing, electrical planning, and energy-efficient product integration across remodel phases.',
    ],
    checklist: [
      'Kitchen and bath layouts optimized for daily use and storage',
      'Cabinets, counters, flooring, plumbing, and lighting delivered as one scope',
      'Checklist-driven planning for permits, waterproofing, electrical, and ventilation',
    ],
  },
  'home-additions': {
    headline: 'Home additions delivered through a consultation-first, plan-to-build workflow',
    narrative: [
      'Legacy home addition copy centers on an in-depth consultation process that defines goals, footprint, and integration with the existing structure before build-out starts.',
      'Project delivery combines structural planning and interior finishing so additions feel like a seamless extension rather than a detached expansion.',
    ],
    checklist: [
      'Consultative planning for scope, layout, and architectural continuity',
      'Permit-ready structural approach and phased construction timelines',
      'Integrated envelope, roofing, and interior completion under one contractor',
    ],
  },
  'decks-patios': {
    headline: 'Outdoor living builds engineered for function, style, and long-term performance',
    narrative: [
      'Legacy deck and patio content emphasizes custom outdoor spaces that align with home architecture while supporting daily use, entertaining, and low-maintenance ownership.',
      'Material and design flexibility is a core message, from wood and composite deck systems to patterned hardscape patios and integrated rail/lighting details.',
    ],
    checklist: [
      'Bespoke deck and patio layouts tailored to lifestyle',
      'Material options across wood, composite, and decorative hardscape',
      'Integrated design so indoor and outdoor spaces feel cohesive',
    ],
  },
  'emergency-services': {
    headline: 'Emergency stabilization designed to prevent secondary damage fast',
    narrative: [
      'Legacy emergency service messaging promises rapid response for fire, water, and storm-related incidents, with immediate stabilization and a clear restoration plan.',
      'The core goal is reducing additional loss while preparing insurer-ready documentation and safe site conditions for full reconstruction.',
    ],
    checklist: [
      '24/7 response dispatch and immediate site triage',
      'Tree removal coordination, emergency tarping, and board-up services',
      'Damage documentation and restoration sequencing for claims support',
    ],
  },
  'water-damage': {
    headline: 'Water and flood restoration built around fast extraction and controlled drying',
    narrative: [
      'Legacy water-damage copy emphasizes minute-by-minute response to active leaks, followed by moisture mapping, extraction, and structural drying to contain loss.',
      'Flood and storm scenarios are handled with securement, debris removal, sanitization, and reconstruction planning to return the property to pre-loss condition.',
    ],
    checklist: [
      'Emergency extraction, dehumidification, and structural drying',
      'Mold prevention/remediation and contaminated-material handling',
      'Leak-source mitigation plus full repair/reconstruction pathways',
    ],
  },
  'fire-smoke-damage': {
    headline: 'Fire and smoke recovery with soot, odor, HVAC, and rebuild scope included',
    narrative: [
      'Legacy fire-restoration content highlights the hidden impact of smoke and soot contamination and the need for specialist cleaning and deodorization workflows.',
      'House Transformers positions this service as a compassionate, detail-driven rebuild process supported by insurance coordination and emergency availability.',
    ],
    checklist: [
      'Soot and residue removal from structural and finish surfaces',
      'Odor elimination, thermal fogging, and HVAC contamination cleanup',
      'Content pack-out/restoration and complete reconstruction support',
    ],
  },
  'storm-damage': {
    headline: 'Storm recovery services backed by long-tenured reconstruction experience',
    narrative: [
      'Legacy storm messaging focuses on rapid intervention after high-wind and severe-weather events to stabilize structures and prevent escalating water intrusion.',
      'The service is positioned as a full-cycle repair path from emergency protection through permanent roofing, siding, and envelope restoration.',
    ],
    checklist: [
      'Rapid damage assessments after wind and hail events',
      'Emergency protective measures to secure exposed structures',
      'Restoration and reconstruction sequencing coordinated with claims',
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
    slug: 'anne-arundel',
    label: 'Anne Arundel Core',
    mapQuery: 'Glen Burnie MD',
    summary: 'Primary response radius centered around Glen Burnie, Pasadena, Severn, and Annapolis corridors.',
    communities: ['Glen Burnie', 'Pasadena', 'Severn', 'Annapolis', 'Millersville', 'Arnold'],
    zipCount: 12,
  },
  {
    slug: 'pg-charles',
    label: 'PG + Charles County',
    mapQuery: 'Bowie MD',
    summary: 'Residential and commercial coverage into Bowie, Upper Marlboro, and Charles County communities.',
    communities: ['Bowie', 'Upper Marlboro', 'Laurel', 'Brandywine', 'Waldorf'],
    zipCount: 9,
  },
  {
    slug: 'dmv-corridor',
    label: 'DMV Corridor',
    mapQuery: 'Laurel MD',
    summary: 'Project-based coverage across connected Maryland / DMV markets for scheduled remodeling and restoration.',
    communities: ['Laurel', 'Hanover', 'Odenton', 'Crofton', 'Columbia'],
    zipCount: 6,
  },
]

export type GalleryCategory = 'Roofing' | 'Decks & Patios' | 'Renovations' | 'Home Additions' | 'Restoration'

export interface InteractiveGalleryImage {
  src: string
  alt: string
  category: GalleryCategory
  location: string
  serviceSlugs: ServiceSlug[]
}

export const interactiveGalleryImages: InteractiveGalleryImage[] = [
  { src: '/gallery/legacy/annapolisroof-1.jpg', alt: 'Roof replacement project in Annapolis, Maryland', category: 'Roofing', location: 'Annapolis, MD', serviceSlugs: ['roofing', 'storm-damage'] },
  { src: '/gallery/legacy/annapolisroof-4.jpg', alt: 'Residential roofing crew completing shingle installation', category: 'Roofing', location: 'Annapolis, MD', serviceSlugs: ['roofing'] },
  { src: '/gallery/legacy/annapolisroof-7.jpg', alt: 'Completed roof upgrade with clean ridge and flashing detail', category: 'Roofing', location: 'Annapolis, MD', serviceSlugs: ['roofing'] },
  { src: '/gallery/legacy/Ellicott-City1.JPG', alt: 'Roofline restoration work in Ellicott City', category: 'Roofing', location: 'Ellicott City, MD', serviceSlugs: ['roofing', 'storm-damage'] },
  { src: '/gallery/legacy/Kingsbridge-Rd-Ellicott-City2.JPG', alt: 'High-slope roof replacement with weatherproofing upgrades', category: 'Roofing', location: 'Ellicott City, MD', serviceSlugs: ['roofing', 'storm-damage'] },
  { src: '/gallery/legacy/bowie-maryland3.JPG', alt: 'Bowie roofing project showing full exterior refresh', category: 'Roofing', location: 'Bowie, MD', serviceSlugs: ['roofing', 'siding-gutters'] },
  { src: '/gallery/legacy/hazelwood-rd-edgwater-md3.JPG', alt: 'Post-storm roofing restoration sequence in Edgewater', category: 'Restoration', location: 'Edgewater, MD', serviceSlugs: ['storm-damage', 'emergency-services'] },
  { src: '/gallery/legacy/hazelwood-rd-edgwater-md7.JPG', alt: 'Emergency roof securement and damage mitigation', category: 'Restoration', location: 'Edgewater, MD', serviceSlugs: ['emergency-services', 'storm-damage'] },
  { src: '/gallery/legacy/gentry-ct-laurel-md1.jpg', alt: 'Leak mitigation and roof restoration in Laurel', category: 'Restoration', location: 'Laurel, MD', serviceSlugs: ['water-damage', 'storm-damage'] },
  { src: '/gallery/legacy/gentry-ct-laurel-md4.jpg', alt: 'Exterior repairs completed after water intrusion event', category: 'Restoration', location: 'Laurel, MD', serviceSlugs: ['water-damage', 'emergency-services'] },
  { src: '/gallery/legacy/2025-deck-carmel-trex-maryland-dc-1.jpg', alt: 'Trex deck installation with custom layout', category: 'Decks & Patios', location: 'Maryland', serviceSlugs: ['decks-patios'] },
  { src: '/gallery/legacy/2025-deck-carmel-trex-maryland-dc-3.jpg', alt: 'Composite deck framing and finish detail', category: 'Decks & Patios', location: 'Maryland', serviceSlugs: ['decks-patios'] },
  { src: '/gallery/legacy/2025-deck-carmel-trex-maryland-dc-6.jpg', alt: 'Outdoor deck build with upgraded rail and stairs', category: 'Decks & Patios', location: 'Maryland', serviceSlugs: ['decks-patios'] },
  { src: '/gallery/legacy/2025-deck-projects-maryland-and-DC-2.jpg', alt: 'Large-format deck project in Maryland / DC corridor', category: 'Decks & Patios', location: 'DMV', serviceSlugs: ['decks-patios'] },
  { src: '/gallery/legacy/2025-deck-projects-maryland-and-DC-5.jpg', alt: 'Finished deck and patio transition area', category: 'Decks & Patios', location: 'DMV', serviceSlugs: ['decks-patios', 'home-additions'] },
  { src: '/gallery/legacy/2025-glenburnie-md-rnovation-1.jpg', alt: 'Full renovation project in Glen Burnie', category: 'Renovations', location: 'Glen Burnie, MD', serviceSlugs: ['kitchen-bath', 'home-additions'] },
  { src: '/gallery/legacy/2025-glenburnie-md-rnovation-4.jpg', alt: 'Interior renovation with modern finish package', category: 'Renovations', location: 'Glen Burnie, MD', serviceSlugs: ['kitchen-bath'] },
  { src: '/gallery/legacy/2025-glenburnie-md-rnovation-8.jpg', alt: 'Whole-home renovation progress and finish carpentry', category: 'Renovations', location: 'Glen Burnie, MD', serviceSlugs: ['kitchen-bath', 'home-additions'] },
  { src: '/gallery/legacy/glen-burnie-full2.jpg', alt: 'Comprehensive exterior/interior transformation', category: 'Renovations', location: 'Glen Burnie, MD', serviceSlugs: ['kitchen-bath', 'siding-gutters'] },
  { src: '/gallery/legacy/glen-burnie-full7.jpg', alt: 'Remodeling phase completion with updated exterior lines', category: 'Renovations', location: 'Glen Burnie, MD', serviceSlugs: ['kitchen-bath', 'siding-gutters'] },
  { src: '/gallery/legacy/glen-burnie-full12.jpg', alt: 'Project closeout on full remodel in Glen Burnie', category: 'Renovations', location: 'Glen Burnie, MD', serviceSlugs: ['kitchen-bath', 'home-additions'] },
  { src: '/gallery/legacy/glen-burnie-full18.jpg', alt: 'High-end renovation with coordinated trade execution', category: 'Renovations', location: 'Glen Burnie, MD', serviceSlugs: ['kitchen-bath'] },
  { src: '/gallery/legacy/home-addition-dayton-md1.jpg', alt: 'Home addition framing and tie-in in Dayton, Maryland', category: 'Home Additions', location: 'Dayton, MD', serviceSlugs: ['home-additions'] },
  { src: '/gallery/legacy/Annapolis-Blvd-Pasadena4.JPG', alt: 'Pasadena exterior expansion and remodeling scope', category: 'Home Additions', location: 'Pasadena, MD', serviceSlugs: ['home-additions', 'siding-gutters'] },
  { src: '/gallery/legacy/Annapolis-Blvd-Pasadena9.JPG', alt: 'Addition and envelope upgrade project in Pasadena', category: 'Home Additions', location: 'Pasadena, MD', serviceSlugs: ['home-additions'] },
  { src: '/gallery/legacy/White-Way-Sykesville-MD3.JPG', alt: 'Sykesville remodeling and extension project', category: 'Home Additions', location: 'Sykesville, MD', serviceSlugs: ['home-additions', 'kitchen-bath'] },
  { src: '/gallery/legacy/White-Way-Sykesville-MD7.JPG', alt: 'Completed addition with exterior finishing in Sykesville', category: 'Home Additions', location: 'Sykesville, MD', serviceSlugs: ['home-additions'] },
  { src: '/gallery/legacy/bowie-maryland8.JPG', alt: 'Commercial exterior rehabilitation and roof coordination', category: 'Restoration', location: 'Bowie, MD', serviceSlugs: ['emergency-services', 'storm-damage'] },
  { src: '/gallery/legacy/Ellicott-City8.JPG', alt: 'Structural repair sequence for weather-related damage', category: 'Restoration', location: 'Ellicott City, MD', serviceSlugs: ['storm-damage', 'water-damage'] },
  { src: '/gallery/legacy/annapolisroof-12.jpg', alt: 'Storm-ready roofing completion with upgraded underlayment', category: 'Restoration', location: 'Annapolis, MD', serviceSlugs: ['storm-damage', 'roofing'] },
]

export const galleryCategories: GalleryCategory[] = ['Roofing', 'Decks & Patios', 'Renovations', 'Home Additions', 'Restoration']
