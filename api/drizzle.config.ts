import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/schemas/index.ts',
  dbCredentials: {
    url: 'file:../database.sqlite'
  },
  out: './drizzle'
})