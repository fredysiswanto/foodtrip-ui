import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi } from '@foodtrip/api';

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restaurantApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant', 'list'],
      });
    },
  });
}
