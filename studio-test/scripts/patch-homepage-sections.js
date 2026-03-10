const { getCliClient } = require('sanity/cli')

const defaults = {
  localIntroHeading: 'Built Different. Backed by Veterans.',
  localIntroBody:
    'Milestone Structures is a veteran-owned and operated metal building dealer focused on straight talk, clean product guidance, and fully customizable steel structures for any need.',
  remodelingHeading: 'Explore Custom Metal Building Options',
  remodelingBody:
    'From garages and workshops to agricultural buildings and carports, Milestone Structures helps customers compare layouts, sizing, and configuration options with direct support from first call to final build.',
}

function isBlank(value) {
  return value === null || value === undefined || (typeof value === 'string' && value.trim() === '')
}

async function run() {
  const client = getCliClient({ apiVersion: '2023-08-01' })
  const homepage = await client.fetch(
    `*[_type == "homepage"] | order(_updatedAt desc)[0]{
      _id,
      localIntroHeading,
      localIntroBody,
      remodelingHeading,
      remodelingBody
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
