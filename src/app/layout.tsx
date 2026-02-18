import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { siteInfo } from '@/data/siteData'
import { getSiteSettingsCmsContent } from '@/lib/sanity/content'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.milestonestructures.com'),
  title: {
    default: 'Milestone Steel Structures | Custom Metal Buildings',
    template: '%s | Milestone Steel Structures',
  },
  description:
    'Milestone Steel Structures provides fully customizable metal buildings with veteran-led service and hands-on support from design to delivery.',
  keywords: [
    'metal buildings',
    'custom steel buildings',
    'metal garages',
    'metal carports',
    'metal barns',
    'commercial steel buildings',
    'milestone steel structures',
  ],
  authors: [{ name: siteInfo.name }],
  creator: siteInfo.name,
  publisher: siteInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.milestonestructures.com',
    siteName: siteInfo.name,
    title: 'Milestone Steel Structures | Custom Metal Buildings',
    description:
      'Veteran-led metal building dealer serving customers across the Southeast, Mid-Atlantic, and Northeast.',
    images: [
      {
        url: '/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Milestone Steel Structures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milestone Steel Structures | Custom Metal Buildings',
    description:
      'Veteran-led metal building dealer serving customers across the Southeast, Mid-Atlantic, and Northeast.',
    images: ['/brand/og-image.jpg'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cmsSettings = await getSiteSettingsCmsContent()
  const mergedSiteInfo = {
    ...siteInfo,
    name: cmsSettings?.companyName || siteInfo.name,
    tagline: cmsSettings?.tagline || siteInfo.tagline,
    phone: cmsSettings?.phone || siteInfo.phone,
    phoneDigits: cmsSettings?.phoneDigits || siteInfo.phoneDigits,
    email: cmsSettings?.email || siteInfo.email,
    address: cmsSettings?.address || siteInfo.address,
    hours: cmsSettings?.hours || siteInfo.hours,
    serviceArea: cmsSettings?.serviceArea || siteInfo.serviceArea,
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: mergedSiteInfo.name,
    '@id': 'https://www.milestonestructures.com',
    url: 'https://www.milestonestructures.com',
    telephone: mergedSiteInfo.phone,
    email: mergedSiteInfo.email,
    image: 'https://www.milestonestructures.com/brand/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3311 NC 268',
      addressLocality: 'Siloam',
      addressRegion: 'NC',
      postalCode: '27047',
      addressCountry: 'US',
    },
    openingHours: ['Mo-Su 08:00-20:00'],
    sameAs: [siteInfo.social.facebook, siteInfo.social.instagram],
  }

  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable}`}>
      <body className={manrope.className}>
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        <Header siteInfo={{ phone: mergedSiteInfo.phone, phoneDigits: mergedSiteInfo.phoneDigits }} />
        <main className="min-h-screen">{children}</main>
        <Footer siteInfo={mergedSiteInfo} />
      </body>
    </html>
  )
}
