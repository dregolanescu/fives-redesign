import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../../importMap'
import configPromise from '../../../../../payload.config'

export default function NotFound() {
  return NotFoundPage({
    config: configPromise,
    importMap,
    params: Promise.resolve({ segments: [] }),
    searchParams: Promise.resolve({}),
  })
}
