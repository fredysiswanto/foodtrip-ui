# Role-Based Admin Architecture - Implementation Guide

## Overview

The FoodTrip admin system now supports two distinct roles with separate feature sets and access scopes:

- **System Admin** (`/admin/*`): Global access to all restaurants, dishes, categories, users, and orders
- **Restaurant Admin** (`/restaurant-admin/*`): Scoped access to manage a single restaurant

---

## Architecture Layers

### 1. API Layer (`packages/api/`)

**New separation:**

- `admin.ts` - System admin endpoints (read-only, global scope)
- `restaurantAdmin.ts` - Restaurant admin endpoints (CRUD operations, scoped to restaurant)
- `client.ts` - Shared base API utilities

**Usage:**

```typescript
// System Admin API
import { adminRestaurantApi, adminDishApi, adminUserApi } from '@foodtrip/api';

// Restaurant Admin API
import {
  restaurantAdminDishApi,
  restaurantAdminOrderApi,
  restaurantAdminRestaurantApi,
} from '@foodtrip/api';
```

---

## Feature Structure

### System Admin (`apps/admin/src/features/admin/`)

**Purpose:** Dashboard, overview, and monitoring

**Hooks available:**

- `useAdminRestaurantsList()` - List all restaurants
- `useAdminDishesList()` - List all dishes
- `useAdminRestoAdminsList()` - List all restaurant admins
- `useAdminCustomersList()` - List all customers
- `useAdminAdminsList()` - List all system admins
- `useAdminRestaurantDetail(id)` - Get single restaurant
- `useAdminRestoAdminDetail(id)` - Get single resto admin user
- `useAdminCustomerDetail(id)` - Get single customer
- `useAdminAdminDetail(id)` - Get single admin user

**File structure:**

```
features/admin/
├── hooks/
│   └── useAdminDashboard.ts
└── index.ts
```

### Restaurant Admin (`apps/admin/src/features/restaurant-admin/`)

**Purpose:** Menu management, order fulfillment, restaurant operations

**Hooks available:**

**Menu Management:**

- `useRestaurantAdminMenuList()` - List own restaurant's dishes
- `useRestaurantAdminDishCategories()` - List all dish categories
- `useRestaurantAdminDishDetail(dishId)` - Get dish detail
- `useRestaurantAdminCreateDish()` - Create new dish
- `useRestaurantAdminUpdateDish(dishId)` - Update dish
- `useRestaurantAdminDeleteDish()` - Delete dish

**Order Management:**

- `useRestaurantAdminOrdersList()` - List orders
- `useRestaurantAdminOrderDetail(orderId)` - Get order detail
- `useRestaurantAdminSetOrderInProcess()` - Change status → In Process
- `useRestaurantAdminSetOrderOnTheWay()` - Change status → On The Way
- `useRestaurantAdminSetOrderDelivered()` - Change status → Delivered
- `useRestaurantAdminSetOrderRejected()` - Change status → Rejected
- `useRestaurantAdminSetOrderCancelled()` - Change status → Cancelled

**Restaurant Info:**

- `useRestaurantAdminOwnRestaurant()` - Get own restaurant info
- `useRestaurantAdminUpdateRestaurant()` - Update own restaurant
- `useRestaurantAdminAccountInfo()` - Get account info
- `useRestaurantAdminUpdateAccountInfo()` - Update account info
- `useRestaurantAdminVerifyPassword()` - Verify password
- `useRestaurantAdminUpdatePassword()` - Change password

**File structure:**

```
features/restaurant-admin/
├── hooks/
│   ├── useRestaurantAdminMenu.ts
│   ├── useRestaurantAdminOrders.ts
│   └── useRestaurantAdminInfo.ts
└── index.ts
```

---

## Authentication & Authorization

### Auth Context

The auth context stores:

```typescript
interface User {
  user_id: string;
  email_address: string;
  user_type: 'Admin' | 'Resto_Admin';
  resto_id?: string; // Only for Resto_Admin
  // ... other fields
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

### Role Guards

**RoleGuard Component** - Conditionally render based on role:

```typescript
import { RoleGuard, ADMIN_ROLES } from '@foodtrip/auth';

<RoleGuard requiredRole={ADMIN_ROLES.ADMIN}>
  <AdminDashboard />
</RoleGuard>

// Multiple roles
<RoleGuard requiredRole={[ADMIN_ROLES.ADMIN, ADMIN_ROLES.RESTO_ADMIN]}>
  <Content />
</RoleGuard>
```

**Role Utilities:**

```typescript
import { hasRole, isSuperAdmin, isRestoAdmin } from '@foodtrip/auth';

if (isSuperAdmin(user)) {
  // Show admin-only features
}
```

---

## Routing

### Route Structure

```
/admin/*                    → System Admin Routes
  ├── /admin/dashboard      → Admin Dashboard
  ├── /admin/restaurants    → Restaurant List (all)
  ├── /admin/dishes         → Dish List (all)
  ├── /admin/users          → User Management
  └── ...

/restaurant-admin/*         → Restaurant Admin Routes
  ├── /restaurant-admin/dashboard      → Restaurant Dashboard
  ├── /restaurant-admin/menu           → Menu Management (CRUD dishes)
  ├── /restaurant-admin/orders         → Order Management
  ├── /restaurant-admin/opening-hours  → Opening Hours
  ├── /restaurant-admin/info           → Restaurant Info
  └── /restaurant-admin/account        → Account Settings
```

### Protected Routes

Both role paths are protected:

```typescript
<ProtectedRoute>
  <RoleGuard requiredRole={ADMIN_ROLES.ADMIN}>
    <AdminLayout>
      {/* Admin routes */}
    </AdminLayout>
  </RoleGuard>
