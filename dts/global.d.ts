/* eslint-disable @typescript-eslint/naming-convention */

declare module '#app' {
  interface PageMeta {
    label?: string
    requireAuth?: boolean
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
