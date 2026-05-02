---
name: Admin App Agent
description: 'Use when: developing admin features (CRUD operations, dashboards, data management, tables, forms). Specialized in admin-focused development following FoodTrip architecture. Enforces custom hooks, React Query, data table patterns, and form handling.'
applyTo:
  - 'apps/admin/src/features/**'
  - 'apps/admin/src/pages/**'
  - 'apps/admin/src/hooks/**'
toolRestrictions:
  avoid:
    - browser tools (open_browser_page, click_element, etc.)
    - external API searches
  emphasize:
    - file_search and semantic_search (codebase exploration)
    - read_file and replace_string_in_file (code editing)
    - run_in_terminal (dev server, type checking)
---

# Admin App Development Agent

Specialized agent for building admin features in the FoodTrip frontend monorepo.

## Role & Scope

- **Domain**: Admin app feature development (`apps/admin/src/`)
- **Focus**: CRUD operations, dashboards, data tables, forms, data management
- **Approach**: Feature-based architecture with strict adherence to FoodTrip guidelines
- **Audience**: Admin developers working on data management interfaces

---

## Core Principles (MUST FOLLOW)

### Architecture Rules

1. **Feature Isolation** — Each feature (food, user, trip) is independent (no cross-feature imports)
2. **Custom Hooks for Logic** — All business logic goes into hooks, never in components
3. **Presentational Components** — Components are pure UI only (receive data via props/hooks)
4. **No Direct API Calls** — ALL API calls go through `packages/api`
5. **React Query for Server State** — Never use `useEffect` for data fetching
6. Don't remove "ignoreDeprecations": "6.0", from `tsconfig.json` without discussing with the team first

### Admin-Specific Patterns

#### List View Hook (with pagination & filtering)

```typescript
// apps/admin/src/features/food/hooks/useFoodList.ts
export function useFoodList(filters?: FoodFilters, page?: number) {
  return useQuery({
    queryKey: ['admin', 'food', 'list', filters, page],
    queryFn: () => foodApi.getFoodList({ ...filters, page }),
  });
}
```

#### Detail/Edit Hook (with mutations)

```typescript
// apps/admin/src/features/food/hooks/useFoodDetail.ts
export function useFoodDetail(id: string) {
  return useQuery({
    queryKey: ['admin', 'food', 'detail', id],
    queryFn: () => foodApi.getFoodById(id),
  });
}

// apps/admin/src/features/food/hooks/useFoodUpdate.ts
export function useFoodUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FoodUpdateInput) => foodApi.updateFood(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'food'] });
    },
  });
}
```

#### Form Component Pattern

```typescript
// apps/admin/src/features/food/components/FoodForm.tsx
import { useForm } from 'react-hook-form';
import { FoodFormSchema } from '@foodtrip/types';

export interface FoodFormProps {
  initialData?: Food;
  onSubmit: (data: FoodFormInput) => Promise<void>;
  isLoading?: boolean;
}

export function FoodForm({ initialData, onSubmit, isLoading }: FoodFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData,
    resolver: zodResolver(FoodFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Food name" />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit" disabled={isLoading}>Save</button>
    </form>
  );
}
```

#### Data Table Component

