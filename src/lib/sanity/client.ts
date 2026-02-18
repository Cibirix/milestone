const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ww716qap'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-10'
const token = process.env.SANITY_API_READ_TOKEN?.trim()

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  token,
  endpoint: `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
}
