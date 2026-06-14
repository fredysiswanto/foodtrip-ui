import { AuthUser, User } from '@foodtrip/types';

// Admin role types
export const USER_RESTO_ROLES = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  OWNER: 'OWNER',
} as const;

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type UserRestoRole =
  (typeof USER_RESTO_ROLES)[keyof typeof USER_RESTO_ROLES];

/**
 * Check if user has a specific role
 */
export function hasRole(user: User | null, role: UserRole): boolean {
  return user?.roleName === role;
}
export function hasRestoRole(
  user: AuthUser | null,
  role: UserRestoRole
): boolean {
  if (user?.restaurants && user.restaurants.length > 0) {
    return user.restaurants.some((r) => r.restaurantRole === role);
  }
  return false;
}
/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(user: User | null, roles: UserRole[]): boolean {
  return !!user && roles.includes(user.roleName as UserRole);
}

/**
 * Check if user is Super Admin (full access)
 */
export function isSuperAdmin(user: User | null): boolean {
  return hasRole(user, USER_ROLES.SUPER_ADMIN);
}

/**
 * Check if user is Restaurant Admin (limited to their restaurant)
 */
export function isRestoAdmin(user: AuthUser | null): boolean {
  return hasRestoRole(user, USER_RESTO_ROLES.ADMIN);
}

export function isRestoOwner(user: AuthUser | null): boolean {
  return hasRestoRole(user, USER_RESTO_ROLES.OWNER);
}

export function isRestoStaff(user: AuthUser | null): boolean {
  return hasRestoRole(user, USER_RESTO_ROLES.STAFF);
}
/**
 * Check if user is any type of admin
 */
export function isAnyAdmin(user: User | null): boolean {
  return hasAnyRole(user, [USER_ROLES.SUPER_ADMIN, USER_RESTO_ROLES.ADMIN]);
}

/**
 * Get admin role display name
 */
export function getRoleDisplayName(role: string): string {
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
      return 'Super Admin';
    case USER_RESTO_ROLES.ADMIN:
      return 'Restaurant Admin';
    default:
      return 'Unknown';
  }
}

/**
 * Get allowed routes for a role
 */
export function getAllowedRoutes(
  role: UserRole,
  restoRole: UserRestoRole | null
): string[] {
  const commonRoutes = ['/dashboard'];

  if (role === USER_ROLES.SUPER_ADMIN) {
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

  if (role === USER_RESTO_ROLES.ADMIN) {
    // Restaurant admin limited to their restaurant management
    if (restoRole === USER_RESTO_ROLES.ADMIN) {
      return [
        ...commonRoutes,
        '/restaurants/:id', // Only their restaurant
      ];
    }
    if (restoRole === USER_RESTO_ROLES.OWNER) {
      return [
        ...commonRoutes,
        '/restaurants/:id', // Only their restaurant
      ];
    }
    if (restoRole === USER_RESTO_ROLES.STAFF) {
      return [
        ...commonRoutes,
        '/restaurants/:id', // Only their restaurant
      ];
    }
  }

  return commonRoutes;
}

/**
 * Check if a role can access a specific route
 */
export function canAccessRoute(
  role: UserRole | null,
  restoRole: UserRestoRole | null,
  path: string
): boolean {
  if (!role || !restoRole) return false;

  const allowedRoutes = getAllowedRoutes(role, restoRole);

  // Check exact match or pattern match
  return allowedRoutes.some((allowedRoute) => {
    const pattern = allowedRoute.replace(/:[^\s/]+/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(path);
  });
}
