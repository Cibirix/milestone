import { sanityConfig } from './client'
import {
  aboutPageQuery,
  contactPageQuery,
  galleryItemsQuery,
  homepageQuery,
  merchantFeedProductsQuery,
  productBySlugQuery,
  productsQuery,
  servicePageBySlugQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from './queries'

type SeoPayload = {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImageUrl?: string
}

export type HomepageCmsContent = {
  heroHeadline?: string
  heroSubheadline?: string
  localIntroHeading?: string
  localIntroBody?: string
  trustedHeading?: string
  remodelingHeading?: string
  remodelingBody?: string
  emergencyHeading?: string
  emergencyBody?: string
  seo?: SeoPayload
}

export type AboutPageCmsContent = {
  heroEyebrow?: string
  heroHeading?: string
  heroBody?: string
  veteranBadgeLabel?: string
  storyCardHeading?: string
  storyCardBodyPrimary?: string
  storyCardBodySecondary?: string
  valuesCardHeading?: string
  valuesList?: string[]
  coverageHeading?: string
  coverageBody?: string
  seo?: SeoPayload
}

export type ContactPageCmsContent = {
  heroEyebrow?: string
  heroHeading?: string
  heroBody?: string
  veteranBadgeLabel?: string
  contactCardHeading?: string
  contactCardIntro?: string
  facebookLabel?: string
  warrantyNote?: string
  seo?: SeoPayload
}

export type ServiceCmsContent = {
  serviceName?: string
  slug?: string
  seoHeadline?: string
  heroIntro?: string
  ctaPrimary?: string
  ctaSecondary?: string
  faqs?: Array<{ question?: string; answer?: string }>
  seo?: SeoPayload
}

export type SiteSettingsCmsContent = {
  companyName?: string
  tagline?: string
  phone?: string
  phoneDigits?: string
  email?: string
  address?: string
  hours?: string
  serviceArea?: string
  facebookUrl?: string
  instagramUrl?: string
  footerSummary?: string
  seoDefault?: SeoPayload
}

export type TestimonialCmsItem = {
  name?: string
  location?: string
  rating?: number
  text?: string
  date?: string
}

export type GalleryCmsItem = {
  title?: string
  sourcePath?: string
  alt?: string
  category?: string
  location?: string
  serviceSlugs?: string[]
  imageUrl?: string
}

export type ProductCmsItem = {
  title?: string
  slug?: string
  category?: string
  sourceNumber?: number
  width?: string
  length?: string
  height?: string
  roofStyle?: string
  basePriceLabel?: string
  shortDescription?: string
  description?: string
  imageAlt?: string
  imageUrl?: string
  sourcePath?: string
  highlights?: string[]
  startingPrice?: number
  financingAvailable?: boolean
  rtoAvailable?: boolean
}

export type MerchantFeedProductCmsItem = {
  title?: string
  slug?: string
  category?: string
  shortDescription?: string
  description?: string
  imageAlt?: string
  imageUrl?: string
  sourcePath?: string
  feedPrice?: number
  currency?: string
  availability?: string
}

type SanityQueryResponse<T> = {
  result?: T
}

const prodRevalidateSeconds = Number(process.env.SANITY_REVALIDATE_SECONDS || 60)

async function runSanityQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = ['sanity'],
): Promise<T | null> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (sanityConfig.token) {
    headers.Authorization = `Bearer ${sanityConfig.token}`
  }

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, params }),
  }

  if (process.env.NODE_ENV === 'development') {
    fetchOptions.cache = 'no-store'
  } else {
    fetchOptions.next = {
      revalidate: Number.isFinite(prodRevalidateSeconds) ? Math.max(prodRevalidateSeconds, 1) : 60,
      tags,
    }
  }

  const response = await fetch(sanityConfig.endpoint, {
    ...fetchOptions,
  })

  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as SanityQueryResponse<T>
  return payload.result ?? null
}

export async function getHomepageCmsContent(): Promise<HomepageCmsContent | null> {
  try {
    return await runSanityQuery<HomepageCmsContent>(homepageQuery, {}, ['sanity', 'sanity-homepage'])
  } catch (error) {
    console.warn('Sanity homepage fetch failed:', error)
    return null
  }
}

export async function getAboutPageCmsContent(): Promise<AboutPageCmsContent | null> {
  try {
    return await runSanityQuery<AboutPageCmsContent>(aboutPageQuery, {}, ['sanity', 'sanity-about-page'])
  } catch (error) {
    console.warn('Sanity about page fetch failed:', error)
    return null
  }
}

export async function getContactPageCmsContent(): Promise<ContactPageCmsContent | null> {
  try {
    return await runSanityQuery<ContactPageCmsContent>(contactPageQuery, {}, ['sanity', 'sanity-contact-page'])
  } catch (error) {
    console.warn('Sanity contact page fetch failed:', error)
    return null
  }
}

export async function getServiceCmsContent(slug: string): Promise<ServiceCmsContent | null> {
  try {
    return await runSanityQuery<ServiceCmsContent>(
      servicePageBySlugQuery,
      { slug },
      ['sanity', 'sanity-service-pages', `sanity-service-${slug}`],
    )
  } catch (error) {
    console.warn(`Sanity service fetch failed for ${slug}:`, error)
    return null
  }
}

export async function getSiteSettingsCmsContent(): Promise<SiteSettingsCmsContent | null> {
  try {
    return await runSanityQuery<SiteSettingsCmsContent>(siteSettingsQuery, {}, ['sanity', 'sanity-site-settings'])
  } catch (error) {
    console.warn('Sanity site settings fetch failed:', error)
    return null
  }
}

export async function getTestimonialsCmsContent(): Promise<TestimonialCmsItem[] | null> {
  try {
    return await runSanityQuery<TestimonialCmsItem[]>(testimonialsQuery, {}, ['sanity', 'sanity-testimonials'])
  } catch (error) {
    console.warn('Sanity testimonials fetch failed:', error)
    return null
  }
}

export async function getGalleryCmsContent(): Promise<GalleryCmsItem[] | null> {
  try {
    return await runSanityQuery<GalleryCmsItem[]>(galleryItemsQuery, {}, ['sanity', 'sanity-gallery'])
  } catch (error) {
    console.warn('Sanity gallery fetch failed:', error)
    return null
  }
}

export async function getProductsCmsContent(): Promise<ProductCmsItem[] | null> {
  try {
    return await runSanityQuery<ProductCmsItem[]>(productsQuery, {}, ['sanity', 'sanity-products'])
  } catch (error) {
    console.warn('Sanity products fetch failed:', error)
    return null
  }
}

export async function getProductBySlugCmsContent(slug: string): Promise<ProductCmsItem | null> {
  try {
    return await runSanityQuery<ProductCmsItem>(
      productBySlugQuery,
      { slug },
      ['sanity', 'sanity-products', `sanity-product-${slug}`],
    )
  } catch (error) {
    console.warn(`Sanity product fetch failed for ${slug}:`, error)
    return null
  }
}

export async function getMerchantFeedProductsCmsContent(): Promise<MerchantFeedProductCmsItem[] | null> {
  try {
    return await runSanityQuery<MerchantFeedProductCmsItem[]>(
      merchantFeedProductsQuery,
      {},
      ['sanity', 'sanity-products', 'sanity-merchant-feed'],
    )
  } catch (error) {
    console.warn('Sanity merchant feed fetch failed:', error)
    return null
  }
}
