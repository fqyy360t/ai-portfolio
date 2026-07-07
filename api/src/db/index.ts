import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { content, setting, tag, adminUser } from '../schemas'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, '../../../database.sqlite')

const client = createClient({
  url: `file:///${dbPath}`
})

export const db = drizzle(client, { schema: { content, setting, tag, adminUser } })