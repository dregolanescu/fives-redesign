import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.fives.ro' },
      { protocol: 'https', hostname: 'fives.ro' },
    ],
  },
  turbopack: {
    resolveAlias: {
      '@payload-config': './payload.config.ts',
    },
  },
}

export default withPayload(nextConfig)
