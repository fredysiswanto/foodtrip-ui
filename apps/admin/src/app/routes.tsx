import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute, RoleGuard } from '../features/auth';
import { AdminLayout, RestaurantAdminLayout } from '../layouts';
import { USER_ROLES } from '../features/auth/roles';

// Lazy load pages for better performance
const LoginPage = lazy(() =>
  import('../pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

const RestaurantListPage = lazy(() =>
  import('../features/restaurant/pages/RestaurantListPage').then((m) => ({
    default: m.RestaurantListPage,
  }))
);

const RestaurantDetailPage = lazy(() =>
  import('../features/restaurant/pages/RestaurantDetailPage').then((m) => ({
    default: m.RestaurantDetailPage,
  }))
);

const RestaurantCreatePage = lazy(() =>
  import('../features/restaurant/pages/RestaurantCreatePage').then((m) => ({
    default: m.RestaurantCreatePage,
  }))
);

const DishListPage = lazy(() =>
  import('../features/dish/pages/DishListPage').then((m) => ({
    default: m.DishListPage,
  }))
);

const DishCreatePage = lazy(() =>
  import('../features/dish/pages/DishCreatePage').then((m) => ({
    default: m.DishCreatePage,
  }))
);

const DishDetailPage = lazy(() =>
  import('../features/dish/pages/DishDetailPage').then((m) => ({
    default: m.DishDetailPage,
  }))
);

const DishEditPage = lazy(() =>
  import('../features/dish/pages/DishEditPage').then((m) => ({
    default: m.DishEditPage,
  }))
);

const RestaurantCategoryListPage = lazy(() =>
  import('../pages/RestaurantCategoryListPage').then((m) => ({
    default: m.RestaurantCategoryListPage,
  }))
);

const RestaurantCategoryCreatePage = lazy(() =>
  import('../pages/RestaurantCategoryCreatePage').then((m) => ({
    default: m.RestaurantCategoryCreatePage,
  }))
);

const RestaurantCategoryDetailPage = lazy(() =>
  import('../pages/RestaurantCategoryDetailPage').then((m) => ({
    default: m.RestaurantCategoryDetailPage,
  }))
);

const RestaurantCategoryRestaurantsPage = lazy(() =>
  import('../pages/RestaurantCategoryRestaurantsPage').then((m) => ({
    default: m.RestaurantCategoryRestaurantsPage,
  }))
);

const DishCategoryListPage = lazy(() =>
  import('../features/dish-category/pages/DishCategoryListPage').then((m) => ({
    default: m.DishCategoryListPage,
  }))
);

const DishCategoryCreatePage = lazy(() =>
  import('../features/dish-category/pages/DishCategoryCreatePage').then(
    (m) => ({
      default: m.DishCategoryCreatePage,
    })
  )
);

const DishCategoryDetailPage = lazy(() =>
  import('../features/dish-category/pages/DishCategoryDetailPage').then(
    (m) => ({
      default: m.DishCategoryDetailPage,
    })
  )
);

const DishCategoryDishesPage = lazy(() =>
  import('../features/dish-category/pages/DishCategoryDishesPage').then(
    (m) => ({
      default: m.DishCategoryDishesPage,
    })
  )
);

const UserListPage = lazy(() =>
  import('../features/user/pages/UserListPage').then((m) => ({
    default: m.UserListPage,
  }))
);

const UserDetailPage = lazy(() =>
  import('../features/user/pages/UserDetailPage').then((m) => ({
    default: m.UserDetailPage,
  }))
);

// Restaurant Admin Pages
const RestaurantAdminDashboardPage = lazy(() =>
  import('../pages/RestaurantAdminDashboardPage').then((m) => ({
    default: m.RestaurantAdminDashboardPage,
  }))
);

const RestaurantDishPage = lazy(() =>
  import('../features/resto-dish/pages/RestoDishPage').then((m) => ({
    default: m.RestoDishListPage,
  }))
);
const RestoDishDetailPage = lazy(() =>
  import('../features/resto-dish/pages/RestoDishDetailPage').then((m) => ({
    default: m.RestoDishDetailPage,
  }))
);

const RestoDishEditPage = lazy(() =>
  import('../features/resto-dish/pages/RestoDishEditPage').then((m) => ({
    default: m.RestoDishEditPage,
  }))
);
const RestaurantAdminMenuPage = lazy(() =>
  import('../pages/RestaurantAdminMenuPage').then((m) => ({
    default: m.RestaurantAdminMenuPage,
  }))
);

const RestaurantAdminOrdersPage = lazy(() =>
  import('../pages/RestaurantAdminOrdersPage').then((m) => ({
    default: m.RestaurantAdminOrdersPage,
  }))
);

const RestaurantAdminOpeningHoursPage = lazy(() =>
  import('../pages/RestaurantAdminOpeningHoursPage').then((m) => ({
    default: m.RestaurantAdminOpeningHoursPage,
  }))
);

const RestaurantAdminInfoPage = lazy(() =>
  import('../pages/RestaurantAdminInfoPage').then((m) => ({
    default: m.RestaurantAdminInfoPage,
  }))
);

const RestaurantAdminAccountPage = lazy(() =>
  import('../pages/RestaurantAdminAccountPage').then((m) => ({
    default: m.RestaurantAdminAccountPage,
  }))
);

// const FoodListPage = lazy(() =>
//   import('../pages/FoodListPage').then(m => ({ default: m.FoodListPage }))
// );

// Placeholder pages for future features (CRUD pages)
const FoodListPage = lazy(() =>
  Promise.resolve({
    default: () => (
      <div>
        <h1 className="text-3xl font-bold">Food Management</h1>
        <p className="text-slate-600 mt-2">Coming soon...</p>
      </div>
    ),
  })
);

const TripListPage = lazy(() =>
  Promise.resolve({
    default: () => (
      <div>
        <h1 className="text-3xl font-bold">Trip Management</h1>
        <p className="text-slate-600 mt-2">Coming soon...</p>
      </div>
    ),
  })
);

// const UserListPage = lazy(() =>
//   Promise.resolve({
//     default: () => (
//       <div>
//         <h1 className="text-3xl font-bold">User Management</h1>
//         <p className="text-slate-600 mt-2">Coming soon...</p>
//       </div>
//     ),
//   })
// );

// 404 Not Found Page
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  }))
);

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

