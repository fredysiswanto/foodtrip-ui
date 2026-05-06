# FoodTrip Admin App - Complete Todolist

**Project Status**: Phase 1 partially complete - Auth system live, core foundation in place  
**Target Scope**: Admin App only (CRUD operations, dashboard, monitoring)  
**Organization**: By Priority (Critical → High → Medium → Low)

**Completed in Phase 1**:

- ✅ 1.1 Styling Setup (Tailwind CSS configured)
- ✅ 1.4 Shared UI Components (all base, form, layout, feedback, data display components)
- ✅ 1.5 Core Authentication (login/logout working, tested & verified)
- ✅ 1.6 Layout Components (AdminLayout with navigation, user menu)
- ✅ Part of 1.2 (Auth types with Zod schemas)
- ✅ Part of 1.3 (apiFetch client + auth endpoints)
- ✅ Part of 1.8 (env config with .env.local)
- ✅ Part of 1.9 (localStorage token persistence)
- ✅ Part of 2.1 (Dashboard page with summary cards & quick actions)

**Completed in Phase 2**:

- ✅ 2.4 Restaurant Management Feature (Full CRUD with list, detail, create, edit, delete)

**What's Working**:

- 🎯 Login page with email/password authentication
- 🎯 API integration with live backend (foodtrip-api.panduanqa.blog)
- 🎯 Protected routes - unauthenticated users redirected to /login
- 🎯 User info displayed in header (name, initials)
- 🎯 Logout functionality with state cleanup
- 🎯 Token persistence across page reloads
- 🎯 Sidebar navigation with all features
- 🎯 Error handling in LoginForm
- 🎯 Restaurant Management - List, Create, Edit, Delete with full CRUD
- 🎯 Restaurant forms with validation (Zod)
- 🎯 Modal confirmations for destructive actions
- 🎯 Responsive table display with edit/delete actions

**Next Steps (Recommended)**:

1. **1.7 Error Handling & Loading States** - Toast notifications, error boundaries
2. **2.2-2.3 Food & Trip Management** - Similar CRUD features like restaurants
3. **2.6 Form Validation & Error Messages** - Full validation with toasts and inline errors
4. **2.7 Search & Filter** - Search/filter/sorting on all list pages

---

---

## 🔴 CRITICAL (Phase 1 - Foundation)

Must-complete items needed for MVP. These are foundational and block other features.

### 1.1 Styling Setup

- [done] **Install & configure Tailwind CSS** in admin app
  - Add `tailwindcss`, `postcss`, `autoprefixer` dependencies
  - Create `tailwind.config.js` and `postcss.config.js`
  - Set up global stylesheet with Tailwind directives
  - Configure TypeScript for Tailwind class intellisense
- [done] **Create typography & spacing system** in styles/

### 1.2 Shared Types Package (`packages/types/`)

Define Zod schemas as the single source of truth for data validation.

- [done] **Auth Request/Response types** (`packages/types/auth.ts`):
  - [done] User schema (matches API response structure)
  - [done] LoginRequest schema (email_address, password)
  - [done] LoginResponse schema (error, data, token, message)
  - [done] RefreshTokenRequest schema
  - [done] AuthState schema (user, token, isAuthenticated, isLoading)
  - [done] TokenPayload schema (JWT decoded)
- [ ] **Core entity types**:
  - [ ] Food schema (id, name, description, image, category, price, restaurantId)
  - [ ] Restaurant schema (id, name, address, image, cuisine, rating)
  - [ ] Trip schema (id, name, description, userId, foods[], createdAt)
  - [ ] Category schema (id, name, icon)
- [ ] **API Response types**:
  - [ ] Paginated response wrapper schema
  - [ ] Error response schema
  - [ ] Success response wrapper schema
- [ ] **Request/Query types**:
  - [ ] Pagination params (page, limit, sortBy, order)
  - [ ] Filter params (search, category, status, dateFrom, dateTo)
  - [ ] File upload metadata (name, size, type)
- [done] **Export all types** from `packages/types/index.ts`
  - [done] Barrel export with `export * from './auth'`

