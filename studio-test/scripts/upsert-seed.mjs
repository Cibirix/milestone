import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { getCliClient } from 'sanity/cli'

const seedPath = path.resolve(process.cwd(), '..', 'sanity-seed.ndjson')
if (!fs.existsSync(seedPath)) {
  throw new Error(`Seed file not found: ${seedPath}`)
}

const raw = fs.readFileSync(seedPath, 'utf8').trim()
if (!raw) {
  throw new Error('Seed file is empty')
}

const docs = raw.split('\n').map((line) => JSON.parse(line))

const client = getCliClient({ apiVersion: '2026-02-10' })

const chunkSize = 50
for (let i = 0; i < docs.length; i += chunkSize) {
  const chunk = docs.slice(i, i + chunkSize)
  const tx = client.transaction()
  chunk.forEach((doc) => tx.createOrReplace(doc))
  await tx.commit({ autoGenerateArrayKeys: true })
  console.log(`Upserted ${Math.min(i + chunkSize, docs.length)} / ${docs.length}`)
}

console.log('Seed upsert complete.')
