export default function imageLoader({ src }: { src: string }) {
  const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim()
  const basePath = configuredBasePath ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}` : ''
  return `${basePath}${src}`
}



