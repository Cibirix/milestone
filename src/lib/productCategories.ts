export type CategoryInfo = {
  label: string
  slug: string
  menuLabel: string
  summary: string
}

const categoryInfoByLabel: Record<string, CategoryInfo> = {
  Carports: {
    label: 'Carports',
    slug: 'steel-carports',
    menuLabel: 'Steel Carports',
    summary: 'Open-span protection for vehicles, RVs, trailers, and equipment with durable roof options.',
  },
  Garages: {
    label: 'Garages',
    slug: 'steel-garages',
    menuLabel: 'Steel Garages',
    summary: 'Enclosed garage structures with customizable doors, windows, and layout options.',
  },
  Workshops: {
    label: 'Workshops',
    slug: 'steel-workshops',
    menuLabel: 'Steel Workshops',
    summary: 'Work-ready utility and premium workshop buildings designed for daily use and storage.',
  },
  'Agricultural Buildings': {
    label: 'Agricultural Buildings',
    slug: 'steel-barns',
    menuLabel: 'Steel Barns',
    summary: 'Agricultural structures for equipment storage, farm operations, and high-clearance needs.',
  },
  Other: {
    label: 'Other',
    slug: 'steel-structures',
    menuLabel: 'Steel Structures',
    summary: 'Custom metal structures built around unique residential, commercial, or industrial needs.',
  },
}

const categoryInfoBySlug = Object.values(categoryInfoByLabel).reduce<Record<string, CategoryInfo>>((acc, category) => {
  acc[category.slug] = category
  return acc
}, {})

function slugifyCategory(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getCategoryInfoByLabel(label: string): CategoryInfo {
  return (
    categoryInfoByLabel[label] || {
      label,
      slug: slugifyCategory(label || 'category'),
      menuLabel: label || 'Category',
      summary: 'Explore customizable metal building options in this category.',
    }
  )
}

export function getCategoryInfoBySlug(slug: string): CategoryInfo | null {
  return categoryInfoBySlug[slug] || null
}

export function getCategoryMenuItems() {
  return [
    categoryInfoByLabel.Carports,
    categoryInfoByLabel.Garages,
    categoryInfoByLabel.Workshops,
    categoryInfoByLabel['Agricultural Buildings'],
    categoryInfoByLabel.Other,
  ]
}

export function toCategorySlug(label: string) {
  return getCategoryInfoByLabel(label).slug
}
