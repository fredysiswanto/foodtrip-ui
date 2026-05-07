/**
 * Navigation configuration for AdminLayout sidebar
 */

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number; // Optional badge for notifications
}

/**
 * System Admin Navigation - Full access to all resources
 */
export const navigationAdmin: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: '📊',
  },
  {
    label: 'Dish Management',
    path: '/admin/dishes',
    icon: '🍽️',
  },
  {
    label: 'Dish Categories',
    path: '/admin/dish-categories',
    icon: '📋',
  },
  {
    label: 'Restaurant Categories',
    path: '/admin/restaurant-categories',
    icon: '📂',
  },
  {
    label: 'Restaurants',
    path: '/admin/restaurants',
    icon: '🏪',
  },
  {
    label: 'Users',
    path: '/admin/users',
    icon: '👤',
  },
];

/**
 * Restaurant Admin Navigation - Scoped to their restaurant
 */
export const navigationRestaurantAdmin: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/restaurant-admin/dashboard',
    icon: '📊',
  },
  {
    label: 'Menu Management',
    path: '/restaurant-admin/menu',
    icon: '🍽️',
  },
  {
    label: 'Orders',
    path: '/restaurant-admin/orders',
    icon: '📦',
  },
  {
    label: 'Opening Hours',
    path: '/restaurant-admin/opening-hours',
    icon: '⏰',
  },
  {
    label: 'Restaurant Info',
    path: '/restaurant-admin/info',
    icon: '🏪',
  },
  {
    label: 'Account',
    path: '/restaurant-admin/account',
    icon: '⚙️',
  },
];

/**
 * Legacy: Unified navigation (for backward compatibility)
 */
export const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: '📊',
  },
  {
    label: 'Food Management',
    path: '/foods',
    icon: '🍔',
  },
  {
    label: 'Dish Management',
    path: '/dishes',
    icon: '🍽️',
  },
  {
    label: 'Dish Categories',
    path: '/dish-categories',
    icon: '📋',
  },
  {
    label: 'Restaurant Categories',
    path: '/restaurant-categories',
    icon: '📂',
  },
  {
    label: 'Restaurant Management',
    path: '/restaurants',
    icon: '🏪',
  },
  {
    label: 'Trip Management',
    path: '/trips',
    icon: '✈️',
  },
  {
    label: 'Users Management',
    path: '/users',
    icon: '👤',
  },
];