export const adminRoutes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  // System Admin Routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
        <RoleGuard requiredRole={USER_ROLES.ADMIN}>
          <AdminLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'foods',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FoodListPage />
          </Suspense>
        ),
      },
      {
        path: 'dishes',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DishListPage />
          </Suspense>
        ),
      },
      {
        path: 'dishes/new',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DishCreatePage />
          </Suspense>
        ),
      },
      {
        path: 'dishes/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DishDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'dishes/:id/edit',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DishEditPage />
          </Suspense>
        ),
      },
      {
        path: 'trips',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TripListPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurants',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantListPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurants/new',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantCreatePage />
          </Suspense>
        ),
      },
      {
        path: 'restaurants/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurant-categories',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantCategoryListPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurant-categories/create',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantCategoryCreatePage />
          </Suspense>
        ),
      },
      {
        path: 'restaurant-categories/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantCategoryDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurant-categories/:id/restaurants',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantCategoryRestaurantsPage />
          </Suspense>
        ),
      },
      {
        path: 'dish-categories',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DishCategoryListPage />
          </Suspense>
        ),
      },
      {
        path: 'dish-categories/create',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DishCategoryCreatePage />
          </Suspense>
        ),
      },
      {
        path: 'dish-categories/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DishCategoryDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'dish-categories/:id/dishes',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DishCategoryDishesPage />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UserListPage />
          </Suspense>
        ),
      },
      {
        path: 'users/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UserDetailPage />
          </Suspense>
        ),
      },
    ],
  },

  // Restaurant Admin Routes
  {
    path: '/restaurant-admin',
    element: (
      <ProtectedRoute>
        <RoleGuard requiredRole={USER_ROLES.ADMIN}>
          <RestaurantAdminLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantAdminDashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'dishes',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantDishPage />
          </Suspense>
        ),
      },
      {
        path: 'dishes/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestoDishDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'dishes/:id/edit',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestoDishEditPage />
          </Suspense>
        ),
      },
      {
        path: 'menu',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantAdminMenuPage />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantAdminOrdersPage />
          </Suspense>
        ),
      },
      {
        path: 'opening-hours',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantAdminOpeningHoursPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurant-info',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantAdminInfoPage />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantAdminAccountPage />
          </Suspense>
        ),
      },
    ],
  },

  // Default redirect to login
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },

  // Catch-all route for undefined paths (404)
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];
