# FoodTrip Copilot Hook: Quick Start

## What Your Hook Does

The `foodtrip-context-injector` hook ensures your copilot agent stays relevant to your FoodTrip project by:

### 1. **Session Start** — Injects Context

When you start a new chat, the agent automatically loads:

- ✅ Your monorepo structure (admin, client apps)
- ✅ All features (restaurant, dish, user, etc.)
- ✅ Shared packages (api, types, ui, utils)
- ✅ Query key naming patterns
- ✅ Architecture rules reminders

### 2. **Pre-Tool Use** — Validates Actions

Before executing any tool, the hook checks:

- ❌ **Feature Isolation** — No cross-feature imports
- ❌ **React Query Only** — Never useEffect for fetching
- ❌ **No Direct Fetch** — All API calls through packages/api
- ❌ **Strict Types** — No `any` types allowed
- ❌ **API Isolation** — No API calls in components
- ❌ **Presentational Components** — Components shouldn't have business logic

## How to Use

### 1. Activate the Hook

In VS Code, the hook is already referenced in your agent. To activate it:

```bash
# Option A: Clear cache and restart
Cmd+Shift+P → "Copilot: Clear Cache" → Restart VS Code

# Option B: Just open a new chat window
Start a new Copilot Chat session
```

### 2. See It In Action

Try these prompts and watch the agent apply project context:

**Planning**

```
Plan the User Management feature following Restaurant CRUD pattern
```

**Implementation**

```
Create the useDishList hook with pagination
```

**Validation**

```
Review this code for architecture violations
```

**Debugging**

```
Why is this React Query hook refetching on every render?
```

## Hook Rules Explained

### Rule 1: Feature Isolation

```typescript
// ❌ NOT ALLOWED
import { useRestaurant } from '../restaurant/hooks';

// ✅ CORRECT
// Share via packages/types or packages/utils
import { RestaurantSchema } from '@foodtrip/types';
```

### Rule 2: React Query Only

```typescript
// ❌ NOT ALLOWED
useEffect(() => {
  fetch('/api/dishes').then(setData);
}, []);

// ✅ CORRECT
const { data } = useQuery({
  queryKey: ['admin', 'dish', 'list'],
  queryFn: () => dishApi.getList(),
});
```

### Rule 3: No Direct API Calls

```typescript
// ❌ NOT ALLOWED (in components)
export function DishList() {
  const [data, setData] = useState([]);
  // API call here...
}

// ✅ CORRECT (hook in features/)
export function useDishList() {
  return useQuery({
    queryKey: ['admin', 'dish', 'list'],
    queryFn: () => dishApi.getList(),
  });
}

// Component just uses the hook
export function DishList() {
  const { data } = useDishList();
}
```

### Rule 4: Strict Types

```typescript
// ❌ NOT ALLOWED
const data: any = response;

// ✅ CORRECT
const data = DishSchema.parse(response);
```

### Rule 5: API Isolation

```typescript
// ❌ NOT ALLOWED (direct fetch in component)
export function DishForm() {
  const submit = async (data) => {
    await fetch('/api/dishes', { ... });
  };
}

// ✅ CORRECT (via packages/api)
export function useCreateDish() {
  return useMutation({
    mutationFn: (data) => dishApi.create(data),
  });
}
```

### Rule 6: Presentational Components

```typescript
// ❌ NOT ALLOWED
export function DishTable({ categoryId }) {
  const { data } = useDishList(); // Query logic in component
}

// ✅ CORRECT
export function DishTable({ dishes, loading, error }) {
  // Just render props
  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage />;
  return <table>...</table>;
}

// Query logic at page level
export function DishListPage() {
  const { data: dishes, isLoading } = useDishList();
  return <DishTable dishes={dishes} loading={isLoading} />;
}
```

## Testing the Hook

### Verify Hook is Active

```bash
# Check if hook file is valid JSON
jq . .github/hooks/foodtrip-context.json

# Check if agent references it
grep "foodtrip-context" .github/agents/local.agent.md

# Run full validation
bash .github/hooks/validate.sh
```

### Test Specific Rules

1. **Ask about violations** — Agent should warn you

   ```
   Review this code for feature isolation issues:
   import { useRestaurant } from '../restaurant/hooks';
   ```

2. **Ask for patterns** — Agent should use correct patterns

   ```
   Create a new API endpoint for user management
   ```

3. **Ask for refactoring** — Agent should apply rules
   ```
   Refactor this component to use React Query instead of useEffect
   ```

## Troubleshooting

### Hook Not Applying

**Problem**: Agent doesn't seem to know about your project
**Solution**:

1. Run: `jq . .github/hooks/foodtrip-context.json` (check JSON is valid)
2. Run: `bash .github/hooks/validate.sh` (full validation)
3. Clear cache: `Cmd+Shift+P` → "Copilot: Clear Cache"
4. Restart VS Code
5. Open new chat window

### Rules Not Enforced

**Problem**: Agent suggests violations
**Solution**:

1. Check rule severity in `foodtrip-context.json`
2. Update rule patterns if needed
3. Clear cache and restart
4. Try again in a fresh chat

### Context Not Injected

**Problem**: Agent doesn't know about your apps/features
**Solution**:

1. Verify hook `onSessionStart.injectContext` is populated
2. Check that apps/features directories exist
3. Run validation script
4. Clear cache and restart

## Next Steps

1. ✅ Hook created and validated
2. ✅ Agent configured to use hook
3. ⬜ Clear VS Code cache and restart
4. ⬜ Start a new chat to see context injection
5. ⬜ Test with example prompts above

## Advanced: Customizing the Hook

To add more rules or context:

1. Edit `.github/hooks/foodtrip-context.json`
2. Add rules to the `rules` array
3. Update `projectContext` with new features
4. Run: `bash .github/hooks/validate.sh`
5. Clear cache and restart VS Code

## Learn More

- [Hook Configuration](README.md)
- [Local Agent Setup](../agents/local.agent.md)
- [Project Instructions](../copilot-instructions.md)
