import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string', initialValue: 'Contact Page Content' }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'text', rows: 4 }),
    defineField({ name: 'contactCardHeading', title: 'Contact Card Heading', type: 'string' }),
    defineField({ name: 'contactCardIntro', title: 'Contact Card Intro (Optional)', type: 'text', rows: 3 }),
    defineField({ name: 'facebookLabel', title: 'Facebook Link Label', type: 'string' }),
    defineField({
      name: 'warrantyNote',
      title: 'Warranty/Insulation Note',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'financingPartnersHeading',
      title: 'Financing Partners Heading',
      type: 'string',
      initialValue: 'Financing Partners',
    }),
    defineField({
      name: 'financingPartnersIntro',
      title: 'Financing Partners Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'lightstreamCtaLabel',
      title: 'LightStream Card CTA Label',
      type: 'string',
      initialValue: 'Apply online',
    }),
    defineField({
      name: 'lightstreamImagePath',
      title: 'LightStream Card Image Path',
      type: 'string',
      description: 'Optional local/public image path (example: /products/milestone/26x30x12-walk-out-garage.jpg).',
    }),
    defineField({
      name: 'allegacyCtaLabel',
      title: 'Allegacy Card CTA Label',
      type: 'string',
      initialValue: 'Open partner link',
    }),
    defineField({
      name: 'allegacyImagePath',
      title: 'Allegacy Card Image Path',
      type: 'string',
      description: 'Optional local/public image path (example: /products/milestone/30x60x12-premium-workshop.jpg).',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroHeading',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Contact Page',
        subtitle,
      }
    },
  },
})
