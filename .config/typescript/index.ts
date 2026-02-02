import type { NuxtConfig } from 'nuxt/schema'

export const typeScriptConfig: NuxtConfig['typescript'] = {
  tsConfig: {
    include: [
      '../dts/**/*',
      '../layers/**/*'
    ]
  },
  nodeTsConfig: {
    include: [
      '../*.config.*',
      '../.config/**/*'
    ]
  }
}
