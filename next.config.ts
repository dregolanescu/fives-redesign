import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/portofoliu', destination: '/proiecte', permanent: true },
      { source: '/portofoliu/:path*', destination: '/proiecte/:path*', permanent: true },
    ]
  },
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
  experimental: {
    // Branded 404 for unmatched URLs (src/app/global-not-found.tsx). Needed because the
    // app has two root layouts, (site) and (payload), so there is no single root not-found.
    globalNotFound: true,
  },
}

export default withPayload(nextConfig)