</ProtectedRoute>

<ProtectedRoute>
  <RoleGuard requiredRole={ADMIN_ROLES.RESTO_ADMIN}>
    <RestaurantAdminLayout>
      {/* Restaurant admin routes */}
    </RestaurantAdminLayout>
  </RoleGuard>
</ProtectedRoute>
```

---

## Navigation

### System Admin Navigation (`navigationAdmin`)

```typescript
[
  { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
  { label: 'Dishes', path: '/admin/dishes', icon: '🍽️' },
  { label: 'Restaurants', path: '/admin/restaurants', icon: '🏪' },
  { label: 'Users', path: '/admin/users', icon: '👤' },
  // ...
];
```

### Restaurant Admin Navigation (`navigationRestaurantAdmin`)

```typescript
[
  { label: 'Dashboard', path: '/restaurant-admin/dashboard', icon: '📊' },
  { label: 'Menu Management', path: '/restaurant-admin/menu', icon: '🍽️' },
  { label: 'Orders', path: '/restaurant-admin/orders', icon: '📦' },
  {
    label: 'Opening Hours',
    path: '/restaurant-admin/opening-hours',
    icon: '⏰',
  },
  // ...
];
```

---

## Query Key Convention

Query keys follow role-based pattern:

**System Admin:**

```typescript
// List queries
['admin', 'restaurants', 'list', page, limit][
  ('admin', 'dishes', 'list', page, limit)
][('admin', 'users', 'resto-admin', 'list', page, limit)][
  // Detail queries
  ('admin', 'restaurant', 'detail', restaurantId)
][('admin', 'user', 'resto-admin', 'detail', userId)];
```

**Restaurant Admin:**

```typescript
// Scoped to restaurant
['restaurant-admin', 'menu', 'list', restaurantId, page, limit][
  ('restaurant-admin', 'orders', 'list', page, limit)
][('restaurant-admin', 'restaurant', 'own', restaurantId)];
```

---

## Example: System Admin Flow

### List All Restaurants

```typescript
import { useAdminRestaurantsList } from '@foodtrip/admin';

export function AdminRestaurantListPage() {
  const { data: restaurants, isLoading } = useAdminRestaurantsList(1, 10);

  return (
    <div>
      <h1>All Restaurants</h1>
      {isLoading ? (
        <Skeleton />
      ) : (
        <RestaurantTable restaurants={restaurants} />
      )}
    </div>
  );
}
```

---

## Example: Restaurant Admin Flow

### List Own Menu

```typescript
import { useRestaurantAdminMenuList } from '@foodtrip/restaurant-admin';

export function RestaurantAdminMenuPage() {
  const { data: dishes, isLoading } = useRestaurantAdminMenuList(1, 10);
  const { mutate: deleteDish } = useRestaurantAdminDeleteDish();

  return (
    <div>
      <h1>Menu Management</h1>
      {isLoading ? (
        <Skeleton />
      ) : (
        <DishTable
          dishes={dishes}
          onDelete={(id) => deleteDish(id)}
        />
      )}
    </div>
  );
}
```

### Manage Order Status

```typescript
import { useRestaurantAdminOrdersList, useRestaurantAdminSetOrderInProcess } from '@foodtrip/restaurant-admin';

export function RestaurantAdminOrdersPage() {
  const { data: orders } = useRestaurantAdminOrdersList(1, 10);
  const { mutate: setInProcess, isPending } = useRestaurantAdminSetOrderInProcess();

  const handleMarkAsInProcess = (orderId: string) => {
    setInProcess(orderId, {
      onSuccess: () => {
        toast({ type: 'success', message: 'Order status updated' });
      },
    });
  };

  return (
    <div>
      <h1>Orders</h1>
      <OrderTable
        orders={orders}
        onMarkAsInProcess={handleMarkAsInProcess}
      />
    </div>
  );
}
```

---

## Server-Side Enforcement (Critical!)

All endpoints must be protected at the backend:

```typescript
// Pseudo-code: Backend validation example

@RouteGuard('Resto_Admin')
@Post('/resto-admin/dish/:dishId')
updateDish(req, res) {
  // Verify:
  1. User is authenticated (token valid)
  2. User role is 'Resto_Admin'
  3. Dish belongs to user's restaurant
  4. User's restaurantId matches dish.restaurantId

  // Only then allow update
}
```

---

## Next Steps for Implementation

1. **Update Routes** (`apps/admin/src/app/routes.tsx`)
   - Add `/admin/*` routes with RoleGuard
   - Add `/restaurant-admin/*` routes with RoleGuard
   - Use RestaurantAdminLayout for resto admin routes

2. **Create Pages**
   - Admin: Dashboard, Restaurant List, User Management
   - Restaurant Admin: Dashboard, Menu, Orders, Opening Hours, Account

3. **Create Components**
   - Reuse existing components from `packages/ui`
   - Create role-specific components in respective features

4. **Testing**
   - Test role-based access with both user types
   - Verify API calls use correct endpoints
   - Test invalidation patterns on mutations

---

## Checklist for Complete Implementation

- [ ] Routes updated with role-based structure
- [ ] Admin pages created (Dashboard, Restaurants, Users)
- [ ] Restaurant Admin pages created (Menu, Orders, Info, Account)
- [ ] All hooks integrated into pages
- [ ] RoleGuard applied to all protected routes
- [ ] Navigation updated based on role
- [ ] Mutations invalidate correct query keys
- [ ] Error handling for role mismatches
- [ ] Loading states implemented
- [ ] Tested with both admin and resto-admin users
