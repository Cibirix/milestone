/**
 * Get the correct asset path with basePath prefix for production
 */
export const getAssetPath = (path: string): string => {
  if (!path) return path
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const configuredBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim()
  const basePath = configuredBasePath ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}` : ''
  if (basePath && path.startsWith(basePath)) return path
  return `${basePath}${path}`
}


