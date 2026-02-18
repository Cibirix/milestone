import { defineField, defineType } from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'sourcePath', title: 'Source Path (public file path)', type: 'string' }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Roofing', 'Decks & Patios', 'Renovations', 'Home Additions', 'Restoration'],
      },
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'serviceSlugs', title: 'Related Service Slugs', type: 'array', of: [{ type: 'string' }] }),
  ],
})
