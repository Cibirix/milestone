import { defineField, defineType } from 'sanity'

export const serviceAreaPageType = defineType({
  name: 'serviceAreaPage',
  title: 'Service Area Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Service Area Page Content',
    }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'text', rows: 4 }),
    defineField({ name: 'coverageHeading', title: 'Coverage Heading', type: 'string' }),
    defineField({ name: 'coverageBody', title: 'Coverage Body', type: 'text', rows: 4 }),
    defineField({
      name: 'coverageStates',
      title: 'Coverage States',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'notes',
      title: 'Coverage Notes',
      type: 'array',
      of: [{ type: 'string' }],
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
        title: title || 'Service Area Page',
        subtitle,
      }
    },
  },
})
