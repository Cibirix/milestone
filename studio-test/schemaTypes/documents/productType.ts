import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fieldsets: [
    {
      name: 'merchantFeed',
      title: 'Merchant Feed (Google / Meta)',
      options: { collapsible: true, collapsed: false },
      description:
        'Feed readiness checklist: 1) Product name + slug set, 2) Add primary image (preferred) or fallback image path, 3) Add stable feed price, 4) Confirm availability/currency, 5) Turn on "Include In Merchant Feed" only when ready to publish to channels.',
    },
  ],
  validation: (rule) =>
    rule.custom((document) => {
      const product = document as {
        includeInFeed?: boolean
        feedPrice?: number
        image?: unknown
        sourcePath?: string
        title?: string
        slug?: { current?: string }
      } | undefined

      if (!product?.includeInFeed) return true

      if (!product.title?.trim()) return 'Feed-ready products must have a product name.'
      if (!product.slug?.current?.trim()) return 'Feed-ready products must have a slug.'
      if (typeof product.feedPrice !== 'number' || Number.isNaN(product.feedPrice) || product.feedPrice <= 0) {
        return 'Feed-ready products must include a valid Feed Price greater than 0.'
      }
      if (!product.image && !product.sourcePath?.trim()) {
        return 'Feed-ready products need a primary image upload or a fallback image path.'
      }

      return true
    }),
  fields: [
    defineField({ name: 'title', title: 'Product Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Carports', 'Garages', 'Workshops', 'Agricultural Buildings', 'Other'],
      },
    }),
    defineField({ name: 'sourceNumber', title: 'Source Product Number (Optional)', type: 'number' }),
    defineField({ name: 'width', title: 'Width', type: 'string', description: 'Example: 30 ft' }),
    defineField({ name: 'length', title: 'Length', type: 'string', description: 'Example: 60 ft' }),
    defineField({ name: 'height', title: 'Height', type: 'string', description: 'Example: 12 ft' }),
    defineField({ name: 'roofStyle', title: 'Roof Style', type: 'string', description: 'Example: Vertical Roof' }),
    defineField({ name: 'basePriceLabel', title: 'Base Price Label', type: 'string', description: 'Use values like n/a, Call for Quote, or a base price note.' }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'description', title: 'Full Description', type: 'text', rows: 6 }),
    defineField({
      name: 'image',
      title: 'Primary Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'imageAlt', title: 'Primary Image Alt Text', type: 'string' }),
    defineField({
      name: 'sourcePath',
      title: 'Fallback Image Path',
      type: 'string',
      description: 'Optional local/public image path fallback (example: /products/s1.png).',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'financingAvailable', title: 'Financing Available', type: 'boolean', initialValue: false }),
    defineField({ name: 'rtoAvailable', title: 'RTO Available', type: 'boolean', initialValue: false }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price (Website)',
      type: 'number',
      description: 'Optional: for quote-first sites, this can be a \"starting at\" number shown on the website.',
    }),
    defineField({
      name: 'includeInFeed',
      title: 'Include In Merchant Feed',
      type: 'boolean',
      initialValue: false,
      description: 'Only enable when the product is ready for Google Merchant / Meta catalog ingestion.',
      fieldset: 'merchantFeed',
    }),
    defineField({
      name: 'feedPrice',
      title: 'Feed Price (Merchant Center)',
      type: 'number',
      description: 'Required for Merchant Center items. Use a base/starting price that is stable enough for feeds.',
      fieldset: 'merchantFeed',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as { includeInFeed?: boolean } | undefined
          if (!doc?.includeInFeed) return true
          if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
            return 'Feed Price is required and must be greater than 0 when "Include In Merchant Feed" is enabled.'
          }
          return true
        }),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      fieldset: 'merchantFeed',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: { list: ['in stock', 'out of stock', 'preorder'] },
      initialValue: 'in stock',
      fieldset: 'merchantFeed',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
      includeInFeed: 'includeInFeed',
      feedPrice: 'feedPrice',
      sourcePath: 'sourcePath',
      image: 'image',
    },
    prepare(selection) {
      const {
        title,
        subtitle,
        media,
        includeInFeed,
        feedPrice,
        sourcePath,
        image,
      } = selection as {
        title?: string
        subtitle?: string
        media?: unknown
        includeInFeed?: boolean
        feedPrice?: number
        sourcePath?: string
        image?: unknown
      }

      const hasImage = Boolean(image || sourcePath)
      const isFeedEligible = Boolean(
        includeInFeed &&
        typeof feedPrice === 'number' &&
        Number.isFinite(feedPrice) &&
        feedPrice > 0 &&
        hasImage,
      )

      const status = isFeedEligible
        ? 'Feed Ready'
        : includeInFeed
          ? 'Feed Incomplete'
          : 'Feed Off'

      return {
        title: title || 'Untitled Product',
        subtitle: [subtitle, status].filter(Boolean).join(' • '),
        media,
      }
    },
  },
})
