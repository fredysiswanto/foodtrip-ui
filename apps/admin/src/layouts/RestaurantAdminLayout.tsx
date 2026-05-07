import { AdminLayout } from './AdminLayout';

/**
 * Layout for Restaurant Admin users
 * Uses the same AdminLayout but with role-based navigation
 * Navigation is determined by user role in AdminLayout
 */
export function RestaurantAdminLayout() {
  return <AdminLayout />;
}
