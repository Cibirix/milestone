export type WooImage = {
  id: number
  src: string
  alt?: string
}

export type WooCategory = {
  id: number
  name: string
  slug: string
}

export type WooProduct = {
  id: number
  name: string
  slug: string
  description?: string
  short_description?: string
  sku?: string
  status?: string
  type?: string
  permalink?: string
  price?: string
  regular_price?: string
  sale_price?: string
  images?: WooImage[]
  categories?: WooCategory[]
}
