import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import configPromise from '../../../payload.config'
import { importMap } from './importMap'
import { serverFunction } from './serverFunction'

import '@payloadcms/next/css'
import './custom.css'

export const metadata = {
  title: "FIVE'S Admin",
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