### 1.3 Shared API Package (`packages/api/`)

Build the HTTP client layer (single source for all backend communication).

- [done] **Create API client** (`packages/api/client.ts`):
  - [done] Create `apiFetch` wrapper with:
    - [done] Base URL configuration (from env: VITE_API_URL)
    - [done] Authorization header injection (Bearer token from localStorage)
    - [done] Error handling & response validation (with Zod)
    - [ ] Timeout handling (30s default)
    - [ ] Request/response logging (dev only)
  - [done] Create error class for API errors (ApiError with code, message, status, details)
  - [done] Create response validation (validateWith Zod)
  - [ ] Create error interceptor with:
    - [ ] 401 handling (token refresh or logout)
    - [ ] 403 handling (permission denied)
    - [ ] 4xx/5xx handling (user-friendly error messages)
    - [ ] Network error handling (no internet, timeout)
  - [ ] Create request retry logic (max 3 retries for GET requests)
- [done] **Define endpoint modules**:
  - [done] `authApi.ts` — login, logout, getCurrentUser
  - [ ] `food.ts` — list, detail, create, update, delete (with search/filter)
  - [ ] `trip.ts` — list, detail, create, update, delete, addFood, removeFood
  - [ ] `restaurant.ts` — list, detail, search
  - [ ] `category.ts` — list
  - [ ] `upload.ts` — uploadImage (returns image URL), uploadFile
- [done] **Export everything** from `packages/api/index.ts`
  - [done] Exports: authApi, apiFetch, ApiError

### 1.4 Shared UI Components (`packages/ui/`)

Build reusable, accessible UI building blocks.

**Layout Components:**

- [done] `Container` — max-width wrapper
- [done] `Grid` — responsive grid layout
- [done] `Stack` (Flex) — VStack, HStack for spacing

**Form Components:**

- [done] `Input` — text input with validation state
- [done] `Textarea` — multi-line input
- [done] `Select` — dropdown select
- [done] `Checkbox` — checkbox input
- [done] `Radio` — radio group
- [done] `Label` — form label
- [done] `FormField` — wrapper with label + error message + hint text (implemented via Input/Textarea/etc)
- [done] `FormError` — error message display
- [done] `FormGroup` — wrapper for related form fields (layout)
- [done] `FileInput` — file upload with preview & validation
- [done] `DateInput` — date picker input
- [done] `NumberInput` — number input with increment/decrement

**UI Components:**

- [done] `Button` — primary, secondary, danger variants + loading state + sizes
- [done] `Card` — container with border & shadow
- [done] `Badge` — small label/tag component
- [done] `Modal` — dialog with overlay (with confirm/cancel actions)
- [done] `Breadcrumb` — navigation breadcrumbs
- [done] `Pagination` — page navigation (prev/next + page numbers)
- [done] `Spinner` — loading indicator
- [done] `Toast` — notification message (success, error, warning, info)
- [done] `Alert` — dismissible alert box
- [done] `Tooltip` — hover info

**Data Display:**

- [done] `Table` — sortable table with pagination support
- [done] `Tabs` — tab navigation

All components export TypeScript interfaces for props.

### 1.5 Core Authentication Feature

- [done] **Create `features/auth/` structure**:
  - [done] `hooks/useLogin.ts` — login mutation (React Query) with error handling
  - [done] `hooks/useAuth.ts` — auth context consumer hook
  - [done] `hooks/useLogout.ts` — logout mutation with state reset
  - [ ] `hooks/useRefreshToken.ts` — token refresh (for 401 handling)
  - [done] `components/LoginForm.tsx` — login UI with email/password inputs, validation
  - [done] `components/ProtectedRoute.tsx` — route guard component
  - [done] `types/index.ts` — auth-specific types (barrel export from packages/types)
- [done] **Create Auth Provider** (`features/auth/context/AuthContext.tsx`):
  - [done] `AuthProvider` wrapper (manages auth state globally)
  - [done] `useAuth()` hook for auth state access (user, isAuthenticated, isLoading)
  - [done] localStorage persistence strategy (token + user data)
  - [ ] Auto-refresh token on app load (if token expired)
  - [ ] Intercept 401 responses and trigger logout
  - [done] Store token using localStorage (from 1.9)
