import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load pages for better performance
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

export const adminRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/foods',
    element: <FoodListPage />,
  },
  {
    path: '/trips',
    element: <TripListPage />,
  },
  {
    path: '/restaurants',
    element: <RestaurantListPage />,
  },
  {
    path: '/users',
    element: <UserListPage />,
  },
  {
    path: '/',
    element: <DashboardPage />, // Default redirect to dashboard
  },
];
