/**
 * Navigation configuration for AdminLayout sidebar
 */

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number; // Optional badge for notifications
}

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
    label: 'Trip Management',
    path: '/trips',
    icon: '✈️',
  },
  {
    label: 'Restaurant Management',
    path: '/restaurants',
    icon: '🏪',
  },
  {
    label: 'User Management',
    path: '/users',
    icon: '👥',
  },
];
