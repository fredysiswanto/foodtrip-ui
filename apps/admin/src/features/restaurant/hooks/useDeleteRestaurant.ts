import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminRestaurantApi } from '@foodtrip/api';

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminRestaurantApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant', 'list'],
      });
    },
  });
}
