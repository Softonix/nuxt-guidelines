import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { globalIgnores } from 'eslint/config'
import tsLint from 'typescript-eslint'
import { eslintRules } from './.config'

import pluginStylistic from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'

/* Available config names: */
/*
  nuxt/javascript
  nuxt/typescript/setup
  nuxt/typescript/rules
  nuxt/vue/setup
  nuxt/vue/rules
  nuxt/import/rules
  nuxt/setup
  nuxt/vue/single-root
  nuxt/rules
  nuxt/nuxt-config
  nuxt/sort-config
  nuxt/stylistic
  nuxt/disables/routes
*/

export default createConfigForNuxt({
  features: {
    stylistic: true,
    typescript: {
      tsconfigPath: './.nuxt/tsconfig.app.json'
    }
  }
})
  .prepend(globalIgnores(['public/**']))
  .prepend(
    pluginStylistic.configs.recommended,
    pluginVue.configs['flat/recommended'],
    tsLint.configs.recommendedTypeChecked,
    tsLint.configs.stylisticTypeChecked
  )
  .override('nuxt/javascript', { rules: eslintRules.base })
  .override('nuxt/typescript/rules', { rules: eslintRules.typescript })
  .override('nuxt/stylistic', { rules: eslintRules.stylistic })
  .override('nuxt/vue/rules', { rules: eslintRules.vue })
  .override('nuxt/vue/single-root', {
    rules: {
      'vue/no-multiple-template-root': 'off'
    }
  })
