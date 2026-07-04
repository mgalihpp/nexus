# AGENTS.md — nexus (Vue 3 + Vite + TS + Tailwind v4)

## Package Manager
Use **bun** (see `package.json:engines` for Node version requirements).

## Key Commands
| Task | Command |
|------|---------|
| Install | `bun install` |
| Dev server | `bun dev` |
| Type-check + build (prod) | `bun run build` |
| Type-check only | `bun type-check` |
| Lint (oxlint + eslint) | `bun lint` |
| Lint only oxlint | `bun lint:oxlint` |
| Lint only eslint | `bun lint:eslint` |
| Format | `bun format` |
| Preview build | `bun preview` |

> `build` runs `type-check` and `build-only` in parallel via `npm-run-all2`.

## Architecture
- **Entry**: `src/main.ts` → mounts `App.vue`
- **App**: `src/App.vue` composes landing page sections from `src/components/`
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (no PostCSS config)
- **Path alias**: `@/*` → `./src/*` (configured in `tsconfig.app.json` and `vite.config.ts`)

## Type Checking
- Uses `vue-tsc --build` for incremental type checking (outputs `.tsbuildinfo` to `node_modules/.tmp/`)
- Project references: `tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`

## Linting
- **Oxlint** (primary): strict `correctness: error` rules, plugins: eslint, typescript, unicorn, oxc, vue
- **ESLint** (secondary): vue + typescript config, uses cache
- Run both via `bun lint` (series via `run-s`)

## Formatting
- Prettier with experimental CLI: `prettier --write --experimental-cli src/`

## Testing
No test framework configured.

## Notable Conventions
- Components are single-file `.vue` with `<script setup lang="ts">`
- CSS in `src/assets/main.css` (imported in `main.ts`)
- Public assets in `public/` (served at root)
- Dist output in `dist/` (gitignored)