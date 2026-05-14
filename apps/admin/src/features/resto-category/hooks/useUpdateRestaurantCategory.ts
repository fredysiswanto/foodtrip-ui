import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantCategoryApi } from '@foodtrip/api';
import type { UpdateRestaurantCategoryInputType } from '@foodtrip/types';

export function useUpdateRestaurantCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateRestaurantCategoryInputType;
    }) => restaurantCategoryApi.update(id, data),
    onSuccess: () => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant-category'],
      });
    },
    onError: (error: Error) => {
      console.error('useUpdateRestaurantCategory - Error:', error);
    },
  });
}
