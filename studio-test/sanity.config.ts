import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Milestone Structures CMS',

  projectId: 'qj0b1rli',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})
