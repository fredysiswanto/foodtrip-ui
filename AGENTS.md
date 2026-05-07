# AGENTS.md — FoodTrip UI

## Commands

```bash
pnpm dev           # Start both apps (admin + client) in parallel
pnpm dev:admin     # Start admin only (port 5174)
pnpm dev:client    # Start client only (port 5173)
pnpm build         # Typecheck + build all apps
pnpm lint          # ESLint across all code
```

## Architecture

**pnpm monorepo** — React 18 + TypeScript + Vite 5. Backend is a separate Express repo.

| Package              | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `apps/admin`         | Admin app (CRUD, dashboards, data tables)                  |
| `apps/client`        | Client app (browse, search, booking) — features not started |
| `packages/api`       | Centralized API client (`apiFetch`) + endpoint definitions |
| `packages/types`     | Shared TypeScript types + Zod schemas                      |
| `packages/ui`        | Reusable UI components (base, form, layout, feedback, data) |
| `packages/utils`     | Shared utilities + error helpers                           |

### Critical: packages are NOT built

Package `package.json` files use `"main": "index.ts"` — they export `.ts` source directly, no compilation step. This is intentional via pnpm `shamefully-hoist=true` in `.npmrc`.

### Feature isolation

Features must be independent. No cross-feature imports inside `apps/*/src/features/`. Shared logic goes in `packages/*`.

## Critical Rules

- **No `fetch()` in components** — all API calls go through `packages/api` using `apiFetch`
- **No `useEffect` for data fetching** — use React Query (`@tanstack/react-query` v5)
- **Components are presentational only** — business logic in custom hooks
- **No `any` type** — strict TypeScript throughout
- **Zod validates all API responses** in `packages/api/client.ts`

## API Layer Details

- `packages/api/client.ts` — single HTTP client (`apiFetch`)
- Token stored in `localStorage` under key `auth_token` — injected automatically
- `ApiError` class with `status`, `code`, `message`, `details`
- Response validators are inline in `validateWith` callbacks (not separate files)
- Debug `console.log` statements exist in `client.ts` — do not remove without asking
- Current endpoints: `authApi`, `restaurantApi`, `dishApi`

## Environment

- Root `.env.local` sets `VITE_API_URL` (currently points to QA backend)
- Both apps share the same env var; no per-app env loading in Vite config
- Admin has its own `.env.local` but root is the source of truth

## Styling

- **Tailwind CSS v4** — admin has it configured (`tailwind.config.js`, `postcss.config.js`)
- Client app does NOT have Tailwind configured yet
- Prettier: single quotes, semicolons, 80-char print width, 2-space tabs

## Current State

- **Admin app**: auth, dish, restaurant features implemented
- **Client app**: scaffolding only — no features yet (`src/features/` is empty)
- **No test framework** — Vitest/Playwright/MSW are TODO items, not set up
- Typo in `packages/types/restauran-category.ts` (missing "t" in restaurant) — keep as-is to match backend

## Routing

- Route definitions live in `src/app/routes.tsx` per app
- Use `React.lazy()` with `Suspense` for route-level code splitting
- Admin routes wrapped with `<ProtectedRoute>` for auth guard

## Query Key Convention

- Admin: `['admin', '<feature>', '<action>', ...params]`
- Client: `['<feature>', '<action>', ...params]`

## Skills & Agents (OpenCode)

5 skills defined in `.opencode/agents/admin.agent.md`:
- `admin-crud-feature` — scaffold full CRUD (hook + component + type)
- `admin-data-table` — table views with pagination/filtering/sorting
- `admin-form-builder` — react-hook-form + Zod forms
- `admin-dashboard` — summary cards, stats panels
- `admin-code-review` — audit: type safety, error handling, pattern consistency

## Existing Instruction Sources

- `.github/copilot-instructions.md` — comprehensive architecture and coding rules (298 lines)
- `.github/agents/admin.agent.md` — admin-specific patterns, CRUD templates, checklists
- `.github/agents/client.agent.md` — client-specific patterns and examples
- `.opencode/agents/admin.agent.md` — admin agent with skills (source of truth for agent behavior)
- `.opencode/agents/client.agent.md` — client agent with skills