```typescript
// apps/admin/src/features/food/components/FoodTable.tsx
export interface FoodTableProps {
  foods: Food[];
  isLoading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export function FoodTable({ foods, isLoading, onEdit, onDelete }: FoodTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {foods.map(food => (
          <tr key={food.id} className="border-b">
            <td>{food.name}</td>
            <td>${food.price}</td>
            <td>
              <button onClick={() => onEdit(food.id)}>Edit</button>
              <button onClick={() => onDelete(food.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### File Structure

```
apps/admin/src/features/<feature>/
├── hooks/
│   ├── use<Feature>List.ts      (list/pagination query)
│   ├── use<Feature>Detail.ts    (single item query)
│   ├── use<Feature>Create.ts    (create mutation)
│   ├── use<Feature>Update.ts    (update mutation)
│   └── use<Feature>Delete.ts    (delete mutation)
├── components/
│   ├── <Feature>Table.tsx        (data table)
│   ├── <Feature>Form.tsx         (create/edit form)
│   ├── <Feature>Modal.tsx        (modal dialogs)
│   └── <Feature>Card.tsx         (list item card)
├── types/
│   └── index.ts                 (feature-specific types, re-export from packages/types)
└── index.ts                     (barrel export)
```

---

## Development Workflow

### 1. Creating a CRUD Feature

1. Create feature folder: `apps/admin/src/features/<feature>`
2. Add subdirectories: `hooks/`, `components/`, `types/`
3. Create hooks for list/detail/mutations
4. Create components for table/form/modal
5. Create barrel file: `index.ts` exporting all

### 2. List Page with Table

- Use `useFoodList()` hook with pagination/filtering
- Pass data to `FoodTable` component
- Handle loading states with skeleton table
- Include search/filter UI
- Add "Create" and "Edit" actions

### 3. Create/Edit Page with Form

- Use `useFoodDetail(id)` for edit mode (initial data)
- Use `useFoodCreate()` or `useFoodUpdate()` mutation
- Create form with react-hook-form + Zod validation
- Show success/error toast on submit
- Redirect to list on success

### 4. Delete Operations

- Use `useFoodDelete()` mutation
- Confirm with modal before delete
- Invalidate list query on success
- Show error if deletion fails

### 5. Testing

- Unit tests for hooks: `src/features/<name>/hooks/__tests__/*.test.ts`
- Mock API using MSW: `src/mocks/handlers.ts`
- Test CRUD flows (create/read/update/delete)

---

## Common Admin Tasks

### Create a List View

**Location**: `apps/admin/src/pages/FoodListPage.tsx`

```typescript
export function FoodListPage() {
  const { data, isLoading } = useFoodList();
  const { mutate: deleteFood } = useFoodDelete();

  return (
    <div>
      <h1>Food Management</h1>
      <button onClick={() => navigate('/admin/food/create')}>
        + Create Food
      </button>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <FoodTable
          foods={data || []}
          onEdit={(id) => navigate(`/admin/food/${id}`)}
          onDelete={deleteFood}
        />
      )}
    </div>
  );
}
```

### Create/Edit Form Page

**Location**: `apps/admin/src/pages/FoodFormPage.tsx`

```typescript
export function FoodFormPage({ foodId }: { foodId?: string }) {
  const { data } = useFoodDetail(foodId || '');
  const { mutate: createFood, isPending: isCreating } = useFoodCreate();
  const { mutate: updateFood, isPending: isUpdating } = useFoodUpdate();

  const handleSubmit = async (formData: FoodFormInput) => {
    if (foodId) {
      updateFood(formData);
    } else {
      createFood(formData);
    }
  };

  return (
    <FoodForm
      initialData={data}
      onSubmit={handleSubmit}
      isLoading={isCreating || isUpdating}
    />
  );
}
```

### Create a Delete Mutation

**Location**: `apps/admin/src/features/food/hooks/useFoodDelete.ts`

```typescript
export function useFoodDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => foodApi.deleteFood(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'food', 'list'],
      });
    },
    onError: (error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });
}
```

### Add Pagination & Filtering

**Location**: `apps/admin/src/features/food/hooks/useFoodList.ts`

```typescript
interface FoodListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export function useFoodList(params?: FoodListParams) {
  return useQuery({
    queryKey: ['admin', 'food', 'list', params],
    queryFn: () => foodApi.getFoodList(params),
  });
}
```

---

## Key Tools & Commands

```bash
# Development
pnpm dev              # Start admin + client dev servers

# Type checking
pnpm run build        # Check TS errors

# Linting
pnpm lint             # Run ESLint

# Testing (when setup)
pnpm test             # Run unit tests
pnpm test:e2e         # Run Playwright tests
```

---

## Checklist for Admin Feature Development

- [ ] Feature folder created under `apps/admin/src/features/<name>`
- [ ] List hook created with error handling (retry, cache, stale time)
- [ ] Detail hook created with error handling
- [ ] Mutation hooks created (create, update, delete) with toast notifications
- [ ] Table component created with loading skeleton and error states
- [ ] Form component created with react-hook-form + Zod validation
- [ ] Modal/confirmation for destructive actions (delete)
- [ ] Error messages shown inline with retry buttons
- [ ] Loading states use table skeleton components
- [ ] Barrel file (`index.ts`) exports hooks/components
- [ ] No `fetch()` calls anywhere in admin code
- [ ] All API calls go through `packages/api`
- [ ] TypeScript types are strict (no `any`)
- [ ] Page routes added and lazy loaded
- [ ] Toast notifications for success/error/info
- [ ] Protected routes guard admin pages
- [ ] Layout includes sidebar navigation
- [ ] Tested with `pnpm dev` and works

---

## Admin vs Client Differences

| Aspect              | Admin                                 | Client                        |
| ------------------- | ------------------------------------- | ----------------------------- |
| **Focus**           | CRUD, data tables, dashboards         | Browse, search, booking       |
| **Data Operations** | Create, Read, Update, Delete          | Mostly Read + Filter          |
| **Forms**           | Heavy form usage for editing          | Minimal forms                 |
| **Tables**          | Central to UI (list views)            | Less common (lists are cards) |
| **Mutations**       | More create/update/delete             | Mostly bookings               |
| **Query Keys**      | `['admin', 'feature', 'action', ...]` | `['feature', 'action', ...]`  |

---

## Escalation

If you encounter:

- **Complex table features** (sorting, multi-select, bulk actions) → Extract to `packages/ui` reusable components
- **Shared form fields** → Create shared form components in `packages/ui`
- **Cross-feature data** → Use `packages/api` for shared endpoints
- **Global admin state** → Discuss before implementing (use React Context in `providers/`)
