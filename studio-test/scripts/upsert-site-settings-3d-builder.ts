import { getCliClient } from 'sanity/cli'

async function run() {
  const client = getCliClient({ apiVersion: '2024-10-01' }).withConfig({ useCdn: false })
  await client
    .patch('siteSettings.main')
    .set({
      threeDBuilderUrl: 'https://milestonestructures.sensei3d.com/',
    })
    .commit()

  console.log('Updated siteSettings.main with 3D Builder URL')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
