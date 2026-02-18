import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string', initialValue: 'Homepage Content' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text', rows: 3 }),
    defineField({ name: 'localIntroHeading', title: 'Story Section Heading', type: 'string' }),
    defineField({ name: 'localIntroBody', title: 'Story Section Body', type: 'text', rows: 4 }),
    defineField({ name: 'trustedHeading', title: 'Optional Badge Section Heading', type: 'string' }),
    defineField({ name: 'remodelingHeading', title: 'Featured Products Heading', type: 'string' }),
    defineField({ name: 'remodelingBody', title: 'Featured Products Intro', type: 'text', rows: 3 }),
    defineField({ name: 'emergencyHeading', title: 'Bottom CTA Heading (Optional)', type: 'string' }),
    defineField({ name: 'emergencyBody', title: 'Bottom CTA Body (Optional)', type: 'text', rows: 3 }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroHeadline',
    },
    prepare({ title, subtitle }) {
      return { title: title || 'Homepage', subtitle }
    },
  },
})
