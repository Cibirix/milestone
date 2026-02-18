#!/usr/bin/env node

import http from 'node:http'
import path from 'node:path'
import { access, readFile } from 'node:fs/promises'

const ROOT_DIR = path.resolve(process.cwd(), 'bossbuildings-mirror')
const PORT = Number(process.env.PORT || 3080)

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
}

function safePathname(urlPathname) {
  const decoded = decodeURIComponent(urlPathname)
  return decoded.replace(/\0/g, '')
}

function isPathInsideRoot(targetPath) {
  const normalizedRoot = path.resolve(ROOT_DIR)
  const normalizedTarget = path.resolve(targetPath)
  return normalizedTarget === normalizedRoot || normalizedTarget.startsWith(`${normalizedRoot}${path.sep}`)
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function resolveLocalFile(requestPath) {
  const pathname = safePathname(requestPath)
  const absoluteBase = path.resolve(ROOT_DIR, `.${pathname}`)

  if (!isPathInsideRoot(absoluteBase)) {
    return null
  }

  if (pathname.endsWith('/')) {
    const withIndex = path.join(absoluteBase, 'index.html')
    return (await fileExists(withIndex)) ? withIndex : null
  }

  const ext = path.extname(pathname)
  if (ext) {
    return (await fileExists(absoluteBase)) ? absoluteBase : null
  }

  const asDirectory = path.join(absoluteBase, 'index.html')
  if (await fileExists(asDirectory)) {
    return asDirectory
  }

  return (await fileExists(absoluteBase)) ? absoluteBase : null
}

const server = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host || `localhost:${PORT}`
    const parsed = new URL(req.url || '/', `http://${host}`)
    const localFile = await resolveLocalFile(parsed.pathname)

    if (!localFile) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end('Not found')
      return
    }

    const data = await readFile(localFile)
    const ext = path.extname(localFile).toLowerCase()

    res.statusCode = 200
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream')
    res.end(data)
  } catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(`Server error: ${String(error)}`)
  }
})

server.listen(PORT, () => {
  process.stdout.write(`Boss Buildings mirror server running at http://localhost:${PORT}\n`)
})
