import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { useToast } from '../../../providers/toast';

export function useLogout() {
  const { setAuth } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: async () => {
      // Clear token from localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('user_role');
    },
    onSuccess: () => {
      // Reset auth state
      setAuth({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });

      // Show logout message
      toast.info('Logged Out', 'You have been successfully logged out');
    },
    onError: () => {
      toast.error('Logout Error', 'Failed to logout. Please try again.');
    },
  });
}
