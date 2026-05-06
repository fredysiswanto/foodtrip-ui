import { User } from '@foodtrip/types';

// Admin role types
export const ADMIN_ROLES = {
  ADMIN: 'Admin',
  RESTO_ADMIN: 'Resto_Admin',
} as const;

export type AdminRole = (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];

/**
 * Check if user has a specific role
 */
export function hasRole(user: User | null, role: AdminRole): boolean {
  return user?.user_type === role;
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(user: User | null, roles: AdminRole[]): boolean {
  return !!user && roles.includes(user.user_type as AdminRole);
}

/**
 * Check if user is Super Admin (full access)
 */
export function isSuperAdmin(user: User | null): boolean {
  return hasRole(user, ADMIN_ROLES.ADMIN);
}

/**
 * Check if user is Restaurant Admin (limited to their restaurant)
 */
export function isRestoAdmin(user: User | null): boolean {
  return hasRole(user, ADMIN_ROLES.RESTO_ADMIN);
}

/**
 * Check if user is any type of admin
 */
export function isAnyAdmin(user: User | null): boolean {
  return hasAnyRole(user, [ADMIN_ROLES.ADMIN, ADMIN_ROLES.RESTO_ADMIN]);
}

/**
 * Get admin role display name
 */
export function getRoleDisplayName(role: string): string {
  switch (role) {
    case ADMIN_ROLES.ADMIN:
      return 'Admin';
    case ADMIN_ROLES.RESTO_ADMIN:
      return 'Restaurant Admin';
    default:
      return 'Unknown';
  }
}

/**
 * Get allowed routes for a role
 */
export function getAllowedRoutes(role: AdminRole): string[] {
  const commonRoutes = ['/dashboard'];

  if (role === ADMIN_ROLES.ADMIN) {
    // Super admin can access all routes
    return [
      ...commonRoutes,
      '/restaurants',
      '/restaurants/new',
      '/restaurants/:id',
      '/foods',
      '/trips',
      '/users',
    ];
  }

  if (role === ADMIN_ROLES.RESTO_ADMIN) {
    // Restaurant admin limited to their restaurant management
    return [
      ...commonRoutes,
      '/restaurants/:id', // Only their restaurant
    ];
  }

  return commonRoutes;
}

/**
 * Check if a role can access a specific route
 */
export function canAccessRoute(role: AdminRole | null, path: string): boolean {
  if (!role) return false;

  const allowedRoutes = getAllowedRoutes(role);

  // Check exact match or pattern match
  return allowedRoutes.some((allowedRoute) => {
    const pattern = allowedRoute.replace(/:[^\s/]+/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(path);
  });
}
