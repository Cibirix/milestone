import groq from 'groq'

export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0]{
  heroHeadline,
  heroSubheadline,
  localIntroHeading,
  localIntroBody,
  trustedHeading,
  remodelingHeading,
  remodelingBody,
  emergencyHeading,
  emergencyBody,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImageUrl": ogImage.asset->url
  }
}`

export const servicePageBySlugQuery = groq`*[_type == "servicePage" && slug.current == $slug][0]{
  serviceName,
  "slug": slug.current,
  seoHeadline,
  heroIntro,
  ctaPrimary,
  ctaSecondary,
  faqs[]{question, answer},
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImageUrl": ogImage.asset->url
  }
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
  companyName,
  tagline,
  phone,
  phoneDigits,
  email,
  address,
  hours,
  serviceArea,
  seoDefault {
    metaTitle,
    metaDescription,
    keywords,
    "ogImageUrl": ogImage.asset->url
  }
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(date desc){
  name,
  location,
  rating,
  text,
  date
}`

export const galleryItemsQuery = groq`*[_type == "galleryItem"] | order(_createdAt desc){
  title,
  sourcePath,
  alt,
  category,
  location,
  serviceSlugs,
  "imageUrl": image.asset->url
}`
