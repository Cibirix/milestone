import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string', initialValue: 'About Page Content' }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'text', rows: 4 }),
    defineField({ name: 'veteranBadgeLabel', title: 'Veteran Badge Label', type: 'string' }),
    defineField({ name: 'storyCardHeading', title: 'Story Card Heading', type: 'string' }),
    defineField({ name: 'storyCardBodyPrimary', title: 'Story Card Body (Primary)', type: 'text', rows: 3 }),
    defineField({ name: 'storyCardBodySecondary', title: 'Story Card Body (Secondary)', type: 'text', rows: 3 }),
    defineField({ name: 'valuesCardHeading', title: 'Values Card Heading', type: 'string' }),
    defineField({
      name: 'valuesList',
      title: 'Values List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'coverageHeading', title: 'Coverage Section Heading', type: 'string' }),
    defineField({
      name: 'coverageBody',
      title: 'Coverage Section Body (Optional Override)',
      type: 'text',
      rows: 4,
      description: 'Leave blank to use Site Settings service area summary.',
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
        title: title || 'About Page',
        subtitle,
      }
    },
  },
})
