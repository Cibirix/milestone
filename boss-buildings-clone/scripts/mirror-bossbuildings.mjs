#!/usr/bin/env node

import path from 'node:path'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'

const ROOT_URL = 'https://www.bossbuildings.com'
const ALLOWED_HOSTS = new Set(['www.bossbuildings.com', 'bossbuildings.com'])
const OUTPUT_DIR = path.resolve(process.cwd(), 'bossbuildings-mirror')
const STATE_PATH = path.join(OUTPUT_DIR, '_mirror-state.json')
const METADATA_PATH = path.join(OUTPUT_DIR, 'mirror-metadata.json')

const PAGE_BATCH_SIZE = Number(process.env.MIRROR_PAGE_BATCH_SIZE || 6)
const ASSET_BATCH_SIZE = Number(process.env.MIRROR_ASSET_BATCH_SIZE || 10)
const REQUEST_TIMEOUT_MS = Number(process.env.MIRROR_REQUEST_TIMEOUT_MS || 30000)
const MAX_RUNTIME_SECONDS = Number(process.env.MIRROR_MAX_SECONDS || 900)

const PAGE_EXTENSIONS = new Set(['', '.html', '.htm'])
const ALLOWED_ASSET_EXTENSIONS = new Set([
  '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.svg', '.png', '.jpg', '.jpeg',
  '.webp', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.map',
  '.mp4', '.webm', '.mov', '.avi', '.m4v', '.mp3', '.wav', '.ogg', '.zip', '.gz',
  '.tar', '.mpg', '.mpeg',
])
const TEXT_MIME_MARKERS = ['text/', 'application/javascript', 'application/json', 'application/xml', 'image/svg+xml']

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (compatible; BossBuildingsMirrorBot/1.0; +https://www.bossbuildings.com)',
  Accept: '*/*',
}

function nowIso() {
  return new Date().toISOString()
}

function stripHash(input) {
  return input.split('#')[0]
}

function hasFileExtension(pathname) {
  return path.extname(pathname.toLowerCase()).length > 0
}

function isAllowedUrl(url) {
  return ALLOWED_HOSTS.has(url.hostname.toLowerCase())
}

function hasAllowedAssetExtension(pathname) {
  const ext = path.extname(pathname.toLowerCase())
  return ALLOWED_ASSET_EXTENSIONS.has(ext)
}

function isLikelyAssetPath(pathname, search = '') {
  if (hasAllowedAssetExtension(pathname)) return true
  if (pathname.startsWith('/wp-content/') || pathname.startsWith('/wp-includes/') || pathname.startsWith('/cf-fonts/') || pathname.startsWith('/cdn-cgi/') || pathname.startsWith('/wp-json/')) return true
  if (path.extname(pathname.toLowerCase()) === '.php' && Boolean(search)) return true
  return false
}

function canonicalizePageUrl(raw) {
  const url = new URL(raw)
  url.hash = ''
  url.search = ''

  if (!hasFileExtension(url.pathname) && !url.pathname.endsWith('/')) {
    url.pathname = `${url.pathname}/`
  }

  return url.toString()
}

function canonicalizeAssetUrl(raw) {
  const url = new URL(raw)
  url.hash = ''
  url.search = ''
  return url.toString()
}

