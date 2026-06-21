import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminDishApi } from '@foodtrip/api';
import { CreateDishInputType } from '../types';

export function useCreateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDishInputType) => adminDishApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'dish', 'list'],
      });
    },
  });
}
