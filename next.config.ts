import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const isDev = process.env.NODE_ENV !== 'production'

// Payload builds absolute media URLs from serverURL (same fallback as payload.config.ts), so a deployment
// on another host, such as a Vercel preview, loads its images from there.
const mediaOrigin = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://fives-preview.advanguard.ro').origin

// Public site. Next.js inlines small bootstrap scripts, so script-src needs 'unsafe-inline';
// the policy still pins every origin the site may load from, connect to or be framed by.
// vercel.live / pusher / assets.vercel.com: the Vercel toolbar on preview deployments.
const siteCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://vercel.live`,
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  // www.fives.ro: the Instagram tiles still load from the old site until they move into the CMS.
  `img-src 'self' ${mediaOrigin} data: blob: https://www.fives.ro https://fives.ro https://*.public.blob.vercel-storage.com https://vercel.live https://vercel.com`,
  "font-src 'self' data: https://vercel.live https://assets.vercel.com",
  `media-src 'self' ${mediaOrigin} blob: https://*.public.blob.vercel-storage.com`,
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  // Google Maps embed (only after consent), the 3D iframe (same origin) and the Vercel toolbar.
  "frame-src 'self' https://www.google.com https://vercel.live",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
]

const nextConfig: NextConfig = {
  // Do not advertise the stack ("X-Powered-By: Next.js, Payload").
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Site pages: full policy. The Payload admin and API are excluded and get their own below.
      { source: '/((?!admin|api).*)', headers: [{ key: 'Content-Security-Policy', value: siteCsp }] },
      // Payload admin: it relies on inline scripts and styles, so only framing and plugins are restricted.
      {
        source: '/admin/:path*',
        headers: [{ key: 'Content-Security-Policy', value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'" }],
      },
      // Uploaded files: never run as a page, even if a crafted file got past the upload checks.
      {
        source: '/api/media/file/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'none'; img-src 'self'; media-src 'self'; style-src 'unsafe-inline'; sandbox",
          },
        ],
      },
    ]
  },
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
