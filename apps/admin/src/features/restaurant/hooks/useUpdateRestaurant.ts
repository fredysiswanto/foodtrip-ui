import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi } from '@foodtrip/api';
import { UpdateRestaurantInput } from '@foodtrip/types';

interface UpdateRestaurantParams {
  id: string;
  data: UpdateRestaurantInput;
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateRestaurantParams) =>
      restaurantApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant', 'list'],
      });
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant', 'detail', id],
      });
    },
  });
}
