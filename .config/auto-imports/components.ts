import type { NuxtConfig } from 'nuxt/schema'

export const autoImportComponents: NuxtConfig['components'] = [
  {
    path: '@/components',
    pattern: '**/*.vue',
    pathPrefix: false
  },
  {
    path: '@/features',
    pattern: '**/components/**/*.vue',
    pathPrefix: false
  },
  {
    path: '@/pages',
    pattern: '**/components/**/*.vue',
    pathPrefix: false
  }
]
