import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, useAuth } from '../features/auth';
import { USER_ROLES } from '../features/auth/roles';

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Redirect to appropriate dashboard based on role if already authenticated
    if (isAuthenticated && user) {
      const dashboardPath =
        user.role === USER_ROLES.ADMIN
          ? '/dashboard'
          : '/restaurant-admin/dashboard';
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginSuccess = () => {
    // Redirect will happen automatically via useEffect above
  };

  return <LoginForm onSuccess={handleLoginSuccess} />;
}