- [done] **Create ProtectedRoute component** — redirect to /login if not authenticated
- [done] **Create LoginPage** in `pages/LoginPage.tsx`:
  - [done] Renders LoginForm component
  - [done] Redirect to /dashboard if already authenticated
  - [done] Show loading state during login
  - [done] Handle login errors gracefully
- [done] **Route protection setup** in `routes.tsx`:
  - [done] /login route (public)
  - [done] Nested routes under / with AdminLayout
  - [done] All admin routes wrapped with ProtectedRoute
  - [done] Lazy loading with Suspense boundaries
  - [done] LoadingFallback component for transitions

### 1.6 Layout Components

- [done] **Create AdminLayout** component:
  - [done] Sidebar navigation (menu items with emoji icons)
  - [done] Top header bar (logo, user menu, hamburger toggle)
  - [done] Main content area with Outlet for nested routes
  - [done] Responsive on mobile (collapsible sidebar with smooth transition)
- [done] **Create navigation structure**:
  - [done] Dashboard link (📊)
  - [done] Food management link (🍔)
  - [done] Trip management link (✈️)
  - [done] Restaurant management link (🏪)
  - [done] User management link (👥)
- [done] **Create user menu dropdown** in header:
  - [done] Shows user initials & full name
  - [done] Profile & Settings buttons
  - [done] Logout button with redirect to login
  - [done] Integrates with useAuth() & useLogout() hooks

### 1.7 Error Handling & Loading States (Global)

- [ ] **Create error boundary component** — catch & display errors gracefully
- [ ] **Create global error toast notification** — show API errors to user
- [ ] **Create loading overlay** — for full-page loading states
- [ ] **Create skeletons** for all list/detail pages (table, card, form)
- [ ] **Create Toast notification system**:
  - [ ] Toast provider & context
  - [ ] useToast hook
  - [ ] Show success/error/warning/info toasts from anywhere

### 1.8 Environment Configuration

- [partial] **Create `.env.example`** with required variables:
  - [ ] Create file with template variables
  - [ ] `VITE_API_URL` — backend API URL
  - [ ] `VITE_API_TIMEOUT` — request timeout in ms
  - [ ] `VITE_ENV` — development/staging/production
- [ ] **Create config utility** in `packages/utils`:
  - [ ] Read and validate env variables
  - [ ] Export typed config object
  - [ ] Throw error on missing required vars
- [done] **Create `.env.local`** for local development
  - [done] Set VITE_API_URL to https://foodtrip-api.panduanqa.blog/api/v1

### 1.9 Auth Token Persistence Strategy

- [done] **Define token storage method**:
  - [done] ✅ **Decision**: localStorage (practical for web admin, can upgrade to httpOnly later)
  - [ ] Create `tokenManager` utility with get/set/remove/isExpired methods
  - [ ] Handle token refresh flow: 401 response → try refresh → retry request
  - [done] Clear token on logout
- [done] **Implement in AuthProvider** (`features/auth/context/AuthContext.tsx`):
  - [done] Token persisted to localStorage (key: `auth_token`)
  - [done] User data persisted to localStorage (key: `auth_user`)
  - [done] Token cleared on logout
  - [done] Auto-initialize auth state from localStorage on mount
  - [ ] Auto-refresh token on app load (if expired)
  - [ ] Handle 401 responses to trigger logout

### 1.10 Shared Utilities (`packages/utils/`)

- [ ] **Formatting utilities**:
  - [ ] formatPrice (currency formatting)
  - [ ] formatDate (date formatting)
  - [ ] formatTime (time formatting)
  - [ ] truncateString (with ellipsis)
- [ ] **Form utilities**:
  - [ ] debounce (for search, API calls)
  - [ ] validateEmail
  - [ ] validatePassword (strength)
- [ ] **API utilities**:
  - [ ] getErrorMessage (extract user-friendly error from API response)
  - [ ] isNetworkError
- [ ] **Array/Object utilities**:
  - [ ] groupBy
  - [ ] unique
  - [ ] sortBy
