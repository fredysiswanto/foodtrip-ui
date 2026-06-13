import { ApiError, authApi } from '@foodtrip/api';
import { JwtHelper } from '@foodtrip/utils';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../../../providers/toast';
import { getRoleDisplayName } from '../roles';
import { useAuth } from './useAuth';

interface UseLoginOptions {
  onRoleDetected?: (role: string) => void;
}

export function useLogin(options?: UseLoginOptions) {
  const { setAuth } = useAuth();
  const toast = useToast();
  const decodeToken = new JwtHelper().decodeToken;

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return authApi.login(email, password);
    },
    onSuccess: async (data) => {
      if (!data || !data.data.accessToken) {
        toast.error('Login Failed', 'No token received from server');
        return;
      }
      const dataUser = await decodeToken(data.data.accessToken);

      if (!dataUser) {
        toast.error('Login Failed', 'Invalid token received from server');
        return;
      }
      // Validate that user has admin role
      if (dataUser.role === 'CUSTOMER') {
        toast.error(
          'Access Denied',
          `Only admins can access this application. Your role: ${getRoleDisplayName(dataUser.role)}`
        );
        return;
      }

      // if (dataUser.restaurants && dataUser.restaurants.length === 0) {
      //   toast.error(
      //     'Access Denied',
      //     'You are not assigned to any restaurant. Please contact your administrator.'
      //   );
      //   return;
      // }

      if (dataUser.role === 'SUPER_ADMIN') {
        // Store token in localStorage
        localStorage.setItem('auth_token', data.data?.accessToken);
        localStorage.setItem('user_role', dataUser.role);
      } else {
        localStorage.setItem('auth_token', data.data?.accessToken);
        localStorage.setItem(
          'resto_id',
          dataUser.restaurants?.[0].restaurantId || ''
        );
        localStorage.setItem('user_role', dataUser.role);
      }
      const user = dataUser;

      // Store token in localStorage

      // Update auth state

      setAuth({
        user: {
          userId: user.userId,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
          restaurants: user.restaurants as
            | {
                restaurantId: string;
                restaurantRole: 'ADMIN' | 'SUPER_ADMIN' | 'OWNER' | 'STAFF';
              }[]
            | undefined,
        },
        token: data.data?.accessToken,
        isAuthenticated: true,
        isLoading: false,
      });

      // Notify parent component about detected role
      options?.onRoleDetected?.(dataUser.role);

      // Show role-specific welcome message
      const roleMessage =
        dataUser.role === 'SUPER_ADMIN'
          ? 'System Administrator'
          : 'Restaurant Manager';

      toast.success('Welcome back!', `${dataUser.email} • ${roleMessage}`);
    },
    onError: (error) => {
      // Handle different error types
      let errorMessage = 'Login failed';

      if (error instanceof ApiError) {
        if (error.statusCode === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.statusCode === 403) {
          errorMessage = 'Access denied';
        } else if (error.statusCode === 0) {
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
