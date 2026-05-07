import { useMutation } from '@tanstack/react-query';
import { authApi, ApiError } from '@foodtrip/api';
import { useAuth } from './useAuth';
import { useToast } from '../../../providers/toast';
import { isAnyAdmin, getRoleDisplayName, ADMIN_ROLES } from '../roles';

interface UseLoginOptions {
  onRoleDetected?: (role: string) => void;
}

export function useLogin(options?: UseLoginOptions) {
  const { setAuth } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({
      email_address,
      password,
    }: {
      email_address: string;
      password: string;
    }) => {
      return authApi.login(email_address, password);
    },
    onSuccess: (data) => {
      // Validate that user has admin role
      if (!isAnyAdmin(data.data)) {
        toast.error(
          'Access Denied',
          `Only admins can access this application. Your role: ${getRoleDisplayName(data.data.user_type)}`
        );
        return;
      }

      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('resto_id', data.data.resto_id || '');
      localStorage.setItem('user_role', data.data.user_type);

      // Update auth state
      setAuth({
        user: data.data,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      // Notify parent component about detected role
      options?.onRoleDetected?.(data.data.user_type);

      // Show role-specific welcome message
      const roleMessage =
        data.data.user_type === ADMIN_ROLES.ADMIN
          ? 'System Administrator'
          : 'Restaurant Manager';

      toast.success(
        'Welcome back!',
        `${data.data.first_name} ${data.data.last_name} • ${roleMessage}`
      );
    },
    onError: (error) => {
      // Handle different error types
      let errorMessage = 'Login failed';

      if (error instanceof ApiError) {
        if (error.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.status === 403) {
          errorMessage = 'Access denied';
        } else if (error.status === 0) {
          errorMessage = 'Network error. Please check your connection.';
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error('Login Failed', errorMessage);
    },
  });
}
