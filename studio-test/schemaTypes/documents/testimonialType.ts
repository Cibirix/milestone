import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', validation: (rule) => rule.min(1).max(5) }),
    defineField({ name: 'text', title: 'Quote', type: 'text', validation: (rule) => rule.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
  ],
})
