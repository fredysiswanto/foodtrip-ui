import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateDishCategorySchema,
  DishCategoryWithDishesType,
} from '@foodtrip/types';
import { FormGroup, Input, Button, Alert } from '@foodtrip/ui';

export interface DishCategoryFormProps {
  initialData?: DishCategoryWithDishesType;
  onSubmit: (data: { dishcatg_name: string }) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function DishCategoryForm({
  initialData,
  onSubmit,
  isLoading,
  error,
}: DishCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dishcatg_name: initialData?.dishcatg_name || '',
    },
    resolver: zodResolver(CreateDishCategorySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <Alert type="error">{error}</Alert>}

      <FormGroup>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <Input
          {...register('dishcatg_name')}
          placeholder="e.g., Vegetarian, Dessert, Fish"
          disabled={isLoading}
        />
        {errors.dishcatg_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.dishcatg_name.message}
          </p>
        )}
      </FormGroup>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Category'}
      </Button>
    </form>
  );
}
