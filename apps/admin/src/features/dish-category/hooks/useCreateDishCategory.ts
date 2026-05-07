import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dishCategoryApi } from '@foodtrip/api';
import type { CreateDishCategoryInputType } from '@foodtrip/types';

export function useCreateDishCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDishCategoryInputType) =>
      dishCategoryApi.create(data),
    onSuccess: () => {
      // Invalidate dish category list to refetch
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish-category'],
      });
    },
    onError: (error: Error) => {
      console.error('useCreateDishCategory - Error:', error);
    },
  });
}
