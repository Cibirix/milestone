/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true'

const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim()
const normalizedBasePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}`
  : ''

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
  ...(normalizedBasePath ? { basePath: normalizedBasePath, assetPrefix: `${normalizedBasePath}/` } : {}),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
    // Keep native optimization off only for static export mode.
    unoptimized: isStaticExport,
  },
}

module.exports = nextConfig
