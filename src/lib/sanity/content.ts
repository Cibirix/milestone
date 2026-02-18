import { sanityConfig } from './client'
import { galleryItemsQuery, homepageQuery, servicePageBySlugQuery, siteSettingsQuery, testimonialsQuery } from './queries'

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
