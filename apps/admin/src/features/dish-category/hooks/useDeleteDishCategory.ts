import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminDishCategoryApi } from '@foodtrip/api';

export function useDeleteDishCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminDishCategoryApi.delete(id),
    onSuccess: () => {
      // Invalidate dish category list to refetch
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish-category'],
      });
    },
    onError: (error: Error) => {
      console.error('useDeleteDishCategory - Error:', error);
    },
  });
}
