import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AdminRole } from '../roles';

export interface RoleGuardProps {
  children: ReactNode;
  requiredRole: AdminRole | AdminRole[];
  fallback?: ReactNode;
}

/**
 * RoleGuard: Conditionally render content based on user role
 * @param children - Content to render if role matches
 * @param requiredRole - Required role(s)
 * @param fallback - Content to render if role doesn't match
 */
export function RoleGuard({
  children,
  requiredRole,
  fallback = null,
}: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return fallback;
  }

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  const hasRole = roles.some((role) => user.user_type === role);

  return hasRole ? children : fallback;
}
