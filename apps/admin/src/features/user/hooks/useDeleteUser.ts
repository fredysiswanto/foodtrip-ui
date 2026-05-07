import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, ApiError } from '@foodtrip/api';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.delete(id),
    onSuccess: () => {
      // Invalidate all user queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'user'] });
    },
    onError: (error: ApiError) => {
      console.error('Failed to delete user:', error.message);
    },
  });
}
