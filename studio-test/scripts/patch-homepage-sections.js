const { getCliClient } = require('sanity/cli')

const defaults = {
  trustedHeading: 'Trusted & Certified Craftsmanship Backed by Industry Leaders',
  remodelingHeading: 'Transform Your Home or Facility With Confidence',
  remodelingBody:
    'From roofing to full remodels, our crews handle every detail with careful planning, code-compliant work, and premium materials.',
  emergencyHeading: '24/7 Emergency Response for Storm, Water, and Fire Damage',
  emergencyBody:
    'Call anytime for emergency roof tarping, leak control, flood cleanup, and rapid home stabilization services in Glen Burnie and Anne Arundel County.',
}

function isBlank(value) {
  return value === null || value === undefined || (typeof value === 'string' && value.trim() === '')
}

async function run() {
  const client = getCliClient({ apiVersion: '2023-08-01' })
  const homepage = await client.fetch(
    `*[_type == "homepage"] | order(_updatedAt desc)[0]{
      _id,
      trustedHeading,
      remodelingHeading,
      remodelingBody,
      emergencyHeading,
      emergencyBody
    }`,
  )

  if (!homepage?._id) {
    const created = await client.create({
      _type: 'homepage',
      title: 'Homepage Content',
      ...defaults,
    })
    console.log(`Created homepage document: ${created._id}`)
    return
  }

  const patch = {}
  for (const [key, value] of Object.entries(defaults)) {
    if (isBlank(homepage[key])) {
      patch[key] = value
    }
  }

  if (Object.keys(patch).length === 0) {
    console.log('No homepage section fields needed updates.')
    return
  }

  await client.patch(homepage._id).set(patch).commit()
  console.log(`Patched homepage ${homepage._id} fields: ${Object.keys(patch).join(', ')}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
