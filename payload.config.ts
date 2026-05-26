import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articles } from './collections/Articles'
import { HeroSlides } from './collections/HeroSlides'
import { HeroConfig } from './globals/HeroConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Turso (production/preview) or local SQLite file (development)
const dbUrl = process.env.TURSO_DATABASE_URL
  ? process.env.TURSO_DATABASE_URL
  : `file:${path.resolve(dirname, './payload.db')}`

const dbConfig = process.env.TURSO_AUTH_TOKEN
  ? { url: dbUrl, authToken: process.env.TURSO_AUTH_TOKEN }
  : { url: dbUrl }

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | FIVE'S Admin",
      icons: [{ url: '/favicon_ideogram_fives-01.svg', type: 'image/svg+xml' }],
    },
    theme: 'light',
  },
  collections: [Users, Media, Articles, HeroSlides],
  globals: [HeroConfig],
  editor: lexicalEditor(),
  db: sqliteAdapter({ client: dbConfig }),
  sharp,
  upload: { limits: { fileSize: 20_000_000 } },

  // Resend for transactional email (forgot password, etc.)
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          defaultFromAddress: process.env.RESEND_FROM || 'noreply@fives.ro',
          defaultFromName: "FIVE'S Admin",
          apiKey: process.env.RESEND_API_KEY,
        }),
      }
    : {}),

  // Vercel Blob for media uploads (production/preview)
  ...(process.env.BLOB_READ_WRITE_TOKEN
    ? {
        plugins: [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
              'hero-slides': true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ],
      }
    : {}),

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  secret: process.env.PAYLOAD_SECRET || 'fives-payload-secret-key-2026',
})
