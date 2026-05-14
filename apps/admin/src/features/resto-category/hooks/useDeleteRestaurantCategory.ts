import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantCategoryApi } from '@foodtrip/api';

export function useDeleteRestaurantCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restaurantCategoryApi.delete(id),
    onSuccess: () => {
      // Invalidate restaurant category list to refetch
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant-category'],
      });
    },
    onError: (error: Error) => {
      console.error('useDeleteRestaurantCategory - Error:', error);
    },
  });
}
