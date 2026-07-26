import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminDishCategoryApi } from '@foodtrip/api';
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
    }) => adminDishCategoryApi.update(id, data),
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
