import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { USER_ROLES, UserRole } from '../roles';

export interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if allowedRoles is specified
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role as UserRole | undefined;

    if (!userRole || !allowedRoles.includes(userRole)) {
      // Determine redirect destination based on actual user role
      const getDashboardPath = (): string => {
        if (!userRole) return '/login';
        return userRole === USER_ROLES.ADMIN
          ? '/dashboard'
          : '/restaurant-admin/dashboard';
      };

      const allowedRolesList =
        allowedRoles.length === 1
          ? `${allowedRoles[0]}`
          : `one of: ${allowedRoles.join(', ')}`;

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
          <div className="text-center max-w-md">
            <div className="mb-4 flex justify-center">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4v2m0 0H9m3 0h3m-9-5V9a2 2 0 012-2h6a2 2 0 012 2v2M9 19h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
            <p className="text-gray-600 mt-3 text-sm">
              Your account role{' '}
              <span className="font-semibold text-gray-900">{userRole}</span>{' '}
              does not have permission to access this page.
            </p>
            <p className="text-gray-500 mt-2 text-xs">
              Required role:{' '}
              <span className="font-mono font-semibold">
                {allowedRolesList}
              </span>
            </p>
            <div className="flex gap-2 mt-6 justify-center">
              <button
                onClick={() => (window.location.href = getDashboardPath())}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
              >
                Go to Your Dashboard
              </button>
              <button
                onClick={() => (window.location.href = '/login')}
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
