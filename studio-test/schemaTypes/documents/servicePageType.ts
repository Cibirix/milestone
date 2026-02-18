import { defineField, defineType } from 'sanity'

const serviceOptions = [
  { title: 'Roofing', value: 'roofing' },
  { title: 'Windows', value: 'windows' },
  { title: 'Siding & Gutters', value: 'siding-gutters' },
  { title: 'Kitchen & Bath', value: 'kitchen-bath' },
  { title: 'Home Additions', value: 'home-additions' },
  { title: 'Decks & Patios', value: 'decks-patios' },
  { title: 'Emergency Services', value: 'emergency-services' },
  { title: 'Water & Flood Damage', value: 'water-damage' },
  { title: 'Fire & Smoke Damage', value: 'fire-smoke-damage' },
  { title: 'Storm Damage', value: 'storm-damage' },
]

export const servicePageType = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({ name: 'serviceName', title: 'Service Name', type: 'string', options: { list: serviceOptions }, validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'serviceName',
        slugify: (input: string) => input,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'seoHeadline', title: 'SEO Headline (H1)', type: 'string' }),
    defineField({ name: 'heroIntro', title: 'Hero Intro', type: 'text', rows: 3 }),
    defineField({ name: 'ctaPrimary', title: 'CTA Primary Label', type: 'string' }),
    defineField({ name: 'ctaSecondary', title: 'CTA Secondary Label', type: 'string' }),
    defineField({ name: 'faqs', title: 'Service FAQs', type: 'array', of: [{ type: 'faqItem' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: {
      title: 'serviceName',
      subtitle: 'slug.current',
    },
    prepare({ title, subtitle }) {
      return { title: title || 'Service Page', subtitle: subtitle ? `/${subtitle}` : undefined }
    },
  },
})
