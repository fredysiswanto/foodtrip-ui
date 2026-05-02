import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../features/auth';
import { AdminLayout } from '../layouts';

// Lazy load pages for better performance
const LoginPage = lazy(() =>
  import('../pages/LoginPage').then(m => ({ default: m.LoginPage }))
);

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then(m => ({ default: m.DashboardPage }))
);

// Placeholder pages for future features (CRUD pages)
const FoodListPage = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Food Management</h1>
        <p className="text-slate-600 mt-2">Coming soon...</p>
      </div>
    ),
  })
);

const TripListPage = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Trip Management</h1>
        <p className="text-slate-600 mt-2">Coming soon...</p>
      </div>
    ),
  })
);

const RestaurantListPage = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Restaurant Management</h1>
        <p className="text-slate-600 mt-2">Coming soon...</p>
      </div>
    ),
  })
);

const UserListPage = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="p-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-slate-600 mt-2">Coming soon...</p>
      </div>
    ),
  })
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
            element={
              <Suspense fallback={<LoadingFallback />}>
                <FoodListPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'trips',
        element: (
          <ProtectedRoute
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
            element={
              <Suspense fallback={<LoadingFallback />}>
                <RestaurantListPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute
            element={
              <Suspense fallback={<LoadingFallback />}>
                <UserListPage />
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
