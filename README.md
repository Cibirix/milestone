# Milestone Structures Website (Next.js + Sanity)

Production website build for **Milestone Structures** (Cibirix client), focused on quote-first metal building sales with editable CMS content in **Sanity Studio**.

This project includes:
- Next.js frontend (`/`)
- Sanity Studio (`/studio-test`)
- Sanity-powered homepage, products, about, contact, and site settings
- Merchant feed endpoint (`/merchant-feed.xml`) for Google/Meta catalog workflows

## What This Site Does

- Presents Milestone Structures products (quote-first, not direct checkout)
- Supports editable CMS content for:
  - Homepage
  - Products
  - About page
  - Contact page
  - Site settings (footer/contact/socials/default SEO)
- Generates a merchant feed from Sanity products that are explicitly marked for feed inclusion

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Sanity Studio v3
- GROQ

## Project Structure

```text
milestone/
├── src/                         # Next.js frontend
│   ├── app/                     # App Router pages + routes
│   ├── components/              # UI components
│   ├── data/                    # Local fallback content/data
│   └── lib/
│       ├── sanity/              # Sanity client, queries, content fetchers
│       └── siteSettings.ts      # Sanity->fallback site settings resolver
├── public/                      # Brand assets + product images
├── scripts/                     # Seed generation scripts
├── studio-test/                 # Sanity Studio project
├── sanity-seed-milestone.json   # Generated seed payload
└── README.md
```

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Sanity account with access to project `qj0b1rli`

### Install

```bash
npm install
npm install --prefix studio-test
```

### Environment

Copy `.env.example` to `.env.local` and confirm values:

```bash
cp .env.example .env.local
```

Key variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL` (must be the live domain in production)
- `SANITY_API_READ_TOKEN` (optional; needed for private dataset/drafts)

### Run Site + Studio

```bash
npm run dev:all
```

Local URLs:
- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3333](http://localhost:3333)

## Sanity CMS Content

### Editable documents (current setup)

- `Homepage`
- `Product` (catalog + product pages + feed fields)
- `About Page`
- `Contact Page`
- `Site Settings`

### Product feed readiness (Studio)

Products appear in `/merchant-feed.xml` only when:
- `Include In Merchant Feed` = `true`
- `Feed Price` is set
- product has image (upload or fallback source path)
- slug/title are present

This is intentional so the team can control what is submitted to Google/Meta.

## Merchant Feed (Google / Meta)

Feed route:

- `GET /merchant-feed.xml`

How it works:
- Reads products from Sanity
- Filters to products marked for feed inclusion
- Outputs XML with product URLs/images/pricing fields

### Important business-model note

Milestone Structures is a **quote-first** business (high-ticket configurable buildings).  
Meta catalog workflows are usually easier. Google Merchant approval may require stricter pricing/landing-page consistency depending on campaign type.

## Seeding Sanity (Milestone Data)

Generate seed file:

```bash
npm run sanity:seed:milestone:prepare
```

Generate + upsert to Sanity dataset (`production`):

```bash
npm run sanity:seed:milestone:upsert
```

This seeds:
- `siteSettings.main`
- `homepage.main`
- `aboutPage.main`
- `contactPage.main`
- Milestone product documents

## Build & Deployment

### Frontend (Next.js)

```bash
npm run build
npm start
```

Recommended hosting:
- Vercel (preferred)

### Sanity Studio

From `studio-test/`:

```bash
npx sanity login
npm run deploy
```

This publishes the Studio to a hosted URL so the client can log in and edit content.

## Client Editing Workflow (Recommended)

1. Client logs into Sanity Studio
2. Updates homepage/about/contact/site settings as needed
3. Adds/edits products
4. Publishes changes
5. For feeds: sets `Feed Price` + enables `Include In Merchant Feed`

## Notes

- This project is **not WordPress/WooCommerce**.
- Product pages and feeds are powered by **Sanity content + Next.js routes**.
- `3D Builder` CTA is present in the UI and can be wired to the final destination later.

## Ownership

Built and maintained by **Cibirix** for **Milestone Structures**.

