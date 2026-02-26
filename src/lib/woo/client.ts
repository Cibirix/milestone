type WooClientConfig = {
  baseUrl: string
  consumerKey: string
  consumerSecret: string
  revalidateSeconds: number
}

function getWooConfig(): WooClientConfig | null {
  const baseUrl = (process.env.WOO_BASE_URL || '').trim().replace(/\/+$/, '')
  const consumerKey = (process.env.WOO_CONSUMER_KEY || '').trim()
  const consumerSecret = (process.env.WOO_CONSUMER_SECRET || '').trim()
  const revalidateSeconds = Number(process.env.WOO_REVALIDATE_SECONDS || 300)

  if (!baseUrl || !consumerKey || !consumerSecret) return null

  return {
    baseUrl,
    consumerKey,
    consumerSecret,
    revalidateSeconds: Number.isFinite(revalidateSeconds) ? Math.max(revalidateSeconds, 0) : 300,
  }
}

export function isWooEnabled(): boolean {
  return getWooConfig() !== null
}

export type WooFetchOptions = {
  path: string
  searchParams?: Record<string, string | number | boolean | undefined>
}

export async function wooFetchJson<T>({ path, searchParams = {} }: WooFetchOptions): Promise<T> {
  const config = getWooConfig()
  if (!config) {
    throw new Error('WooCommerce is not configured. Set WOO_BASE_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET.')
  }

  const url = new URL(path.replace(/^\/+/, ''), `${config.baseUrl}/`)

  // Woo REST API auth via query params (works for HTTPS without extra server config).
  url.searchParams.set('consumer_key', config.consumerKey)
  url.searchParams.set('consumer_secret', config.consumerSecret)

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue
    url.searchParams.set(key, String(value))
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
    ...(process.env.NODE_ENV === 'development'
      ? { cache: 'no-store' as const }
      : { next: { revalidate: config.revalidateSeconds } }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Woo fetch failed: ${response.status} ${response.statusText}${body ? ` - ${body.slice(0, 200)}` : ''}`)
  }

  return (await response.json()) as T
}

export function getWooHostname(): string | null {
  const config = getWooConfig()
  if (!config) return null
  try {
    return new URL(config.baseUrl).hostname
  } catch {
    return null
  }
}
