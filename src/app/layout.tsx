import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { siteInfo } from '@/data/siteData'
import { getSiteSettingsCmsContent } from '@/lib/sanity/content'
import { resolveSiteInfo } from '@/lib/siteSettings'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.milestonestructures.com'),
  title: {
    default: 'Milestone Structures | Custom Metal Buildings',
    template: '%s | Milestone Structures',
  },
  description:
    'Milestone Structures provides fully customizable metal buildings with veteran-owned service and hands-on support from design to delivery.',
  keywords: [
    'metal buildings',
    'custom steel buildings',
    'metal garages',
    'metal carports',
    'metal barns',
    'commercial steel buildings',
    'milestone structures',
  ],
  authors: [{ name: siteInfo.name }],
  creator: siteInfo.name,
  publisher: siteInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.milestonestructures.com',
    siteName: siteInfo.name,
    title: 'Milestone Structures | Custom Metal Buildings',
    description:
      'Veteran-owned metal building dealer serving customers across the Southeast, Mid-Atlantic, and Northeast.',
    images: [
      {
        url: '/brand/milestone-logo-seo.jpg',
        width: 1200,
        height: 746,
        alt: 'Milestone Structures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milestone Structures | Custom Metal Buildings',
    description:
      'Veteran-owned metal building dealer serving customers across the Southeast, Mid-Atlantic, and Northeast.',
    images: ['/brand/milestone-logo-seo.jpg'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettingsCmsContent()
  const resolvedSiteInfo = resolveSiteInfo(siteSettings)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: resolvedSiteInfo.name,
    '@id': 'https://www.milestonestructures.com',
    url: 'https://www.milestonestructures.com',
    telephone: resolvedSiteInfo.phone,
    email: resolvedSiteInfo.email,
    image: 'https://www.milestonestructures.com/brand/milestone-logo-seo.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: resolvedSiteInfo.address,
      addressLocality: 'Pilot Mountain',
      addressRegion: 'NC',
      postalCode: '27047',
      addressCountry: 'US',
    },
    openingHours: ['Mo-Su 08:00-20:00'],
    sameAs: [resolvedSiteInfo.social.facebook, resolvedSiteInfo.social.instagram].filter(Boolean),
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
        <Header siteInfo={{ phone: resolvedSiteInfo.phone, phoneDigits: resolvedSiteInfo.phoneDigits }} />
        <main className="min-h-screen">{children}</main>
        <Footer siteInfo={resolvedSiteInfo} />
      </body>
    </html>
  )
}
