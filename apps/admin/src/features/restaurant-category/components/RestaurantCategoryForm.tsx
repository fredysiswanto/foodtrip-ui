import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateRestaurantCategorySchema,
  RestaurantCategoryWithRestaurantsType,
} from '@foodtrip/types';
import { FormGroup, Input, Button, Alert } from '@foodtrip/ui';

export interface RestaurantCategoryFormProps {
  initialData?: RestaurantCategoryWithRestaurantsType;
  onSubmit: (data: { restocatg_name: string }) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function RestaurantCategoryForm({
  initialData,
  onSubmit,
  isLoading,
  error,
}: RestaurantCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      restocatg_name: initialData?.restocatg_name || '',
    },
    resolver: zodResolver(CreateRestaurantCategorySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <Alert type="error">{error}</Alert>}

      <FormGroup>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <Input
          {...register('restocatg_name')}
          placeholder="e.g., Asian Cuisine, Pizza, Italian"
          disabled={isLoading}
        />
        {errors.restocatg_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.restocatg_name.message}
          </p>
        )}
      </FormGroup>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Category'}
      </Button>
    </form>
  );
}
