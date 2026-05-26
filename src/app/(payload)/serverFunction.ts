'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import configPromise from '../../../payload.config'
import { importMap } from './importMap'
import type { ServerFunctionClient } from 'payload'

export const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}
