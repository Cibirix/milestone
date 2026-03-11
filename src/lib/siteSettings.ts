import { siteInfo } from '@/data/siteData'
import type { SiteSettingsCmsContent } from '@/lib/sanity/content'

export type ResolvedSiteInfo = typeof siteInfo & {
  footerSummary?: string
  googleMapsEmbedUrl?: string
}

export function resolveSiteInfo(cms?: SiteSettingsCmsContent | null): ResolvedSiteInfo {
  return {
    ...siteInfo,
    name: cms?.companyName || siteInfo.name,
    tagline: cms?.tagline || siteInfo.tagline,
    phone: cms?.phone || siteInfo.phone,
    phoneDigits: cms?.phoneDigits || siteInfo.phoneDigits,
    threeDBuilderUrl: cms?.threeDBuilderUrl || siteInfo.threeDBuilderUrl,
    email: cms?.email || siteInfo.email,
    address: cms?.address || siteInfo.address,
    googleMapsEmbedUrl: cms?.googleMapsEmbedUrl || siteInfo.googleMapsEmbedUrl,
    hours: cms?.hours || siteInfo.hours,
    serviceArea: cms?.serviceArea || siteInfo.serviceArea,
    social: {
      ...siteInfo.social,
      facebook: cms?.facebookUrl || siteInfo.social.facebook,
      instagram: cms?.instagramUrl || siteInfo.social.instagram,
    },
    footerSummary: cms?.footerSummary,
  }
}
