import { interactiveGalleryImages } from '../src/data/enhancements'
import { testimonials } from '../src/data/siteData'
import fs from 'node:fs'
import path from 'node:path'

const docs: Record<string, unknown>[] = []

for (const item of testimonials) {
  const idBase = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  docs.push({
    _id: `testimonial.${idBase}`,
    _type: 'testimonial',
    name: item.name,
    location: item.location,
    rating: item.rating,
    text: item.text,
    date: item.date,
  })
}

for (let index = 0; index < interactiveGalleryImages.length; index += 1) {
  const item = interactiveGalleryImages[index]
  const src = item.src.startsWith('/') ? item.src : `/${item.src}`
  const title = item.alt || `${item.category} Project ${index + 1}`
  docs.push({
    _id: `galleryItem.${index + 1}`,
    _type: 'galleryItem',
    title,
    sourcePath: src,
    alt: item.alt,
    category: item.category,
    location: item.location,
    serviceSlugs: item.serviceSlugs,
  })
}

const outNdjsonPath = path.join(process.cwd(), 'sanity-seed.ndjson')
const outJsonPath = path.join(process.cwd(), 'sanity-seed.json')
const ndjson = docs.map((doc) => JSON.stringify(doc)).join('\n') + '\n'
fs.writeFileSync(outNdjsonPath, ndjson, 'utf8')
fs.writeFileSync(outJsonPath, JSON.stringify(docs, null, 2), 'utf8')

console.log(`Wrote ${docs.length} documents to ${outNdjsonPath} and ${outJsonPath}`)
