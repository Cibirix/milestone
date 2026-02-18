# Sanity Setup and Rollout

## What is now implemented
- A standalone Studio was added at `studio-test/` and connected to:
  - Project ID: `ww716qap`
  - Dataset: `production`
- Initial schema model created for:
  - `homepage`
  - `servicePage`
  - `siteSettings`
  - `testimonial`
  - `galleryItem`
  - Shared objects: `seo`, `faqItem`
- Next.js app now has a Sanity data layer with safe fallback:
  - `src/lib/sanity/client.ts`
  - `src/lib/sanity/queries.ts`
  - `src/lib/sanity/content.ts`
- Homepage and service detail pages now read Sanity when content exists, and fall back to existing hardcoded content when it does not.

## Environment variables
Copy `.env.example` to `.env.local` in the Next.js app root.

Required for public dataset reads:
- `NEXT_PUBLIC_SANITY_PROJECT_ID=ww716qap`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SANITY_API_VERSION=2026-02-10`
- `SANITY_REVALIDATE_SECONDS=60`
- `SANITY_REVALIDATE_SECRET=<strong-random-secret>`

Optional:
- `SANITY_API_READ_TOKEN=` (only needed for private dataset or draft/preview reads)
- `NEXT_PUBLIC_BASE_PATH=` (only needed for subpath deploys, for example `test` on GitHub Pages)

## Studio auth and local run
From `studio-test/`:
1. `npx sanity login`
2. `npm run dev`
3. Open `http://localhost:3333`

## Next.js local run
From project root:
1. `npm run dev`
2. Open `http://localhost:3000/`

## Deployment modes
- Dynamic/ISR mode (recommended for clients): `npm run build` + `npm run start`
- Static export mode (GitHub Pages fallback): `npm run build:static`

## Content entry order (recommended)
1. Create one `homepage` document and fill hero + SEO fields.
2. Create one `servicePage` for `roofing` and fill SEO/headline/CTA/FAQ fields.
3. Validate `/` and `/services/roofing` locally.
4. Create service docs for remaining slugs.

## Full migration next steps
1. Move remaining service content from static data into `servicePage` documents.
2. Move FAQs/blog content if desired.
3. Add role-based editor permissions in Sanity project settings.

## Webhook revalidation
- Endpoint: `POST /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
- Body example:
  ```json
  {
    "tags": ["sanity"],
    "paths": ["/", "/services/roofing", "/gallery/images"]
  }
  ```
- This triggers immediate content refresh for ISR caches after publish.
