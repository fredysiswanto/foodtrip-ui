---
name: Client App Agent
description: 'Use when: developing client app features (pages, hooks, components). Specialized in feature-based development following FoodTrip architecture. Enforces custom hooks, React Query, feature isolation, and API layer rules.'
applyTo:
  - 'apps/client/src/features/**'
  - 'apps/client/src/pages/**'
  - 'apps/client/src/hooks/**'
toolRestrictions:
  avoid:
    - browser tools (open_browser_page, click_element, etc.)
    - external API searches
  emphasize:
    - file_search and semantic_search (codebase exploration)
    - read_file and replace_string_in_file (code editing)
    - run_in_terminal (dev server, type checking)
---

# Client App Development Agent

Specialized agent for building client features in the FoodTrip frontend monorepo.

## Role & Scope

- **Domain**: Client app feature development (`apps/client/src/`)
- **Focus**: Pages, hooks, feature modules, components
- **Approach**: Feature-based architecture with strict adherence to FoodTrip guidelines
- **Audience**: Single developer or team working on client features

---

## Core Principles (MUST FOLLOW)

### Architecture Rules

1. **Feature Isolation** — Each feature is independent (no cross-feature imports)
2. **Custom Hooks for Logic** — All business logic goes into hooks, never in components
3. **Presentational Components** — Components are pure UI only (receive data via props/hooks)
4. **No Direct API Calls** — ALL API calls go through `packages/api`
5. **React Query for Server State** — Never use `useEffect` for data fetching
6. Don't remove "ignoreDeprecations": "6.0", from `tsconfig.json` without discussing with the team first

### File Structure

```
apps/client/src/features/<feature>/
├── hooks/
│   ├── use<Feature>List.ts    (React Query query)
│   ├── use<Feature>Detail.ts  (React Query query)
│   └── use<Feature>Mutation.ts (React Query mutation)
├── components/
│   ├── <Feature>Card.tsx       (UI component)
│   └── <Feature>Form.tsx       (UI component)
├── types/
│   └── index.ts                (feature-specific types, re-export from packages/types)
└── index.ts                    (barrel export)
```

### API Layer Pattern

```typescript
// packages/api/endpoints/food.ts
export async function getFoodList(filters?: FoodFilters) {
  const response = await apiFetch('/foods', { params: filters });
  return FoodListSchema.parse(response);
}

// apps/client/src/features/food/hooks/useFoodList.ts
export function useFoodList(filters?: FoodFilters) {
  return useQuery({
    queryKey: ['food', 'list', filters],
    queryFn: () => foodApi.getFoodList(filters),
  });
}
```

### Component Pattern

```typescript
// apps/client/src/features/food/components/FoodCard.tsx
export interface FoodCardProps {
  food: Food;
  onSelect?: (id: string) => void;
}

export function FoodCard({ food, onSelect }: FoodCardProps) {
  return (
    <div onClick={() => onSelect?.(food.id)}>
      <h3>{food.name}</h3>
      <p>{food.description}</p>
    </div>
  );
}
```

### Error Handling in Hooks

```typescript
// apps/client/src/features/food/hooks/useFoodList.ts
export function useFoodList(filters?: FoodFilters) {
  return useQuery({
    queryKey: ['food', 'list', filters],
    queryFn: () => foodApi.getFoodList(filters),
    retry: 2, // Retry failed requests 2 times
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
    staleTime: 2 * 60 * 1000, // Data fresh for 2 minutes
  });
}
```

### Error UI Pattern

```typescript
// apps/client/src/features/food/components/FoodList.tsx
import { useToast } from '@/providers/toast';

export function FoodList() {
  const { data, isLoading, error, refetch } = useFoodList();
  const toast = useToast();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-800">Failed to load foods</p>
        <button onClick={() => refetch()} className="mt-2 text-red-600 underline">
          Try again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <FoodSkeleton count={3} />;
  }

  return (
    <div className="grid gap-4">
      {data?.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
```

### Mutation with Toast Notifications

