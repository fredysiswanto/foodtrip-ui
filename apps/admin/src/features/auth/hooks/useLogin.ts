import { useMutation } from '@tanstack/react-query';
import { authApi, ApiError } from '@foodtrip/api';
import { useAuth } from './useAuth';
import { useToast } from '../../../providers/toast';

export function useLogin() {
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
      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);

      // Update auth state
      setAuth({
        user: data.data,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      // Show success toast
      toast.success(
        'Welcome back!',
        `Logged in as ${data.data.first_name} ${data.data.last_name}`
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
