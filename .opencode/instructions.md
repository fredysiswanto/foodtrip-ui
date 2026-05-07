# GitHub Copilot Instructions – FoodTrip Frontend

## General Rules

- Use **TypeScript** for all code
- Follow **feature-based architecture**
- Keep components **presentational (UI only)**
- Move all business logic into **custom hooks or services**
- Use **pnpm workspace** for monorepo management
- NEVER use `any`, prefer strict typing

---

## Critical Rules (MUST FOLLOW)

- NEVER call API inside components
- NEVER use `useEffect` for data fetching
- ALWAYS use **React Query** for server state
- ALL API calls MUST go through `packages/api`
- ALL features MUST be isolated (no cross-feature imports)

---

## Monorepo Structure

- `apps/admin/` — Admin application
- `apps/client/` — Client application
- `packages/api/` — API client & endpoints
- `packages/types/` — Shared types & Zod schemas
- `packages/ui/` — Reusable UI components
- `packages/utils/` — Shared utilities

---

## Per-App Structure

Each app must follow:

- `src/app/` — App setup & route config
- `src/features/` — Feature-based modules
- `src/pages/` — Route entry points
- `src/providers/` — Global providers (React Query, Auth)
- `src/layouts/` — Layout components
- `src/components/` — App-specific UI
- `src/styles/` — Styles

---

## Feature Structure

Each feature must follow:

- `hooks/` — All business logic (React Query hooks)
- `components/` — UI components
- `types/` — Feature-specific types
- `index.ts` — Barrel export

Example:
`features/food/hooks/useFoodList.ts`

---

## Feature Isolation

- Features must be independent
- DO NOT import directly from other features
- Shared logic must be moved to `packages/*`

---

## API Layer Rules

- All API logic must live in `packages/api`
- Use `apiFetch` as the ONLY HTTP client
- Do NOT use `fetch` directly anywhere else

### Endpoint Rules

- Separate endpoints by domain:
  - `auth.ts`
  - `food.ts`
  - `trip.ts`

- API functions must:
  - be pure (no React dependency)
  - return typed data
  - not handle UI logic

---

## API Response Validation

- Use **Zod schemas** in `packages/types`
- Validate all API responses
- Do NOT trust raw backend response

Example:

```ts
const FoodSchema = z.object({
  id: z.string(),
  name: z.string(),
});
```

---

## Data Mapping

- Do NOT expose raw API response to UI
- Transform data inside hooks or API layer
- Ensure UI receives clean, stable structure

---

## React Query Rules

- ALL server state must use React Query

### Query Key Convention

Format:

```ts
['<feature>', '<action>', params];
```

Examples:

```ts
['food', 'list'][('food', 'detail', id)][('auth', 'me')];
```

---

## Authentication

- Store token in localStorage or cookie
- Inject token automatically in `apiFetch`
- NEVER attach Authorization header manually
- Provide `useAuth()` hook for auth state

---

## Component Rules

- Components must:
  - only handle UI
  - receive data via props or hooks

- Components must NOT:
  - call API
  - contain business logic
  - contain complex data transformation

---

## State Management

- Server state → React Query
- Local UI state → `useState` / `useReducer`
- Avoid global state unless necessary

---

## Error Handling

### API Layer

- Centralize error handling in `packages/api`
- Handle HTTP errors (4xx, 5xx)

### UI Layer

- Show user-friendly error messages
- Use toast for global errors
- Use inline error for forms
- NEVER expose raw backend error directly

---

## Loading State

- Always handle loading state from React Query
- Use skeleton loaders for lists
- Avoid blank screens

---

## Environment Configuration

- Use `.env.<environment>`
- Access via centralized config
- NEVER hardcode API URLs

---

## Import / Export Rules

- Use barrel files (`index.ts`) for features
- Avoid deep barrel chaining
- Prefer clarity over abstraction

---

## Naming Conventions

- Hooks: `useFeatureAction`
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_CASE`

---

## File Naming

- Hooks: `useFoodList.ts`
- API: `food.ts`
- Components: `FoodCard.tsx`

---

## Styling

- Use **Tailwind CSS**
- Use `className` for styling
- Avoid inline styles unless necessary

---

## Routing

- Route definitions: `src/app/routes.tsx`
- Use React Router v6 with simple components
- Lazy load routes: `React.lazy(() => import('./pages/...'))`
- Avoid loaders/actions for simplicity (use hooks instead)
- Wrap routes with Suspense fallback for lazy loading

Example:

```ts
// src/app/routes.tsx
import { lazy } from 'react';

const FoodListPage = lazy(() => import('../pages/FoodListPage'));
const FoodDetailPage = lazy(() => import('../pages/FoodDetailPage'));

export const clientRoutes = [
  { path: '/foods', element: <FoodListPage /> },
  { path: '/foods/:id', element: <FoodDetailPage /> },
];
```

---

## Utility Placement

- Feature-specific → inside feature folder
- Shared → `packages/utils`

---

## Testing

- Unit tests: `src/**/__tests__/*.test.ts`
- E2E tests: Playwright
- Mock API: MSW

### MSW Structure

- Handlers: `src/mocks/handlers.ts`
- Fixtures: `src/mocks/fixtures/`

---

## Before generating code:

1. Explore existing feature patterns
2. Reuse existing abstractions
3. Check shared UI components
4. Avoid creating duplicate hooks/components

---

## Code Quality

- Write small, reusable functions
- Avoid duplication
- Prefer readability over cleverness
- Always define types for API responses

---

## When in Doubt

- Keep it simple
- Follow existing patterns
- Do NOT introduce new patterns without consistency
