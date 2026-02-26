# Sanity Setup and Rollout

## What is now implemented
- A standalone Studio was added at `studio-test/` and connected to:
  - Project ID: `qj0b1rli`
  - Dataset: `production`
- Initial schema model created for:
  - `homepage`
  - `product`
  - `servicePage`
  - `siteSettings`
  - `testimonial`
  - `galleryItem`
  - Shared objects: `seo`, `faqItem`
- Next.js app now has a Sanity data layer with safe fallback:
  - `src/lib/sanity/client.ts`
  - `src/lib/sanity/queries.ts`
  - `src/lib/sanity/content.ts`
- Homepage, product pages, and service detail pages now read Sanity when content exists, and fall back to existing hardcoded content when it does not.
- Merchant feed endpoint now reads from Sanity products marked for feed inclusion.

## Environment variables
Copy `.env.example` to `.env.local` in the Next.js app root.

Required for public dataset reads:
- `NEXT_PUBLIC_SANITY_PROJECT_ID=qj0b1rli`
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
2. Create `product` documents for each model you want live on `/products`.
3. For products that should be sent to channels, set:
   - `includeInFeed=true`
   - `feedPrice`
   - `currency` (default USD)
   - `availability`
4. Validate `/products`, `/products/<slug>`, and `/merchant-feed.xml` locally.
5. Create `servicePage` documents as needed.

## Milestone demo seed (homepage + products)
- Generate seed payload:
  - `npm run sanity:seed:milestone:prepare`
- Upsert into Sanity dataset (requires project access):
  - `npm run sanity:seed:milestone:upsert`
- Seed output files:
  - `sanity-seed-milestone.json`
  - `sanity-seed-milestone.ndjson`

## Merchant / Catalog feed
- Feed URL: `https://<your-domain>/merchant-feed.xml`
- Built from Sanity `product` documents where:
  - `includeInFeed == true`
  - `feedPrice` is defined
- Intended for Google Merchant Center / Meta catalog ingestion when using a Sanity-only stack (no Woo/WordPress backend).

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
