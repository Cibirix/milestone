export type ProductCategory =
  | 'Carports'
  | 'Garages'
  | 'Workshops'
  | 'Agricultural Buildings'

export type Product = {
  sourceNumber?: number
  slug: string
  name: string
  category: ProductCategory
  image: string
  width: string
  length: string
  height: string
  roofStyle: string
  basePriceLabel?: string
  financingAvailable: boolean
  rtoAvailable: boolean
  description: string
  highlights: string[]
}

export const products: Product[] = [
  {
    sourceNumber: 3,
    slug: '30x60x16-premium-agriculture-building',
    name: '30x60x16 Premium Agriculture Building',
    category: 'Agricultural Buildings',
    image: '/products/milestone/30x60x16-premium-agriculture-building.png',
    width: '30 ft',
    length: '60 ft',
    height: '16 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'This 30x60x16 premium agricultural building includes a 12x14 frame-out, a walk-through entry, and two windows for accessibility and visibility. With generous height and open span design, it offers dependable storage for tractors, hay, and critical farming equipment.',
    highlights: ['12x14 frame-out', 'Walk-through entry', 'Two windows'],
  },
  {
    sourceNumber: 25,
    slug: '30x70x12-utility-workshop',
    name: '30x70x12 Utility Workshop',
    category: 'Workshops',
    image: '/products/milestone/30x70x12-utility-workshop.png',
    width: '30 ft',
    length: '70 ft',
    height: '12 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'This 30x70x12 utility workshop features four roll-up doors and a walk-in entry for convenient access and efficient workflow. Tan vertical siding paired with bold black trim delivers lasting durability and clean curb appeal.',
    highlights: ['Four roll-up doors', 'Walk-in entry', 'Tan siding with black trim'],
  },
  {
    sourceNumber: 28,
    slug: '30x30x10-two-car-garage',
    name: '30x30x10 Two Car Garage',
    category: 'Garages',
    image: '/products/milestone/30x30x10-two-car-garage.png',
    width: '30 ft',
    length: '30 ft',
    height: '10 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'The 30x30x10 two car garage is designed for easy access and functionality. This structure includes two roll-up doors and a walk-in entry. Natural light and an open layout make it ideal for vehicles, equipment, boats, and more.',
    highlights: ['Two roll-up doors', 'Walk-in entry', 'Open interior layout'],
  },
  {
    sourceNumber: 29,
    slug: '30x40x12-two-car-garage',
    name: '30x40x12 Two Car Garage',
    category: 'Garages',
    image: '/products/milestone/30x40x12-two-car-garage.png',
    width: '30 ft',
    length: '40 ft',
    height: '12 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'The 30x40x12 two-car garage includes two roll-up doors, a walk-in entry, and a window, offering accessibility and functional light. A spacious interior makes it ideal for vehicles, equipment, boats, and additional storage needs.',
    highlights: ['Two roll-up doors', 'Walk-in entry', 'One window'],
  },
  {
    sourceNumber: 36,
    slug: '26x30x10-two-car-garage',
    name: '26x30x10 Two Car Garage',
    category: 'Garages',
    image: '/products/milestone/26x30x10-two-car-garage.png',
    width: '26 ft',
    length: '30 ft',
    height: '10 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'This 26x30x10 side-entry two-car garage includes two roll-up doors, a walk-in entry, and two windows, offering accessibility and functional light. A spacious, secure interior makes it ideal for cars, tools, boats, and more.',
    highlights: ['Side-entry layout', 'Two roll-up doors', 'Two windows'],
  },
  {
    sourceNumber: 40,
    slug: '26x40x10-three-car-garage',
    name: '26x40x10 Three Car Garage',
    category: 'Garages',
    image: '/products/milestone/26x40x10-three-car-garage.png',
    width: '26 ft',
    length: '40 ft',
    height: '10 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'The 26x40x10 side-entry three-car garage includes three roll-up doors, a walk-in entry, and five windows, offering accessibility and bright, functional space. A spacious interior makes it ideal for vehicles, tools, boats, and additional storage needs.',
    highlights: ['Side-entry layout', 'Three roll-up doors', 'Five windows'],
  },
  {
    sourceNumber: 52,
    slug: '18x10x14-rv-cover',
    name: '18x10x14 RV Cover',
    category: 'Carports',
    image: '/products/milestone/18x10x14-rv-cover.png',
    width: '18 ft',
    length: '40 ft',
    height: '14 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'This 18x40x14 RV cover features an open single-panel design with a vertical roof for strength and efficient water runoff. Built for durability and weather resistance, it provides reliable protection for your RV, boat, and more.',
    highlights: ['Open single-panel design', 'RV/boat coverage', 'Weather-resistant build'],
  },
  {
    slug: '24x60x12-two-car-garage',
    name: '24x60x12 Two Car Garage',
    category: 'Garages',
    image: '/products/milestone/24x60x12-two-car-garage.jpg',
    width: '24 ft',
    length: '60 ft',
    height: '12 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'The 24x60x12 two-car garage with wainscoting combines extended coverage with versatile storage capacity. Two roll-up doors, a walk-through entry, and two windows ensure easy access and airflow, making it well-suited for vehicles, boats, and additional storage needs.',
    highlights: ['Wainscoting', 'Two roll-up doors', 'Two windows'],
  },
  {
    slug: '24x60x12-premium-two-car-garage',
    name: '24x60x12 Premium Two Car Garage',
    category: 'Garages',
    image: '/products/milestone/24x60x12-premium-two-car-garage.jpg',
    width: '26 ft',
    length: '35 ft',
    height: '12 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'The 24x60x12 premium two-car garage with covered porch combines extended coverage with versatile storage capacity. Two roll-up doors, dual walk-in entries, and two windows ensure accessibility and bright interior space, making it well-suited for vehicles, boats, and additional storage needs.',
    highlights: ['Covered porch', 'Dual walk-in entries', 'Two roll-up doors'],
  },
  {
    slug: '40x70x14-prime-agricultural-building',
    name: '40x70x14 Prime Agricultural Building',
    category: 'Agricultural Buildings',
    image: '/products/milestone/40x70x14-prime-agricultural-building.jpg',
    width: '40 ft',
    length: '70 ft',
    height: '14 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'The 40x70x14 prime agricultural building includes a 12x12 frame-out, a walk-through entry, and two windows for accessibility and visibility. With generous space and durable construction, it delivers reliable protection for farm equipment and more.',
    highlights: ['12x12 frame-out', 'Walk-through entry', 'Two windows'],
  },
  {
    slug: '30x60x12-premium-workshop',
    name: '30x60x12 Premium Workshop',
    category: 'Workshops',
    image: '/products/milestone/30x60x12-premium-workshop.jpg',
    width: '30 ft',
    length: '60 ft',
    height: '12 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'This 30x60x12 premium workshop with covered porch combines functional access with extended coverage. Three 10x10 roll-up doors, a walk-in entry, and a window ensure smooth workflow and visibility, while the covered porch provides additional protected space for equipment and outdoor storage.',
    highlights: ['Covered porch', 'Three 10x10 roll-up doors', 'Walk-in entry and window'],
  },
  {
    slug: '26x30x12-walk-out-garage',
    name: '26x30x12 Walk Out Garage',
    category: 'Garages',
    image: '/products/milestone/26x30x12-walk-out-garage.jpg',
    width: '26 ft',
    length: '30 ft',
    height: '12 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'The 26x30x12 walk-out garage includes two front roll-up doors and a walk-in entry for easy access. A side door and windows add functionality and natural light, while a front lean-to extends usable covered space for vehicles, equipment, boats, and workshop use.',
    highlights: ['Front lean-to', 'Two front roll-up doors', 'Side door with windows'],
  },
  {
    slug: '18x25x12-carport',
    name: '18x25x12 Carport',
    category: 'Carports',
    image: '/products/milestone/18x25x12-carport.jpg',
    width: '18 ft',
    length: '25 ft',
    height: '12 ft',
    roofStyle: 'Vertical Roof',
    basePriceLabel: 'n/a',
    financingAvailable: true,
    rtoAvailable: false,
    description:
      'This 18x25x12 carport features an open single-panel design, vertical roof system, and enclosed gable for added coverage and integrity. Built for durability and harsh weather conditions, it provides reliable protection while optimizing functional space.',
    highlights: ['Open single-panel design', 'Enclosed gable', 'Durable weather-ready coverage'],
  },
]

export const featuredProducts = products.slice(0, 8)

export const productCategories = ['All', ...Array.from(new Set(products.map((product) => product.category)))] as const

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
