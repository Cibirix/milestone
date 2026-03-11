// Keep GROQ queries as plain strings so Next dev doesn't need a separate groq vendor chunk.
const groq = String.raw

export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0]{
  heroHeadline,
  heroSubheadline,
  localIntroHeading,
  localIntroBody,
  remodelingHeading,
  remodelingBody,
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
  storyCardHeading,
  storyCardBodyPrimary,
  storyCardBodySecondary,
  valuesCardHeading,
  valuesList,
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
  contactCardHeading,
  contactCardIntro,
  facebookLabel,
  warrantyNote,
  financingPartnersHeading,
  financingPartnersIntro,
  lightstreamCtaLabel,
  lightstreamImagePath,
  allegacyCtaLabel,
  allegacyImagePath,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImageUrl": ogImage.asset->url
  }
}`

export const financingPageQuery = groq`*[_type == "financingPage"] | order(_updatedAt desc)[0]{
  heroEyebrow,
  heroHeading,
  heroBody,
  financingHeading,
  financingBody,
  lightstreamButtonLabel,
  lightstreamButtonUrl,
  allegacyButtonLabel,
  allegacyButtonUrl,
  "legacyLightstreamButtonLabel": financingButtonLabel,
  "legacyLightstreamButtonUrl": financingButtonUrl,
  "legacyAllegacyButtonLabel": ctaButtonLabel,
  "legacyAllegacyButtonUrl": ctaButtonUrl,
  financingHighlights,
  applicationFlowHeading,
  applicationFlowSteps,
  ctaHeading,
  ctaBody,
  disclaimerText,
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

export const serviceAreaPageQuery = groq`*[_type == "serviceAreaPage"] | order(_updatedAt desc)[0]{
  heroEyebrow,
  heroHeading,
  heroBody,
  coverageHeading,
  coverageBody,
  coverageStates,
  notes,
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
  threeDBuilderUrl,
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
  stockNumber,
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
  startingPrice,
  financingAvailable,
  rtoAvailable
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  category,
  stockNumber,
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
