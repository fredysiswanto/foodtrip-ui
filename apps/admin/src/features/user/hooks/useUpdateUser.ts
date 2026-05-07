import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, ApiError } from '@foodtrip/api';
import { UpdateUserInputType } from '@foodtrip/types';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; data: UpdateUserInputType }) =>
      userApi.update(variables.id, variables.data),
    onSuccess: () => {
      // Invalidate all user queries
      queryClient.invalidateQueries({ queryKey: ['admin', 'user'] });
    },
    onError: (error: ApiError) => {
      console.error('Failed to update user:', error.message);
    },
  });
}
