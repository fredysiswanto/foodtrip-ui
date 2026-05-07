import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dishCategoryApi } from '@foodtrip/api';
import type { UpdateDishCategoryInputType } from '@foodtrip/types';

export function useUpdateDishCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDishCategoryInputType;
    }) => dishCategoryApi.update(id, data),
    onSuccess: () => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish-category'],
      });
    },
    onError: (error: Error) => {
      console.error('useUpdateDishCategory - Error:', error);
    },
  });
}