function normalizeForStorage(url, { forceHtml = false } = {}) {
  let pathname = url.pathname
  try {
    pathname = decodeURIComponent(url.pathname)
  } catch {
    pathname = url.pathname
  }
  const safePathname = pathname.replace(/\0/g, '')

  if (forceHtml) {
    if (safePathname === '/' || safePathname === '') {
      return 'index.html'
    }

    if (safePathname.endsWith('/')) {
      return path.posix.join(safePathname, 'index.html').replace(/^\//, '')
    }

    const ext = path.extname(safePathname)
    if (!ext || PAGE_EXTENSIONS.has(ext.toLowerCase())) {
      return path.posix.join(safePathname, 'index.html').replace(/^\//, '')
    }

    return safePathname.replace(/^\//, '')
  }

  if (safePathname === '/' || safePathname === '') {
    return 'index.html'
  }

  if (safePathname.endsWith('/')) {
    return path.posix.join(safePathname, 'index.html').replace(/^\//, '')
  }

  return safePathname.replace(/^\//, '')
}

function normalizeAbsoluteUrl(rawValue, baseUrl) {
  if (!rawValue) return null
  const value = stripHash(rawValue.trim().replace(/^['"]|['"]$/g, ''))

  if (!value) return null
  if (value.startsWith('#')) return null
  if (/\s/.test(value)) return null

  const lower = value.toLowerCase()
  if (lower.startsWith('mailto:') || lower.startsWith('tel:') || lower.startsWith('javascript:') || lower.startsWith('data:')) {
    return null
  }

  const looksAbsolute = lower.startsWith('http://') || lower.startsWith('https://') || value.startsWith('//')
  const looksRelative = value.startsWith('/') || value.startsWith('./') || value.startsWith('../')
  const looksPathLike = value.includes('/')
  const looksStandaloneFile = /\.(?:css|js|mjs|json|xml|txt|svg|png|jpe?g|webp|gif|ico|woff2?|ttf|eot|pdf|map|mp4|webm|mov|avi|m4v|mp3|wav|ogg|zip|gz|tar|mpg|mpeg)$/i.test(value)

  if (!looksAbsolute && !looksRelative && !looksPathLike && !looksStandaloneFile) {
    return null
  }

  const candidate = value.startsWith('//') ? `https:${value}` : value

  try {
    const url = new URL(candidate, baseUrl)
    url.hash = ''
    if (!isAllowedUrl(url)) return null
    return url
  } catch {
    return null
  }
}

function rewriteDomainReferences(content) {
  return content
    .replace(/https?:\/\/(?:www\.)?bossbuildings\.com/gi, '')
    .replace(/\/\/(?:www\.)?bossbuildings\.com/gi, '')
}

function parseLocValues(xmlText) {
  const urls = []
  const locMatches = xmlText.matchAll(/<loc>([^<]+)<\/loc>/gi)
  for (const match of locMatches) {
    const value = (match[1] || '').trim()
    if (value) urls.push(value)
  }
  return urls
}

function splitSrcset(input) {
  return input
    .split(',')
    .map((part) => part.trim().split(/\s+/)[0])
    .filter(Boolean)
}

function extractUrlsFromHtml(html, pageUrl) {
  const pageCandidates = new Set()
  const assetCandidates = new Set()

  const attributeRegex = /(href|src|srcset|data-src|data-lazy-src|data-srcset|poster)=["']([^"']+)["']/gi

  for (const match of html.matchAll(attributeRegex)) {
    const attr = (match[1] || '').toLowerCase()
    const raw = match[2] || ''
    const rawValues = attr.includes('srcset') ? splitSrcset(raw) : [raw]

    for (const candidate of rawValues) {
      const normalized = normalizeAbsoluteUrl(candidate, pageUrl)
      if (!normalized) continue

      const pathname = normalized.pathname.toLowerCase()
      const ext = path.extname(pathname)
      const isLikelyPage = !ext || PAGE_EXTENSIONS.has(ext)

      if (attr === 'href' && isLikelyPage && !normalized.search) {
        pageCandidates.add(canonicalizePageUrl(normalized.toString()))
      } else if (isLikelyAssetPath(normalized.pathname, normalized.search)) {
        assetCandidates.add(canonicalizeAssetUrl(normalized.toString()))
      }
    }
  }

  const cssUrlRegex = /url\(([^)]+)\)/gi
  for (const match of html.matchAll(cssUrlRegex)) {
    const normalized = normalizeAbsoluteUrl(match[1] || '', pageUrl)
    if (normalized) {
      assetCandidates.add(canonicalizeAssetUrl(normalized.toString()))
    }
  }

  return { pageCandidates, assetCandidates }
}

function extractUrlsFromCss(cssText, cssUrl) {
  const urls = new Set()
  const cssUrlRegex = /url\(([^)]+)\)/gi

  for (const match of cssText.matchAll(cssUrlRegex)) {
    const normalized = normalizeAbsoluteUrl(match[1] || '', cssUrl)
    if (normalized) {
      urls.add(canonicalizeAssetUrl(normalized.toString()))
    }
  }

  return urls
}

function looksTextual(contentType, relativePath) {
  if (TEXT_MIME_MARKERS.some((marker) => contentType.includes(marker))) {
    return true
  }

  const lower = relativePath.toLowerCase()
  return lower.endsWith('.css') || lower.endsWith('.js') || lower.endsWith('.json') || lower.endsWith('.xml') || lower.endsWith('.svg')
}

async function ensureParentDir(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true })
}

async function writeMirrorFile(relativePath, data) {
  const absolutePath = path.join(OUTPUT_DIR, relativePath)
  await ensureParentDir(absolutePath)
  await writeFile(absolutePath, data)
}

async function fileExists(relativePath) {
  const absolutePath = path.join(OUTPUT_DIR, relativePath)
  try {
    await access(absolutePath)
    return true
  } catch {
    return false
  }
}

async function readMirrorFile(relativePath) {
  const absolutePath = path.join(OUTPUT_DIR, relativePath)
  return readFile(absolutePath)
}

async function fetchUrl(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      headers: defaultHeaders,
      redirect: 'follow',
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    const contentType = (response.headers.get('content-type') || '').toLowerCase()
    const arrayBuffer = await response.arrayBuffer()

    return {
      contentType,
      buffer: Buffer.from(arrayBuffer),
    }
  } finally {
    clearTimeout(timeout)
  }
}

function createEmptyState() {
  return {
    createdAt: nowIso(),
    updatedAt: nowIso(),
    pageQueue: [],
    visitedPages: [],
    assetQueue: [],
    downloadedAssets: [],
    failedPages: {},
    failedAssets: {},
  }
}

async function loadState() {
  try {
    const raw = await readFile(STATE_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return createEmptyState()
  }
}

async function saveState(state) {
  state.updatedAt = nowIso()
  await ensureParentDir(STATE_PATH)
  await writeFile(STATE_PATH, JSON.stringify(state, null, 2))
}

function setFromArray(values) {
  return new Set(values || [])
}

function mapFromObject(obj) {
  return new Map(Object.entries(obj || {}))
}

function objectFromMap(map) {
  return Object.fromEntries(map.entries())
}

async function initializeQueuesIfNeeded(state, pageQueue) {
  if (state.pageQueue.length > 0 || state.visitedPages.length > 0) {
    return
  }

  const sitemapIndexUrl = `${ROOT_URL}/sitemap.xml`
  const sitemapIndex = await fetchUrl(sitemapIndexUrl)
  const sitemapIndexText = sitemapIndex.buffer.toString('utf8')
  const sitemapUrls = parseLocValues(sitemapIndexText)

  pageQueue.add(canonicalizePageUrl(ROOT_URL))
  pageQueue.add(canonicalizePageUrl(`${ROOT_URL}/`))

  for (const sitemapUrl of sitemapUrls) {
    try {
      const fetched = await fetchUrl(sitemapUrl)
      const xml = fetched.buffer.toString('utf8')
      const urls = parseLocValues(xml)

      for (const url of urls) {
        const parsed = new URL(url)
        if (isAllowedUrl(parsed)) {
          pageQueue.add(canonicalizePageUrl(parsed.toString()))
        }
      }

      const sitemapPath = normalizeForStorage(new URL(sitemapUrl), { forceHtml: false })
      await writeMirrorFile(sitemapPath, rewriteDomainReferences(xml))
    } catch {
      // Non-blocking: sitemap failures are handled through the main crawl.
    }
  }

  state.pageQueue = Array.from(pageQueue)
}

function shouldStop(startTimestamp) {
  const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000)
  return elapsedSeconds >= MAX_RUNTIME_SECONDS
}

async function processPage(pageUrl, context) {
  const {
    pageQueue,
    visitedPages,
    assetQueue,
    failedPages,
  } = context

  if (visitedPages.has(pageUrl)) return

  const parsed = new URL(pageUrl)
  const relativePath = normalizeForStorage(parsed, { forceHtml: true })

  try {
    let htmlText

    if (await fileExists(relativePath)) {
      htmlText = (await readMirrorFile(relativePath)).toString('utf8')
    } else {
      const fetched = await fetchUrl(pageUrl)
      htmlText = rewriteDomainReferences(fetched.buffer.toString('utf8'))
      await writeMirrorFile(relativePath, htmlText)
    }

    const { pageCandidates, assetCandidates } = extractUrlsFromHtml(htmlText, pageUrl)

    for (const linkedPage of pageCandidates) {
      pageQueue.add(linkedPage)
    }

    for (const assetUrl of assetCandidates) {
      assetQueue.add(assetUrl)
    }

    visitedPages.add(pageUrl)
    failedPages.delete(pageUrl)
  } catch (error) {
    failedPages.set(pageUrl, String(error))
  }
}

async function processAsset(assetUrl, context) {
  const {
    downloadedAssets,
    assetQueue,
    failedAssets,
  } = context

  if (downloadedAssets.has(assetUrl)) return

  const parsed = new URL(assetUrl)

  if (!isAllowedUrl(parsed)) {
    downloadedAssets.add(assetUrl)
    return
  }

  if (parsed.pathname.startsWith('/wp-admin/') || parsed.pathname.startsWith('/wp-json/')) {
    downloadedAssets.add(assetUrl)
    return
  }

  if (!isLikelyAssetPath(parsed.pathname, parsed.search)) {
    downloadedAssets.add(assetUrl)
    return
  }

  const relativePath = normalizeForStorage(parsed, { forceHtml: false })

  try {
    if (await fileExists(relativePath)) {
      if (relativePath.toLowerCase().endsWith('.css')) {
        const css = (await readMirrorFile(relativePath)).toString('utf8')
        const nestedAssets = extractUrlsFromCss(css, assetUrl)
        for (const nested of nestedAssets) {
          assetQueue.add(nested)
        }
      }

      downloadedAssets.add(assetUrl)
      failedAssets.delete(assetUrl)
      return
    }

    const fetched = await fetchUrl(assetUrl)

    if (looksTextual(fetched.contentType, relativePath)) {
      const text = rewriteDomainReferences(fetched.buffer.toString('utf8'))
      await writeMirrorFile(relativePath, text)

      if (relativePath.toLowerCase().endsWith('.css')) {
        const nestedAssets = extractUrlsFromCss(text, assetUrl)
        for (const nested of nestedAssets) {
          assetQueue.add(nested)
        }
      }
    } else {
      await writeMirrorFile(relativePath, fetched.buffer)
    }

    downloadedAssets.add(assetUrl)
    failedAssets.delete(assetUrl)
  } catch (error) {
    failedAssets.set(assetUrl, String(error))
  }
}

function buildMetadata({ startTimestamp, pageQueue, visitedPages, assetQueue, downloadedAssets, failedPages, failedAssets }) {
  const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000)
  const pendingPages = Array.from(pageQueue).filter((url) => !visitedPages.has(url) && !failedPages.has(url)).length
  const pendingAssets = Array.from(assetQueue).filter((url) => !downloadedAssets.has(url) && !failedAssets.has(url)).length

  return {
    generatedAt: nowIso(),
    source: ROOT_URL,
    runtimeSeconds: elapsedSeconds,
    maxRuntimeSeconds: MAX_RUNTIME_SECONDS,
    queueCounts: {
      totalPagesQueued: pageQueue.size,
      totalPagesVisited: visitedPages.size,
      pendingPages,
      totalAssetsQueued: assetQueue.size,
      totalAssetsDownloaded: downloadedAssets.size,
      pendingAssets,
    },
    failedCounts: {
      pages: failedPages.size,
      assets: failedAssets.size,
    },
    isComplete: pendingPages === 0 && pendingAssets === 0,
    sampleFailedPages: Array.from(failedPages.entries()).slice(0, 25),
    sampleFailedAssets: Array.from(failedAssets.entries()).slice(0, 25),
  }
}

async function saveMetadata(metadata) {
  await writeFile(METADATA_PATH, JSON.stringify(metadata, null, 2))
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const startTimestamp = Date.now()
  const state = await loadState()

  const pageQueue = setFromArray(state.pageQueue)
  const visitedPages = setFromArray(state.visitedPages)
  const assetQueue = setFromArray(state.assetQueue)
  const downloadedAssets = setFromArray(state.downloadedAssets)
  const failedPages = mapFromObject(state.failedPages)
  const failedAssets = mapFromObject(state.failedAssets)

  await initializeQueuesIfNeeded(state, pageQueue)

  while (!shouldStop(startTimestamp)) {
    const pendingPages = Array.from(pageQueue)
      .filter((url) => !visitedPages.has(url) && !failedPages.has(url))
      .slice(0, PAGE_BATCH_SIZE)
    if (pendingPages.length === 0) break

    await Promise.all(pendingPages.map((pageUrl) => processPage(pageUrl, {
      pageQueue,
      visitedPages,
      assetQueue,
      failedPages,
    })))

    state.pageQueue = Array.from(pageQueue)
    state.visitedPages = Array.from(visitedPages)
    state.assetQueue = Array.from(assetQueue)
    state.downloadedAssets = Array.from(downloadedAssets)
    state.failedPages = objectFromMap(failedPages)
    state.failedAssets = objectFromMap(failedAssets)
    await saveState(state)
  }

  while (!shouldStop(startTimestamp)) {
    const pendingAssets = Array.from(assetQueue)
      .filter((url) => !downloadedAssets.has(url) && !failedAssets.has(url))
      .slice(0, ASSET_BATCH_SIZE)
    if (pendingAssets.length === 0) break

    await Promise.all(pendingAssets.map((assetUrl) => processAsset(assetUrl, {
      downloadedAssets,
      assetQueue,
      failedAssets,
    })))

    state.pageQueue = Array.from(pageQueue)
    state.visitedPages = Array.from(visitedPages)
    state.assetQueue = Array.from(assetQueue)
    state.downloadedAssets = Array.from(downloadedAssets)
    state.failedPages = objectFromMap(failedPages)
    state.failedAssets = objectFromMap(failedAssets)
    await saveState(state)
  }

  const metadata = buildMetadata({
    startTimestamp,
    pageQueue,
    visitedPages,
    assetQueue,
    downloadedAssets,
    failedPages,
    failedAssets,
  })

  state.pageQueue = Array.from(pageQueue)
  state.visitedPages = Array.from(visitedPages)
  state.assetQueue = Array.from(assetQueue)
  state.downloadedAssets = Array.from(downloadedAssets)
  state.failedPages = objectFromMap(failedPages)
  state.failedAssets = objectFromMap(failedAssets)

  await saveState(state)
  await saveMetadata(metadata)

  process.stdout.write(`${JSON.stringify(metadata, null, 2)}\n`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
