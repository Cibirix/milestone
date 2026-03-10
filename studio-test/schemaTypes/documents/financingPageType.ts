import { defineField, defineType } from 'sanity'

export const financingPageType = defineType({
  name: 'financingPage',
  title: 'Financing Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Document Title', type: 'string', initialValue: 'Financing Page Content' }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'text', rows: 3 }),
    defineField({ name: 'financingHeading', title: 'Financing Section Heading', type: 'string' }),
    defineField({ name: 'financingBody', title: 'Financing Section Body', type: 'text', rows: 4 }),
    defineField({
      name: 'lightstreamButtonLabel',
      title: 'LightStream Button Label',
      type: 'string',
      initialValue: 'Apply with LightStream',
    }),
    defineField({ name: 'lightstreamButtonUrl', title: 'LightStream Button URL', type: 'url' }),
    defineField({
      name: 'allegacyButtonLabel',
      title: 'Allegacy Button Label',
      type: 'string',
      initialValue: 'Apply with Allegacy Bank',
    }),
    defineField({ name: 'allegacyButtonUrl', title: 'Allegacy Button URL', type: 'url' }),
    defineField({
      name: 'financingHighlights',
      title: 'Financing Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'applicationFlowHeading',
      title: 'Application Flow Heading',
      type: 'string',
      initialValue: 'Simple Application Flow',
    }),
    defineField({
      name: 'applicationFlowSteps',
      title: 'Application Flow Steps',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'ctaHeading', title: 'Call Assist Heading', type: 'string' }),
    defineField({ name: 'ctaBody', title: 'Call Assist Body', type: 'text', rows: 3 }),
    defineField({
      name: 'disclaimerText',
      title: 'Financing Disclaimer',
      type: 'string',
      initialValue: 'All financing is subject to lender approval and final terms.',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Financing Page',
        subtitle: selection.subtitle || 'Page Content',
      }
    },
  },
})
