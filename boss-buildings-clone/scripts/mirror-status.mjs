#!/usr/bin/env node

import path from 'node:path'
import { readFile } from 'node:fs/promises'

const OUTPUT_DIR = path.resolve(process.cwd(), 'bossbuildings-mirror')
const STATE_PATH = path.join(OUTPUT_DIR, '_mirror-state.json')

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

async function main() {
  const raw = await readFile(STATE_PATH, 'utf8')
  const state = JSON.parse(raw)

  const pageQueue = new Set(state.pageQueue || [])
  const visitedPages = new Set(state.visitedPages || [])
  const assetQueue = new Set(state.assetQueue || [])
  const downloadedAssets = new Set(state.downloadedAssets || [])

  const pendingPages = Array.from(pageQueue).filter((url) => !visitedPages.has(url))
  const pendingAssets = Array.from(assetQueue).filter((url) => !downloadedAssets.has(url))

  const failedPages = Object.entries(state.failedPages || {})
  const failedAssets = Object.entries(state.failedAssets || {})

  const failedPageSet = new Set(failedPages.map(([url]) => url))
  const failedAssetSet = new Set(failedAssets.map(([url]) => url))

  const report = {
    updatedAt: state.updatedAt || null,
    queueCounts: {
      totalPagesQueued: pageQueue.size,
      totalPagesVisited: visitedPages.size,
      pendingPages: pendingPages.filter((url) => !failedPageSet.has(url)).length,
      totalAssetsQueued: assetQueue.size,
      totalAssetsDownloaded: downloadedAssets.size,
      pendingAssets: pendingAssets.filter((url) => !failedAssetSet.has(url)).length,
    },
    failedCounts: {
      pages: failedPages.length,
      assets: failedAssets.length,
    },
    sampleFailedPages: failedPages.slice(0, 15),
    sampleFailedAssets: failedAssets.slice(0, 15),
  }

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)

  process.stdout.write('\nSummary:\n')
  process.stdout.write(`- Updated: ${report.updatedAt}\n`)
  process.stdout.write(`- Pages: ${formatNumber(report.queueCounts.totalPagesVisited)} / ${formatNumber(report.queueCounts.totalPagesQueued)} visited (${formatNumber(report.queueCounts.pendingPages)} pending)\n`)
  process.stdout.write(`- Assets: ${formatNumber(report.queueCounts.totalAssetsDownloaded)} / ${formatNumber(report.queueCounts.totalAssetsQueued)} downloaded (${formatNumber(report.queueCounts.pendingAssets)} pending)\n`)
  process.stdout.write(`- Failures: ${formatNumber(report.failedCounts.pages)} pages, ${formatNumber(report.failedCounts.assets)} assets\n`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
