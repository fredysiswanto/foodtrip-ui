import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminRestaurantApi } from '@foodtrip/api';
import { UpdateRestaurantInput } from '@foodtrip/types';

interface UpdateRestaurantParams {
  id: string;
  data: UpdateRestaurantInput;
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateRestaurantParams) =>
      adminRestaurantApi.update(id, data),
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
