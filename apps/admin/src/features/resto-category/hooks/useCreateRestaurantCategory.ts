import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantCategoryApi } from '@foodtrip/api';
import type { CreateRestaurantCategoryInputType } from '@foodtrip/types';

export function useCreateRestaurantCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRestaurantCategoryInputType) =>
      restaurantCategoryApi.create(data),
    onSuccess: () => {
      // Invalidate restaurant category list to refetch
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant-category'],
      });
    },
    onError: (error: Error) => {
      console.error('useCreateRestaurantCategory - Error:', error);
    },
  });
}
