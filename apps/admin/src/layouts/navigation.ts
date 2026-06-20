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

export const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: '📊',
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
    label: 'Restaurants',
    path: '/restaurants',
    icon: '🏪',
  },
  {
    label: 'Users',
    path: '/users',
    icon: '👤',
  },
];
