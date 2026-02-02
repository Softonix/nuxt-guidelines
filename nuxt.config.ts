import Tailwindcss from '@tailwindcss/vite'
import {
  ModalsGenerator,
  IconNamesGenerator,
  autoImportConfig,
  pagesConfig,
  typeScriptConfig
} from './.config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    ['@element-plus/nuxt', {
      importStyle: false,
      installMethods: ['ElLoading', 'ElNotification', 'ElMessage', 'ElMessageBox']
    }],
    ['@nuxt/icon', {
      componentName: 'NuxtIcon',
      provider: 'none',
      mode: 'svg',
      customCollections: [{ prefix: 'icon', dir: './app/features/platform/icons/assets' }]
    }]
  ],

  pages: pagesConfig,

  components: autoImportConfig.components,
  imports: autoImportConfig.scripts,

  devtools: { enabled: true },

  css: [
    '@/assets/styles/main.css'
  ],

  experimental: {
    typedPages: true
  },

  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [
      Tailwindcss(),
      ModalsGenerator(),
      IconNamesGenerator()
    ]
  },

  typescript: typeScriptConfig
})
