import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'House Transformers CMS',

  projectId: 'ww716qap',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})
