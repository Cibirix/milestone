export const siteInfo = {
  name: 'Milestone Steel Structures',
  tagline: 'Veteran-led custom metal buildings with hands-on service from quote to completion',
  phone: '(910) 358-7338',
  phoneDigits: '9103587338',
  email: 'info@milestonestructures.com',
  address: '3311 NC 268, Siloam, NC 27047',
  hours: 'Monday - Sunday: 8:00 AM - 8:00 PM',
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

export const zipCodes = [
  '20601', '20608', '20613', '20678',
  '20711', '20715', '20721', '20733', '20737', '20754', '20758',
  '20772', '20774', '20776', '20778',
  '21012', '21032', '21035', '21037', '21054', '21076',
  '21113', '21122', '21146',
  '21401',
]

export const serviceCategories = [
  {
    slug: 'roofing',
    title: 'Roofing',
    description: 'Roof repair, replacement, and storm-ready solutions built to last.',
    image: '/services/roof-repairs.jpg',
    type: 'remodeling',
  },
  {
    slug: 'windows',
    title: 'Windows',
    description: 'Energy-efficient window replacement and custom installs.',
    image: '/services/window.jpg',
    type: 'remodeling',
  },
  {
    slug: 'siding-gutters',
    title: 'Siding & Gutters',
    description: 'Durable siding systems and seamless gutter protection.',
    image: '/services/siding.jpg',
    type: 'remodeling',
  },
  {
    slug: 'kitchen-bath',
    title: 'Kitchen & Bath',
    description: 'High-impact remodels designed for comfort and ROI.',
    image: '/services/services-4.jpg',
    type: 'remodeling',
  },
  {
    slug: 'home-additions',
    title: 'Home Additions',
    description: 'Expand your space with expertly managed additions.',
    image: '/services/roof-siding.jpg',
    type: 'remodeling',
  },
  {
    slug: 'decks-patios',
    title: 'Decks & Patios',
    description: 'Outdoor living spaces built for year-round enjoyment.',
    image: '/services/gutter2.jpg',
    type: 'remodeling',
  },
  {
    slug: 'emergency-services',
    title: 'Emergency Services',
    description: '24/7 response for storm damage, tarping, and board-up.',
    image: '/services/roofing-repair.jpg',
    type: 'restoration',
  },
  {
    slug: 'water-damage',
    title: 'Water & Flood Damage',
    description: 'Rapid extraction, drying, and full restoration services.',
    image: '/services/gutter-repair.jpg',
    type: 'restoration',
  },
  {
    slug: 'fire-smoke-damage',
    title: 'Fire & Smoke Damage',
    description: 'Soot cleanup, odor removal, and reconstruction support.',
    image: '/services/siding-repair.jpg',
    type: 'restoration',
  },
  {
    slug: 'storm-damage',
    title: 'Storm Damage',
    description: 'Emergency response and repairs after severe weather.',
    image: '/services/window-repair.jpg',
    type: 'restoration',
  },
]

export type ServiceCategory = (typeof serviceCategories)[number]
export type ServiceCategorySlug = ServiceCategory['slug']

export const homepageSeo = {
  title: 'Custom Metal Buildings | Milestone Steel Structures',
  description:
    'Milestone Steel Structures provides fully customizable metal buildings with veteran-led service, project guidance, and quality structures built around your exact needs.',
  keywords: [
    'custom metal buildings',
    'metal building dealer',
    'metal garages',
    'metal workshops',
    'steel barns',
    'commercial steel buildings',
    'veteran owned metal building company',
    'milestone steel structures',
  ],
} as const

type ServiceSeoProfile = {
  title: string
  description: string
  headline: string
  intro: string
  keywords: readonly string[]
}

export const serviceSeoProfiles: Partial<Record<ServiceCategorySlug, ServiceSeoProfile>> = {
  roofing: {
    title: 'Roofing Company in Glen Burnie, MD | Roof Repair & Roof Replacement',
    description:
      'Trusted roofing company in Glen Burnie, MD for roof repair, roof replacement, roofing installation, emergency roof repair, and residential and commercial roofing services.',
    headline: 'Roofing Company for Roof Repair, Roof Replacement, and Installation',
    intro:
      'Our roofing contractors complete inspections, leak repair, full replacements, and storm damage restoration for residential and commercial properties across Glen Burnie and Anne Arundel County.',
    keywords: [
      'roofing companies',
      'roofing companies near me',
      'roofing contractors',
      'roofing contractors near me',
      'roofing installation',
      'roofing services',
      'affordable roofing',
      'roofing repair company near me',
      'emergency roof repair',
      'roof leak repair',
      'residential roofing',
      'commercial roof repair',
      'commercial roofing contractor',
      'roof repair',
      'roof replacement',
      'roofers near me',
      'roofing Glen Burnie MD',
      'roof repair Glen Burnie MD',
      'roof replacement Glen Burnie MD',
      'roofing contractor Anne Arundel County MD',
      'roof inspection Glen Burnie MD',
      'roof installation near me',
    ],
  },
  windows: {
    title: 'Window Replacement in Glen Burnie, MD | Window Installation Contractors',
    description:
      'Professional window replacement and window installation in Glen Burnie, MD. Work with experienced window contractors for replacement windows, vinyl windows, and energy-efficient upgrades.',
    headline: 'Window Replacement and Installation Services for Homes and Businesses',
    intro:
      'We provide full-service window replacement, glass replacement, and custom installation by licensed window contractors serving Glen Burnie and nearby Maryland communities.',
    keywords: [
      'window replacement',
      'replacement windows near me',
      'window screen replacement',
      'window glass replacement',
      'window replacement cost',
      'window installers near me',
      'best replacement windows',
      'vinyl replacement windows',
      'window replacement companies',
      'window replacement companies near me',
      'window contractor near me',
      'window contractor',
      'replacement window contractor',
      'windows installation service',
      'professional window installers',
      'window replacement service',
      'window replacement Glen Burnie MD',
      'window installation Glen Burnie MD',
      'replacement windows Glen Burnie MD',
      'window installers Glen Burnie MD',
      'window replacement Anne Arundel County MD',
      'energy efficient windows Glen Burnie MD',
      'vinyl windows Glen Burnie MD',
    ],
  },
  'siding-gutters': {
    title: 'Siding and Gutter Contractors in Glen Burnie, MD | Installation & Repair',
    description:
      'Local siding and gutter contractors in Glen Burnie, MD for siding installation, siding replacement, gutter repair, gutter replacement, gutter cleaning, and gutter guards.',
    headline: 'Siding and Gutter Installation, Replacement, and Repair',
    intro:
      'Protect your home exterior with professional siding services and seamless gutter solutions, including repairs, replacement, and long-term moisture management.',
    keywords: [
      'siding contractors',
      'siding contractors near me',
      'siding companies',
      'siding installation',
      'siding replacement',
      'siding installation cost',
      'gutter installation',
      'gutter replacement',
      'gutter repair',
      'gutter cleaning',
      'gutter guards',
      'siding replacement cost',
      'siding installation services',
      'siding replacement services',
      'siding contractor Glen Burnie MD',
      'siding repair Glen Burnie MD',
      'vinyl siding Glen Burnie MD',
      'residential siding Glen Burnie',
      'gutter repair Glen Burnie MD',
      'house siding contractors MD',
    ],
  },
  'kitchen-bath': {
    title: 'Kitchen and Bathroom Remodeling in Glen Burnie, MD | Remodel Contractors',
    description:
      'Kitchen remodeling and bathroom remodel services in Glen Burnie, MD. Work with trusted remodel contractors for full kitchen renovation, bathroom renovation, and design-build upgrades.',
    headline: 'Kitchen Remodeling and Bathroom Remodel Services',
    intro:
      'From layout planning to finishing details, our remodeling contractors manage kitchen and bath renovations with clear timelines, quality craftsmanship, and code-compliant installation.',
    keywords: [
      'bathroom remodel',
      'bathroom renovation',
      'bathroom remodeling',
      'bathroom renovation cost',
      'kitchen remodeling',
      'kitchen renovation',
      'kitchen remodel',
      'kitchen remodel cost',
      'kitchen renovation cost',
      'kitchen remodeling services',
      'bathroom remodelers',
      'kitchen remodeling contractor',
      'kitchen cabinets installation',
      'bathroom renovation contractor',
      'bathroom remodel Glen Burnie MD',
      'kitchen and bath remodeling Glen Burnie MD',
      'bathroom remodeling Glen Burnie MD',
      'kitchen remodeling Glen Burnie MD',
      'bathroom remodeler Glen Burnie MD',
      'kitchen remodeler Glen Burnie MD',
      'remodeling contractor Glen Burnie MD',
      'home remodeling Glen Burnie MD',
    ],
  },
  'home-additions': {
    title: 'Home Additions in Glen Burnie, MD | Room Additions and House Extensions',
    description:
      'Experienced home addition contractors in Glen Burnie, MD for room additions, home extensions, second-story additions, and full-service expansion projects.',
    headline: 'Home Addition Contractors for Room Additions and Extensions',
    intro:
      'Our general contractor team plans and builds home additions that blend with your existing structure, from foundation and framing through finishes and final inspections.',
    keywords: [
      'home additions',
      'home addition contractors',
      'room addition cost',
      'house extension',
      'house extension cost',
      'home extension',
      'home addition service',
      'home improvement services',
      'home remodeling near me',
      'home remodeling services',
      'home addition Glen Burnie MD',
      'room addition Glen Burnie MD',
      'second story addition Glen Burnie MD',
      'home additions Anne Arundel County MD',
      'general contractor for home addition',
      'home addition financing',
      'home addition contractor near me',
    ],
  },
  'decks-patios': {
    title: 'Deck Builder in Glen Burnie, MD | Deck and Patio Installation',
    description:
      'Local deck builders and patio contractors in Glen Burnie, MD for deck construction, deck repair, deck replacement, and patio installation services.',
    headline: 'Deck Builders and Patio Contractors for Outdoor Living Projects',
    intro:
      'We design and build durable outdoor decks and patios with structural precision, attractive finishes, and low-maintenance materials for year-round use.',
    keywords: [
      'deck builder',
      'deck builders near me',
      'deck contractors near me',
      'deck repair',
      'deck companies near me',
      'deck construction',
      'deck replacement',
      'deck installation',
      'deck installation near me',
      'patio repair',
      'deck building company',
      'deck building companies',
      'deck installation services',
      'local deck builder',
      'local deck builders near me',
      'patio installation',
      'patio installation near me',
      'deck builder Glen Burnie MD',
      'deck installation Glen Burnie MD',
      'deck repair Glen Burnie MD',
      'patio contractor Glen Burnie MD',
      'deck builder Anne Arundel County MD',
      'deck and patio builder near me',
    ],
  },
  'emergency-services': {
    title: 'Emergency Restoration Services in Glen Burnie, MD | 24/7 Home Repair',
    description:
      '24/7 emergency services in Glen Burnie, MD for water damage restoration, flood cleanup, fire damage restoration, storm damage repair, and emergency roof repairs.',
    headline: '24/7 Emergency Restoration and Storm Damage Repair Services',
    intro:
      'When urgent property damage happens, our team provides immediate stabilization, emergency roof repair, water removal, and restoration planning with insurance-ready documentation.',
    keywords: [
      'emergency water restoration',
      'flood restoration companies',
      'emergency flood cleanup near me',
      '24/7 fire damage repair',
      'storm damage restoration near me',
      'flood damage restoration',
      'storm damage restoration',
      'water damage services',
      'water damage restoration',
      'fire damage restoration',
      'fire restoration services',
      'storm damage services',
      'emergency roof repairs',
      '24 hour emergency roof repair',
      '24 hour emergency roof repair near me',
      'emergency roofers',
      'emergency roof replacement',
      'storm damage repair contractors',
      'emergency services Glen Burnie MD',
      'water damage restoration Glen Burnie MD',
      'flood cleanup Glen Burnie MD',
      'fire damage restoration Glen Burnie MD',
      'smoke damage cleanup Glen Burnie MD',
      'storm damage repair Glen Burnie MD',
      'emergency water removal Glen Burnie MD',
      'emergency restoration company near me',
      'emergency roof repair Glen Burnie',
      '24/7 home repair services Glen Burnie',
      'emergency siding repair near me',
      'storm damage roofing Glen Burnie',
      'emergency gutter repair Glen Burnie',
      'storm damage home repair near me',
      'emergency home services Glen Burnie MD',
    ],
  },
}

export const serviceDetails = {
  roofing: {
    hero: 'Roof replacements and repairs that protect your home or facility year-round.',
    includes: [
      'Roof inspections and leak detection',
      'Full roof replacement and re-roofing',
      'Storm and wind damage repair',
      'Shingle, metal, and flat roof systems',
      'Gutter and ventilation upgrades',
    ],
    residential: [
      'Architectural shingles and premium materials',
      'Warranty-backed installations',
      'Insurance claim support when needed',
    ],
    commercial: [
      'Flat roof and low-slope systems',
      'Preventative maintenance programs',
      'Minimal disruption scheduling',
    ],
  },
  windows: {
    hero: 'Upgrade comfort, efficiency, and curb appeal with new windows.',
    includes: [
      'Energy-efficient replacement windows',
      'Custom window sizing and styles',
      'Weatherproofing and trim work',
      'Specialty window installations',
      'Manufacturer-backed warranties',
    ],
    residential: [
      'Noise reduction and UV protection',
      'Enhanced security and lock systems',
      'Modern styles to match your home',
    ],
    commercial: [
      'Large-format glazing solutions',
      'Office and retail frontage upgrades',
      'Code-compliant installations',
    ],
  },
  'siding-gutters': {
    hero: 'Protect your exterior with durable siding and water management systems.',
    includes: [
      'Siding repair and replacement',
      'Seamless gutter installation',
      'Soffit and fascia upgrades',
      'Moisture and weather barrier protection',
      'Color and texture matching',
    ],
    residential: [
      'Fiber cement, vinyl, and composite options',
      'Enhanced curb appeal with low maintenance',
      'Storm-ready exterior systems',
    ],
    commercial: [
      'Durable cladding for multi-family and retail',
      'Waterproofing and drainage coordination',
      'Long-term maintenance planning',
    ],
  },
  'kitchen-bath': {
    hero: 'High-value kitchen and bath remodels that blend function and style.',
    includes: [
      'Full design-build remodeling',
      'Cabinetry, countertops, and tile',
      'Lighting and plumbing coordination',
      'Accessibility upgrades',
      'Permit management and inspections',
    ],
    residential: [
      'Layout optimization and storage upgrades',
      'Premium finishes and fixtures',
      'Project timelines tailored to your household',
    ],
    commercial: [
      'Breakroom and restroom renovations',
      'ADA compliance planning',
      'Off-hours scheduling to reduce downtime',
    ],
  },
  'home-additions': {
    hero: 'Expand your square footage with seamless, code-compliant additions.',
    includes: [
      'Room additions and expansions',
      'Structural framing and exterior tie-ins',
      'Roofline integration and finishing',
      'Permit and inspection management',
      'Full interior build-out',
    ],
    residential: [
      'Primary suites, sunrooms, and offices',
      'Design guidance to match your home',
      'Energy-efficient envelopes',
    ],
    commercial: [
      'Office expansions and tenant build-outs',
      'Workflow-focused layouts',
      'Phased construction planning',
    ],
  },
  'decks-patios': {
    hero: 'Outdoor living spaces engineered for durability and comfort.',
    includes: [
      'Deck construction and replacement',
      'Composite and wood decking options',
      'Patio covers and pergolas',
      'Stairs, railings, and lighting',
      'Drainage and foundation support',
    ],
    residential: [
      'Custom outdoor entertaining areas',
      'Low-maintenance composite builds',
      'Safety-focused rail systems',
    ],
    commercial: [
      'Hospitality patios and seating areas',
      'Durable materials for high traffic',
      'Code compliance and permitting',
    ],
  },
  'emergency-services': {
    hero: 'Immediate response for storm damage, tarping, and board-up needs.',
    includes: [
      '24/7 emergency response',
      'Roof tarping and temporary repairs',
      'Board-up and site security',
      'Tree removal coordination',
      'Damage documentation for insurance',
    ],
    residential: [
      'Rapid stabilization after storms',
      'Temporary protection to prevent further loss',
      'Insurance coordination support',
    ],
    commercial: [
      'Priority response for critical facilities',
      'Safety and access control',
      'Multi-site damage triage',
    ],
  },
  'water-damage': {
    hero: 'Rapid water extraction, drying, and full restoration services.',
    includes: [
      '24/7 water extraction and drying',
      'Structural drying and dehumidification',
      'Mold prevention and remediation',
      'Content cleaning and pack-out',
      'Full reconstruction and repairs',
    ],
    residential: [
      'Basement and crawlspace flooding',
      'Appliance and plumbing leak restoration',
      'Storm-driven water intrusion response',
    ],
    commercial: [
      'Large-loss water mitigation',
      'Business continuity planning',
      'Multi-unit and facility restoration',
    ],
  },
  'fire-smoke-damage': {
    hero: 'Soot removal, odor elimination, and full reconstruction support.',
    includes: [
      'Fire and smoke damage assessment',
      'Soot cleanup and odor removal',
      'HVAC and duct cleaning',
      'Content pack-out and restoration',
      'Structural repair and rebuild',
    ],
    residential: [
      'Family-safe cleanup procedures',
      'Temporary protections during reconstruction',
      'Insurance claim guidance',
    ],
    commercial: [
      'Large-scale deodorization',
      'Equipment and asset recovery',
      'Phased reconstruction for operations',
    ],
  },
  'storm-damage': {
    hero: 'Storm recovery services with expert repairs and restoration.',
    includes: [
      'Wind and hail damage inspections',
      'Emergency tarping and stabilization',
      'Roof, siding, and window repairs',
      'Water intrusion mitigation',
      'Insurance documentation support',
    ],
    residential: [
      'Fast-response repair scheduling',
      'Interior and exterior storm restoration',
      'Clear project communication',
    ],
    commercial: [
      'Multi-building storm assessments',
      'Priority scheduling for critical sites',
      'Coordinated trades and reporting',
    ],
  },
} as const

export const processSteps = [
  {
    title: 'Inspection & Consultation',
    description: 'We assess the scope, document damage, and outline clear next steps.',
  },
  {
    title: 'Detailed Estimate',
    description: 'You receive a transparent estimate with timelines and options.',
  },
  {
    title: 'Project Execution',
    description: 'Our crews deliver the work with daily progress updates.',
  },
  {
    title: 'Final Walkthrough',
    description: 'We confirm quality, review warranties, and close out the project.',
  },
]

type FaqItem = {
  question: string
  answer: string
}

export const serviceFaqs: Partial<Record<ServiceCategorySlug, FaqItem[]>> = {
  roofing: [
    {
      question: 'Do you provide roof repair and roof replacement in Glen Burnie, MD?',
      answer: 'Yes. We provide roof repair, roof replacement, and full roofing installation for homes and commercial properties across Glen Burnie and Anne Arundel County.',
    },
    {
      question: 'How fast can you respond to emergency roof repair?',
      answer: 'Our emergency team is available 24/7 for urgent roof leak repair, storm damage tarping, and rapid stabilization to prevent further interior damage.',
    },
    {
      question: 'Do your roofing contractors work with insurance claims?',
      answer: 'Yes. We document storm and leak damage, provide inspection reports, and coordinate with adjusters to keep the claim and repair process moving.',
    },
  ],
  windows: [
    {
      question: 'Do you offer full window replacement and installation services?',
      answer: 'Yes. Our window contractors handle replacement windows, new window installation, and window glass replacement with energy-efficient options.',
    },
    {
      question: 'Can you help me choose the best replacement windows for my home?',
      answer: 'Yes. We review performance, style, insulation value, and budget so you can choose the best replacement windows for your property goals.',
    },
    {
      question: 'Do you install windows in Glen Burnie and nearby areas?',
      answer: 'We install windows in Glen Burnie, Anne Arundel County, and surrounding Maryland communities for both residential and commercial projects.',
    },
  ],
  'siding-gutters': [
    {
      question: 'What siding and gutter services do you provide?',
      answer: 'We provide siding installation, siding replacement, siding repair, gutter installation, gutter replacement, and gutter repair for long-term exterior protection.',
    },
    {
      question: 'Do you install gutter guards and perform gutter cleaning?',
      answer: 'Yes. We install gutter guards and can recommend maintenance schedules to reduce overflow risk, clogs, and moisture-related exterior damage.',
    },
    {
      question: 'Can you match existing vinyl siding during repairs?',
      answer: 'In many cases, yes. We source matching materials and coordinate repairs to preserve curb appeal while restoring weather resistance.',
    },
  ],
  'kitchen-bath': [
    {
      question: 'Do you handle complete kitchen remodeling and bathroom remodel projects?',
      answer: 'Yes. We manage kitchen and bathroom remodeling from planning and permits through installation, finishes, and final walkthrough.',
    },
    {
      question: 'Can you provide budget guidance for kitchen or bathroom renovation costs?',
      answer: 'Yes. We provide clear estimates with options by scope, materials, and timeline so you can align your remodel with your budget goals.',
    },
    {
      question: 'Do you offer design-build remodeling in Glen Burnie, MD?',
      answer: 'Yes. Our team offers design-build coordination for kitchen and bath renovations in Glen Burnie and nearby Maryland service areas.',
    },
  ],
  'home-additions': [
    {
      question: 'What types of home additions do you build?',
      answer: 'We build room additions, second-story additions, and home extensions, including structural framing, exterior integration, and interior finishing.',
    },
    {
      question: 'Do you manage permits and inspections for home additions?',
      answer: 'Yes. We coordinate permitting and inspections so your home addition project stays code-compliant and on schedule.',
    },
    {
      question: 'Can I finance a home addition project?',
      answer: 'Financing may be available for qualified homeowners, and we can guide you through current options during your estimate consultation.',
    },
  ],
  'decks-patios': [
    {
      question: 'Do you provide deck construction, deck repair, and deck replacement?',
      answer: 'Yes. Our deck builders handle new deck construction, deck installation, repairs, and full replacement with wood or composite systems.',
    },
    {
      question: 'Do you also build patios and outdoor living spaces?',
      answer: 'Yes. We build patios, stairs, railings, and related outdoor features to create durable, functional spaces for year-round use.',
    },
    {
      question: 'Do you serve Glen Burnie for deck and patio projects?',
      answer: 'Yes. We complete deck and patio projects in Glen Burnie, Anne Arundel County, and surrounding Maryland communities.',
    },
  ],
  'emergency-services': [
    {
      question: 'What emergency services do you provide 24/7?',
      answer: 'We provide emergency roof repairs, tarping, board-up, water removal, flood cleanup, storm stabilization, and fire or smoke damage response.',
    },
    {
      question: 'Do you offer water damage restoration and flood cleanup in Glen Burnie, MD?',
      answer: 'Yes. We provide rapid water damage restoration and emergency flood cleanup in Glen Burnie, including extraction, drying, and repair planning.',
    },
    {
      question: 'Can your emergency restoration team support insurance documentation?',
      answer: 'Yes. We document property damage with photos and scope details to support adjuster communication and claims processing.',
    },
  ],
}

export const faqs = [
  {
    question: 'Do you offer free inspections and estimates?',
    answer: 'Yes. We provide complimentary inspections and written estimates for all services.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'House Transformers Inc. is fully licensed and insured for residential and commercial work.',
  },
  {
    question: 'Do you help with insurance claims?',
    answer: 'Absolutely. We document damage, provide reports, and work alongside your adjuster when needed.',
  },
  {
    question: 'How fast can you respond to emergencies?',
    answer: 'Our emergency team is available 24/7 and prioritizes same-day response when possible.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We are based in Glen Burnie, MD and serve surrounding Maryland and DMV communities.',
  },
  {
    question: 'Do you handle commercial projects?',
    answer: 'Yes. We specialize in commercial roofing, restoration, and remodeling with minimal disruption.',
  },
  {
    question: 'What financing options are available?',
    answer: 'Financing is available for qualified customers. We will guide you through available programs.',
  },
  {
    question: 'What materials do you install for roofing and siding?',
    answer: 'We install premium shingle, metal, and flat roof systems along with fiber cement and vinyl siding options.',
  },
  {
    question: 'Can you coordinate multiple trades?',
    answer: 'Yes. Our project managers coordinate roofing, siding, windows, and interior trades for seamless delivery.',
  },
  {
    question: 'What should I do after storm or water damage?',
    answer: 'Call us immediately. We will secure the property, prevent further damage, and guide you on next steps.',
  },
]

export const testimonials = [
  {
    name: 'Amanda L.',
    location: 'Glen Burnie, MD',
    rating: 5,
    text: 'The team handled our roof replacement quickly and the cleanup was spotless. We felt informed every step of the way.',
    date: '2024-08-15',
  },
  {
    name: 'Jason P.',
    location: 'Severna Park, MD',
    rating: 5,
    text: 'After a storm, they secured our home the same day and helped with the insurance paperwork. Highly recommended.',
    date: '2024-09-09',
  },
  {
    name: 'Maria S.',
    location: 'Annapolis, MD',
    rating: 5,
    text: 'Our kitchen remodel was on schedule and the craftsmanship is outstanding. Great communication throughout.',
    date: '2024-10-05',
  },
]

export const galleryImages = [
  {
    src: '/services/roof-repairs.jpg',
    alt: 'Roof replacement project in Glen Burnie, MD',
  },
  {
    src: '/services/services-4.jpg',
    alt: 'Exterior remodeling project completed by House Transformers Inc.',
  },
  {
    src: '/services/roof-siding.jpg',
    alt: 'Roofing and siding upgrade for a Maryland home',
  },
  {
    src: '/services/gutter2.jpg',
    alt: 'Seamless gutter installation project',
  },
  {
    src: '/services/siding.jpg',
    alt: 'New siding installation with upgraded trim',
  },
  {
    src: '/services/window.jpg',
    alt: 'Energy-efficient window replacement project',
  },
  {
    src: '/services/roofing-repair.jpg',
    alt: 'Storm damage roof repair and restoration',
  },
  {
    src: '/services/window-repair.jpg',
    alt: 'Commercial window repair and restoration',
  },
]

export const videoGallery = [
  {
    title: 'House Transformers Inc. on YouTube',
    url: siteInfo.social.youtube,
    embed: 'https://www.youtube.com/embed?listType=search&list=House%20Transformers%20Inc',
  },
  {
    title: 'Roofing & Restoration Highlights',
    url: siteInfo.social.youtube,
    embed: 'https://www.youtube.com/embed?listType=search&list=Glen%20Burnie%20roofing%20restoration',
  },
  {
    title: 'Emergency Storm Response',
    url: siteInfo.social.youtube,
    embed: 'https://www.youtube.com/embed?listType=search&list=storm%20damage%20restoration%20Maryland',
  },
]

export const blogPosts = [
  {
    slug: 'what-to-do-after-storm-damage',
    title: 'What To Do Immediately After Storm Damage',
    date: '2025-01-18',
    excerpt: 'Fast action can prevent secondary damage and speed up insurance approvals. Here is what to do first.',
    content: [
      'Storm damage can escalate quickly if the property is left exposed. The first step is to secure the structure and prevent additional water intrusion.',
      'Document everything with photos and videos before any major cleanup. This helps your insurance claim and speeds up approvals.',
      'Call a licensed contractor who can provide emergency tarping, board-up services, and a full inspection report.',
    ],
  },
  {
    slug: 'signs-you-need-a-roof-replacement',
    title: '7 Signs You May Need a Roof Replacement',
    date: '2025-02-02',
    excerpt: 'Knowing when to replace your roof can save money and prevent emergency damage.',
    content: [
      'Look for missing shingles, granule loss, sagging areas, or persistent leaks. These are common indicators that a replacement may be needed.',
      'Age matters too. Many asphalt roofs reach the end of their lifespan around 20-25 years depending on maintenance and ventilation.',
      'A professional inspection will confirm the extent of wear and recommend repair or replacement options.',
    ],
  },
  {
    slug: 'water-damage-restoration-process',
    title: 'Understanding the Water Damage Restoration Process',
    date: '2025-02-20',
    excerpt: 'From extraction to reconstruction, here is how a professional water restoration project works.',
    content: [
      'Professional water restoration begins with rapid extraction and structural drying using commercial-grade equipment.',
      'Next, we address moisture monitoring, mold prevention, and content restoration to protect valuables and finishes.',
      'Once the space is fully dry, we complete repairs and reconstruction to return the property to pre-loss condition.',
    ],
  },
  {
    slug: 'financing-options-for-remodeling',
    title: 'Financing Options for Home Remodeling Projects',
    date: '2025-03-04',
    excerpt: 'Financing can help you start your project sooner while preserving cash flow.',
    content: [
      'Many homeowners use financing to spread costs across manageable monthly payments.',
      'We can review available options and connect you with lenders who specialize in home improvement projects.',
      'Our team will help you select the right scope and timeline to meet your budget goals.',
    ],
  },
]
