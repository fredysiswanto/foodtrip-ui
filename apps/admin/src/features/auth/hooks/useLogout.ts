import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export function useLogout() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: async () => {
      // Clear token from localStorage
      localStorage.removeItem('auth_token');
    },
    onSuccess: () => {
      // Reset auth state
      setAuth({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    },
  });
}
