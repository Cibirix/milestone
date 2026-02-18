export type ProductCategory = 'Carports' | 'Garages' | 'Barns' | 'Commercial'

export type Product = {
  id: number
  slug: string
  name: string
  category: ProductCategory
  image: string
  width: string
  length: string
  legHeight: string
  roofStyle: string
  gauge: string
  description: string
  highlights: string[]
}

const categories: ProductCategory[] = ['Carports', 'Garages', 'Barns', 'Commercial']
const roofStyles = ['Regular Roof', 'A-Frame Vertical Roof', 'A-Frame Horizontal Roof']
const widths = ['18 ft', '20 ft', '24 ft', '30 ft', '40 ft']
const lengths = ['21 ft', '26 ft', '31 ft', '36 ft', '41 ft', '51 ft']
const heights = ['9 ft', '10 ft', '11 ft', '12 ft', '14 ft']

export const products: Product[] = Array.from({ length: 54 }, (_, index) => {
  const id = index + 1
  const category = categories[index % categories.length]
  const roofStyle = roofStyles[index % roofStyles.length]

  return {
    id,
    slug: `scout-series-s${id}`,
    name: `Scout Series S${id}`,
    category,
    image: `/products/s${id}.png`,
    width: widths[index % widths.length],
    length: lengths[index % lengths.length],
    legHeight: heights[index % heights.length],
    roofStyle,
    gauge: index % 2 === 0 ? '14-gauge framing' : '12-gauge framing',
    description: `The Scout Series S${id} is a configurable ${category.toLowerCase()} option with engineered steel framing, customizable colors, and installation-ready plans for local code requirements.`,
    highlights: [
      `${roofStyle} with boxed eaves and trim package`,
      'Upgrade-ready side panels and gable ends',
      'Engineered for wind and snow load options',
      'Built-to-order color combinations available',
    ],
  }
})

export const featuredProducts = products.slice(0, 8)

export const productCategories = ['All', ...categories] as const

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