- [ ] **Constants**:
  - [ ] API status codes
  - [ ] Pagination defaults (page size, max items)
  - [ ] Date/time formats
- [ ] **Export everything** from `packages/utils/index.ts`

---

## 🟠 HIGH (Phase 2 - Core Features)

Core CRUD features that make the admin panel functional.

### 2.1 Dashboard Page

- [partial] **Create DashboardPage** in `pages/`
  - [done] Summary cards: Total foods, Total trips, Total restaurants, Total users (hardcoded values)
  - [done] Quick action buttons (link to create pages)
  - [ ] Recent activities/operations list (placeholder only)
  - [ ] Basic stats/charts (optional for MVP)
- [ ] **Create dashboard hooks** (React Query hooks for summary data)
  - [ ] Hook to fetch summary statistics
- [done] **Route**: `/dashboard` (default after login)

### 2.2 Food Management Feature

- [ ] **Create `features/food/` structure**:
  - [ ] `hooks/useFoodList.ts` — list foods (with search/filter/pagination)
  - [ ] `hooks/useFoodDetail.ts` — fetch single food
  - [ ] `hooks/useCreateFood.ts` — create food mutation
  - [ ] `hooks/useUpdateFood.ts` — update food mutation
  - [ ] `hooks/useDeleteFood.ts` — delete food mutation
  - [ ] `components/FoodForm.tsx` — form for create/edit
  - [ ] `components/FoodTable.tsx` — list display
  - [ ] `components/FoodCard.tsx` — detail card
  - [ ] `types/index.ts` — food-specific types
- [ ] **Create pages**:
  - [ ] `pages/FoodListPage.tsx` — list with search, filter, pagination, actions (edit/delete)
  - [ ] `pages/FoodDetailPage.tsx` — detail view + edit form
  - [ ] `pages/CreateFoodPage.tsx` — create form
- [ ] **Routes**: `/foods`, `/foods/:id`, `/foods/new`

### 2.3 Trip Management Feature

- [ ] **Create `features/trip/` structure** (same pattern as food):
  - [ ] Hooks: useTripList, useTripDetail, useCreateTrip, useUpdateTrip, useDeleteTrip
  - [ ] Components: TripForm, TripTable, TripCard
- [ ] **Create pages**:
  - [ ] `pages/TripListPage.tsx` — list view
  - [ ] `pages/TripDetailPage.tsx` — detail + edit
  - [ ] `pages/CreateTripPage.tsx` — create
- [ ] **Routes**: `/trips`, `/trips/:id`, `/trips/new`

### 2.4 Restaurant Management Feature

- [done] **Create `features/restaurant/` structure** (same pattern as food):
  - [done] Hooks: useRestaurantList, useRestaurantDetail, useCreateRestaurant, useUpdateRestaurant, useDeleteRestaurant
  - [done] Components: RestaurantForm, RestaurantTable, RestaurantCard
- [done] **Create pages**:
  - [done] `pages/RestaurantListPage.tsx` — list with delete modal
  - [done] `pages/RestaurantDetailPage.tsx` — detail + edit form
  - [done] `pages/RestaurantCreatePage.tsx` — create form
- [done] **Routes**: `/restaurants`, `/restaurants/new`, `/restaurants/:id`

### 2.5 User Management (Optional)

- [ ] **Create `features/user/` structure**:
  - [ ] Hooks: useUserList, useUserDetail, useUpdateUser, useDeleteUser
  - [ ] Components: UserTable, UserForm
- [ ] **Create pages**:
  - [ ] `pages/UserListPage.tsx` — manage users, assign roles
  - [ ] `pages/UserDetailPage.tsx`
- [ ] **Routes**: `/users`, `/users/:id`

### 2.6 Validation & Error Messages

- [ ] Add **form validation** (Zod schemas in form components)
- [ ] Add **inline error messages** on form fields
- [ ] Add **toast notifications** for success/error on mutations
- [ ] Add **confirmation dialogs** for delete operations

### 2.7 Search & Filter (All List Pages)

