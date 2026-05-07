import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute, ADMIN_ROLES } from '../features/auth';
import { AdminLayout } from '../layouts';

// Lazy load pages for better performance
const LoginPage = lazy(() =>
  import('../pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

const RestaurantListPage = lazy(() =>
  import('../pages/RestaurantListPage').then((m) => ({
    default: m.RestaurantListPage,
  }))
);

const RestaurantDetailPage = lazy(() =>
  import('../pages/RestaurantDetailPage').then((m) => ({
    default: m.RestaurantDetailPage,
  }))
);

const RestaurantCreatePage = lazy(() =>
  import('../pages/RestaurantCreatePage').then((m) => ({
    default: m.RestaurantCreatePage,
  }))
);

const DishListPage = lazy(() =>
  import('../pages/DishListPage').then((m) => ({ default: m.DishListPage }))
);

const DishCreatePage = lazy(() =>
  import('../pages/DishCreatePage').then((m) => ({ default: m.DishCreatePage }))
);

const DishDetailPage = lazy(() =>
  import('../pages/DishDetailPage').then((m) => ({ default: m.DishDetailPage }))
);

const DishEditPage = lazy(() =>
  import('../pages/DishEditPage').then((m) => ({ default: m.DishEditPage }))
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
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DashboardPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'foods',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <FoodListPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'dishes',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DishListPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'dishes/new',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DishCreatePage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'dishes/:id',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DishDetailPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'dishes/:id/edit',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DishEditPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'trips',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <TripListPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'restaurants',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RestaurantListPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'restaurants/new',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RestaurantCreatePage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'restaurants/:id',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN, ADMIN_ROLES.RESTO_ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RestaurantDetailPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'restaurant-categories',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RestaurantCategoryListPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'restaurant-categories/create',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RestaurantCategoryCreatePage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'restaurant-categories/:id',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RestaurantCategoryDetailPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'restaurant-categories/:id/restaurants',
        element: (
          <ProtectedRoute
            allowedRoles={[ADMIN_ROLES.ADMIN]}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RestaurantCategoryRestaurantsPage />
              </Suspense>
            }
          />
        ),
      },
      {
        index: true,
        element: (
          <ProtectedRoute
            element={
              <Suspense fallback={<LoadingFallback />}>
                <DashboardPage />
              </Suspense>
            }
          />
        ),
      },
    ],
  },
];
