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

export const aboutPageQuery = groq`*[_type == "aboutPage"] | order(_updatedAt desc)[0]{
  heroEyebrow,
  heroHeading,
  heroBody,
  veteranBadgeLabel,
  storyCardHeading,
  storyCardBodyPrimary,
  storyCardBodySecondary,
  valuesCardHeading,
  valuesList,
  coverageHeading,
  coverageBody,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImageUrl": ogImage.asset->url
  }
}`

export const contactPageQuery = groq`*[_type == "contactPage"] | order(_updatedAt desc)[0]{
  heroEyebrow,
  heroHeading,
  heroBody,
  veteranBadgeLabel,
  contactCardHeading,
  contactCardIntro,
  facebookLabel,
  warrantyNote,
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
  facebookUrl,
  instagramUrl,
  footerSummary,
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

export const productsQuery = groq`*[_type == "product"] | order(_updatedAt desc){
  title,
  "slug": slug.current,
  category,
  sourceNumber,
  width,
  length,
  height,
  roofStyle,
  basePriceLabel,
  shortDescription,
  description,
  imageAlt,
  "imageUrl": image.asset->url,
  sourcePath,
  highlights,
  startingPrice,
  financingAvailable,
  rtoAvailable
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  category,
  sourceNumber,
  width,
  length,
  height,
  roofStyle,
  basePriceLabel,
  shortDescription,
  description,
  imageAlt,
  "imageUrl": image.asset->url,
  sourcePath,
  highlights,
  startingPrice,
  financingAvailable,
  rtoAvailable
}`

export const merchantFeedProductsQuery = groq`*[_type == "product" && includeInFeed == true && defined(feedPrice)] | order(_updatedAt desc){
  title,
  "slug": slug.current,
  category,
  shortDescription,
  description,
  imageAlt,
  "imageUrl": image.asset->url,
  sourcePath,
  feedPrice,
  currency,
  availability
}`