- [ ] Implement **search input** for all list pages
- [ ] Implement **filter dropdowns** (by category, status, etc.)
- [ ] Implement **sorting** (by name, date, etc.)
- [ ] Persist filters in **URL params** (for bookmarkable searches)

---

## 🟡 MEDIUM (Phase 3 - Enhancements)

Quality-of-life improvements and advanced features.

### 3.1 Advanced Features

- [ ] **Bulk operations** — select multiple items, delete/update in batch
- [ ] **Export to CSV** — export lists to CSV file
- [ ] **Import from CSV** — bulk import items
- [ ] **Advanced filtering** — multi-criteria filters (date range, price range, etc.)

### 3.2 Notifications

- [ ] **Toast notifications** — success, error, warning, info types
- [ ] **Confirmation dialogs** — before destructive actions
- [ ] **Loading skeleton** — while data fetches

### 3.3 Performance

- [ ] Implement **pagination** on all list pages (50 items per page default)
- [ ] Implement **lazy loading** for modal/detail pages
- [ ] Add **debounced search** (300ms delay)
- [ ] Add **request caching** via React Query stale time

### 3.4 UX Polish

- [ ] **Dark mode support** (optional Tailwind dark class)
- [ ] **Responsive design** — mobile-friendly layouts
- [ ] **Loading states** — show spinners/skeletons while data loads
- [ ] **Empty states** — friendly messages when no data
- [ ] **Success feedback** — show success toasts on mutations

### 3.5 Analytics/Monitoring (Optional)

- [ ] Add **dashboard charts** (food count by category, trips by user, etc.)
- [ ] Add **activity log** page (recent operations)
- [ ] Add **user statistics** page

---

## 🔵 LOW (Phase 4 - Polish)

Optional nice-to-have features.

### 4.1 Animations & Transitions

- [ ] Add **page transitions** (fade-in on route change)
- [ ] Add **button hover effects**
- [ ] Add **modal animations** (slide-in)
- [ ] Add **loading spinners** with animations

### 4.2 PWA Features (Optional)

- [ ] Add **manifest.json** for PWA
- [ ] Add **service worker** for offline support
- [ ] Add **install prompt**

### 4.3 Testing

- [ ] Add **unit tests** for hooks (React Testing Library)
- [ ] Add **E2E tests** for critical flows (Playwright)
- [ ] Add **API mocking** with MSW for testing

### 4.4 Documentation

- [ ] Write **README** with setup instructions
- [ ] Document **API layer** usage
- [ ] Document **feature structure** for new developers

### 4.5 Accessibility

- [ ] Add **ARIA labels** where needed
- [ ] Ensure **keyboard navigation** works
- [ ] Test **color contrast** for WCAG compliance
- [ ] Add **focus indicators** for keyboard users

---

## 📋 Recommended Implementation Order

### **Phase 1 Breakdown (Foundation - Week 1-2)**

**Day 1-2: Setup & Configuration**

- 1.1 Tailwind CSS setup
- 1.8 Environment configuration (.env.example, config utility)
- 1.10 Shared utilities (debounce, formatters, validators)

**Day 3-4: Types & API Foundation**

- 1.2 Shared types (all Zod schemas)
- 1.9 Auth token persistence strategy

**Day 5-6: API Client**

- 1.3 Shared API package (apiFetch, error handling, endpoints, upload)

**Day 7-8: UI Components (Part 1)**

- 1.4 UI components (Button, Card, Input, Select, Modal, Toast, etc.)
- 1.7 Error handling & loading states

**Day 9: UI Components (Part 2)**

- 1.4 Form components (FileInput, DateInput, FormGroup)

**Day 10: Authentication & Layout**

- 1.5 Core authentication feature
- 1.6 Admin layout component

### **Phase 2 (Core Features - Week 3)**

- Dashboard page
- Food management (CRUD)
- Trip management (CRUD)
- Restaurant management (CRUD)

### **Phase 3 (Enhancements - Week 4)**

- Search/filter/pagination
- Form validation & error messages
- Advanced features (bulk ops, export, etc.)

### **Phase 4 (Polish & Testing - Week 5+)**

