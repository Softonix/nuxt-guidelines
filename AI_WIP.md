# Softonix AI Nuxt Guidelines

## Architecture Layers

**One-way dependency direction for business logic:**

```
composable -> store -> service
```

- **Service** -> knows nothing about store or composable (pure API/domain/data-managing logic)
- **Store** -> can use services and utility composables, but should NOT use project-orchestrating composables
- **Composable** -> can use stores and services (the orchestrator for business logic)

## Pages vs Features

| Aspect              | Pages                        | Features                      |
|---------------------|------------------------------|-------------------------------|
| **Purpose**         | Route-bound pages            | Reusable isolated modules     |
| **Route awareness** | Strictly tied to routes      | Route-agnostic (isolated)     |
| **Location**        | `app/pages/`                 | `app/features/`               |

**Feature isolation rules:**
1. Features NEVER know about the route they're used in
2. Features NEVER depend on other features directly
3. Pages (or composables) act as "feature managers" and orchestrate communication

## Project Structure

```
.config/
├── auto-imports/                # Nuxt auto-import config (components + scripts)
├── eslint-rules/                # ESLint rules (base, stylistic, typescript, vue)
├── icon-names-generator/        # Vite plugin generating TIcons type from SVG files
├── modals-generator/            # Vite plugin auto-registering *Modal.vue files
├── pages/                       # Nuxt pages config
├── typescript/                  # Nuxt TS config (extra include paths)
└── index.ts                     # Exports all config plugins

dts/                             # TypeScript global declarations (auto-generated + manual)
public/                          # Website's static assets
app/
├── assets/
│   └── styles/                  # CSS (main.css, theme.css, element-reset/)
├── components/                  # Global components
├── composables/                 # Global composables
├── features/                    # Reusable isolated features
    ├── platform/                # Cross-cutting platform utilities (icons, modals, etc.)
    └── [feature]/
        ├── Feature.vue
        ├── feature.service.ts
        ├── feature.store.ts
        ├── composables/
        └── components/
├── layouts/                     # Nuxt layouts
├── pages/                       # Route-bound pages (strict structure)
    └── [page]/
        ├── page.vue
        ├── page.service.ts
        ├── page.store.ts
        ├── composables/
        └── components/
├── plugins/                     # Nuxt plugins
├── services/                    # Global services
├── store/                       # Global Pinia stores
├── types/                       # Application-owned type definitions
└── utils/                       # Global utility functions
```

## Nuxt Composables & Element Plus First

Before creating from scratch, ALWAYS check existing libraries:
- **Composables** -> Check Nuxt built-ins first (`useFetch`, `useAsyncData`, `useState`, etc.). If VueUse is installed, prefer VueUse for common utilities.
- **UI Components** -> Check Element Plus first (buttons, forms, tables, dialogs, etc.)

## Auto-Imports

Everything in these paths is auto-imported (no manual imports needed):
- `app/composables/`, `app/pages/**/composables/`, `app/features/**/composables/`
- `app/services/`, `app/pages/**/*.service.ts`, `app/features/**/*.service.ts`
- `app/store/*.store.ts`, `app/pages/**/*.store.ts`, `app/features/**/*.store.ts`
- `app/components/**/*.vue`, `app/pages/**/components/**/*.vue`, `app/features/**/components/**/*.vue`
- Nuxt/Vue/Vue Router/Pinia auto-imports

## Icon Component

`<Icon name="car" />` - dynamically loads SVG from `app/features/platform/icons/assets/`.
Icon names are type-safe via auto-generated `TIcons` union in `app/features/platform/icons/icons.d.ts`.

## Modals

- Create modal components as `*Modal.vue` under `app/pages/`, `app/features/`, or `app/components/` (auto-registered).
- Registry is auto-generated at `app/features/platform/modals/modals-registry.ts`.
- Use `useModals()` to control them: `openModal('HomeModal', props)` / `closeModal('HomeModal')`.
- The modal host is `Modals` component, rendered once in `app/layouts/Default.vue`.

## Naming Conventions

- Folders: `kebab-case` (e.g., `user-profile`)
- Vue components: `PascalCase` (e.g., `UserProfile.vue`)
- TS files: `kebab-case` with suffix (e.g., `auth.service.ts`, `auth.store.ts`)
- Routes: file-based, with auto-generated names matching the route tree
- Components conflicting with HTML tags: prefix with `App` (e.g., `AppButton`, `AppTable`)

## Important Rules

- NEVER use `export default` in app code.
  Exception: Nuxt-required files such as `nuxt.config.ts`, `defineNuxtPlugin`, and `defineNuxtRouteMiddleware`.
- NEVER use `as any` to fix TypeScript errors -> fix the actual type issue
- NEVER let services know about stores
- NEVER let stores use project-orchestrating composables (utility composables are OK)
- NEVER let features depend on each other directly
- Page components must match their route folder: `app/pages/auth/login.vue` -> `/auth/login`
- ALWAYS use named navigation (`navigateTo({ name: ... })` or `router.push({ name: ... })`)
  Prefer typed route names from `vue-router/auto-routes` (Nuxt typed pages)
- Page/component CSS goes in `.vue` files, global styles in `app/assets/styles/`
