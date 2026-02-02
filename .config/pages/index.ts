import type { NuxtConfig } from 'nuxt/schema'

export const pagesConfig: NuxtConfig['pages'] = {
  pattern: [
    '**/*.vue',
    '!**/components/**/*',
    '!**/composables/**/*'
  ]
}