- Unit tests
- E2E tests
- Animations
- Documentation

---

## 💡 Key Checkpoints for Success

- ✅ **TypeScript strict mode** — no `any` types
- ✅ **API isolation** — all API calls through `packages/api`
- ✅ **Feature isolation** — no cross-feature imports
- ✅ **React Query** — used for all server state
- ✅ **Custom hooks** — all logic in hooks, not components
- ✅ **Error handling** — user-friendly error messages (no raw backend errors)
- ✅ **Loading states** — never show blank screens
- ✅ **Form validation** — Zod schemas for all forms

---

## 🔗 Key Files to Create

**Root & Configuration**:

- `.env.example` — template for environment variables
- `.env.local` — local dev environment (git ignored)

**Packages** (foundation):

- `packages/types/schemas/` — all Zod schemas (user.ts, food.ts, trip.ts, auth.ts, etc.)
- `packages/utils/format.ts` — formatPrice, formatDate, truncateString
- `packages/utils/validation.ts` — validateEmail, validatePassword
- `packages/utils/api.ts` — getErrorMessage, isNetworkError
- `packages/utils/debounce.ts` — debounce function
- `packages/utils/constants.ts` — API codes, defaults, formats
- `packages/utils/config.ts` — read & validate env variables
- `packages/utils/tokenManager.ts` — get/set/remove/isExpired token logic
- `packages/api/client.ts` — apiFetch wrapper with interceptors
- `packages/api/errors.ts` — API error class
- `packages/api/endpoints/auth.ts` — login, logout, getCurrentUser, refreshToken
- `packages/api/endpoints/food.ts` — list, detail, create, update, delete
- `packages/api/endpoints/trip.ts` — list, detail, create, update, delete
- `packages/api/endpoints/restaurant.ts` — list, detail, search
- `packages/api/endpoints/category.ts` — list
- `packages/api/endpoints/upload.ts` — uploadImage, uploadFile
- `packages/ui/components/Button.tsx` — button component
- `packages/ui/components/Card.tsx` — card component
- `packages/ui/components/Input.tsx` — text input
- `packages/ui/components/FileInput.tsx` — file upload with preview
- `packages/ui/components/DateInput.tsx` — date picker
- `packages/ui/components/Modal.tsx` — dialog/modal
- `packages/ui/components/Toast.tsx` — toast notifications
- `packages/ui/components/Skeleton.tsx` — loading skeleton
- `packages/ui/components/FormField.tsx` — label + input + error wrapper

**Admin App** (features):

- `apps/admin/src/features/auth/hooks/useLogin.ts` — login mutation
- `apps/admin/src/features/auth/hooks/useAuth.ts` — global auth state
- `apps/admin/src/features/auth/hooks/useLogout.ts` — logout mutation
- `apps/admin/src/features/auth/components/LoginForm.tsx` — login UI
- `apps/admin/src/features/food/hooks/` — useFoodList, useFoodDetail, useCreateFood, etc.
- `apps/admin/src/features/food/components/` — FoodForm, FoodTable, FoodCard
- `apps/admin/src/features/trip/` — trip feature (same pattern as food)
- `apps/admin/src/features/restaurant/` — restaurant feature (same pattern as food)
- `apps/admin/src/features/user/` — user feature (same pattern as food)
- `apps/admin/src/layouts/AdminLayout.tsx` — sidebar + header layout
- `apps/admin/src/providers/AuthProvider.tsx` — auth context & provider
- `apps/admin/src/providers/ToastProvider.tsx` — toast context & provider
- `apps/admin/src/pages/LoginPage.tsx` — login page
- `apps/admin/src/pages/DashboardPage.tsx` — dashboard
- `apps/admin/src/pages/Food*.tsx` — food list/detail/create pages
- `apps/admin/src/pages/Trip*.tsx` — trip list/detail/create pages
- `apps/admin/src/pages/Restaurant*.tsx` — restaurant list/detail/create pages
- `apps/admin/src/styles/global.css` — Tailwind directives + custom styles
- `apps/admin/src/app/routes.tsx` — route definitions (updated)