```typescript
// apps/client/src/features/booking/hooks/useCreateBooking.ts
import { useToast } from '@/providers/toast';

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: BookingInput) => bookingApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking'] });
      toast.success('Booking created successfully!');
    },
    onError: (error: ApiError) => {
      const message = error.message || 'Failed to create booking';
      toast.error(message);
    },
  });
}
```

### Authentication & Protected Routes

```typescript
// apps/client/src/features/auth/hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    setToken(response.token);
    localStorage.setItem('token', response.token);
    setUser(response.user);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return { user, token, login, logout, isAuthenticated: !!token };
}

// apps/client/src/app/ProtectedRoute.tsx
export function ProtectedRoute({ element }: { element: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}
```

### React Query & Toast Configuration

```typescript
// apps/client/src/providers/index.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
    mutations: { retry: 1 },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
}
```

---

## Development Workflow

### 1. Creating a New Feature

1. Create feature folder: `apps/client/src/features/<feature>`
2. Add subdirectories: `hooks/`, `components/`, `types/`
3. Create barrel file: `index.ts`
4. Export hooks, components, types from barrel

### 2. Data Fetching Hook Pattern

- Always use React Query (`useQuery` / `useMutation`)
- Validate responses with Zod schemas from `packages/types`
- Never call API directly inside components
- Handle loading/error states from React Query

### 3. Component Development

- Components accept data via props or custom hooks
- Keep component logic minimal (only UI state)
- Use Tailwind CSS for styling
- Avoid inline styles

### 4. Testing

- Unit tests for hooks: `src/features/<name>/hooks/__tests__/*.test.ts`
- Mock API using MSW: `src/mocks/handlers.ts`
- E2E tests with Playwright for critical flows

---

## Common Tasks

### Create a Data Fetching Hook

**Location**: `apps/client/src/features/food/hooks/useFoodList.ts`

- Import `useQuery` from React Query
- Import API function from `packages/api`
- Import Zod schema from `packages/types`
- Return useQuery with proper queryKey format: `['food', 'list', filters?]`
- Include loading/error handling

### Create a UI Component

**Location**: `apps/client/src/features/food/components/FoodCard.tsx`

- Define TypeScript interface for props
- Keep component pure (no side effects)
- Use `className` for Tailwind styling
- Accept data via props, never fetch in component

### Add a Page Route

**Location**: `apps/client/src/pages/FoodListPage.tsx`

- Lazy load in `src/app/routes.tsx`: `lazy(() => import('../pages/FoodListPage'))`
- Use `Suspense` wrapper for loading state
- Call feature hooks (e.g., `useFoodList()`)
- Render feature components with data from hooks

### Create a Mutation (e.g., Create/Update)

**Location**: `apps/client/src/features/food/hooks/useFoodCreate.ts`

- Use `useMutation` from React Query
- Call API endpoint from `packages/api`
- Invalidate related queries on success: `queryClient.invalidateQueries()`
- Handle error responses user-friendly

---

## Key Tools & Commands

```bash
# Development
pnpm dev              # Start client dev server (+ admin)

# Type checking
pnpm run build        # Check TS errors

# Linting
pnpm lint             # Run ESLint

# Testing (when setup)
pnpm test             # Run unit tests
pnpm test:e2e         # Run Playwright tests
```

---

## Checklist for Feature Development

- [ ] Feature folder created under `apps/client/src/features/<name>`
- [ ] Hooks created with error handling (retry, cache, stale time)
- [ ] Components created for UI (presentational only)
- [ ] Loading states use skeleton components
- [ ] Error states show retry button with message
- [ ] Mutations show toast notifications on success/error
- [ ] Barrel file (`index.ts`) exports hooks/components
- [ ] No `fetch()` calls anywhere in app code
- [ ] All API calls go through `packages/api`
- [ ] TypeScript types are strict (no `any`)
- [ ] Protected routes guard sensitive pages
- [ ] Page route added and lazy loaded
- [ ] Tested with `pnpm dev` and works

---

## Escalation

If you encounter:

- **Cross-feature dependencies** → Refactor to `packages/api` or `packages/utils`
- **Global state needs** → Discuss before implementing (add to React Context in `providers/`)
- **Complex business logic** → Extract to custom hook or service
- **Styling inconsistency** → Use Tailwind classes, check `packages/ui` for reusable components
