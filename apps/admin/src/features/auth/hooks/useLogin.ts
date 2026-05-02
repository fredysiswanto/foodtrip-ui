import { useMutation } from '@tanstack/react-query';
import { authApi } from '@foodtrip/api';
import { useAuth } from './useAuth';

export function useLogin() {
  const { setAuth } = useAuth();

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
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
}
