import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dishApi } from '@foodtrip/api';
import { CreateDishInputType } from '../types';

export function useCreateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDishInputType) => dishApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish', 'list'],
      });
    },
  });
}
