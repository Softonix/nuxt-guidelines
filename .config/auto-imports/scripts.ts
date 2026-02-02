import type { NuxtConfig } from 'nuxt/schema'

export const autoImportScripts: NuxtConfig['imports'] = {
  dirs: [
    '@/composables',
    '@/features/**/composables',
    '@/pages/**/composables',

    '@/services',
    '@/features/**/*.service.ts',
    '@/pages/**/*.service.ts',

    '@/store/*.store.ts',
    '@/features/**/*.store.ts',
    '@/pages/**/*.store.ts'
  ]
}
