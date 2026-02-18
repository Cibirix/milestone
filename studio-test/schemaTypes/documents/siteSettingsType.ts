import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'phoneDigits', title: 'Phone Digits', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'hours', title: 'Hours', type: 'string' }),
    defineField({ name: 'serviceArea', title: 'Service Area Summary', type: 'string' }),
    defineField({ name: 'seoDefault', title: 'Default SEO', type: 'seo' }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'tagline',
    },
  },
})
