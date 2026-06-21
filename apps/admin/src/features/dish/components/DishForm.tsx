import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateDishSchema,
  CreateDishInputType,
  DishType,
} from '@foodtrip/types';
import {
  Button,
  Input,
  Textarea,
  NumberInput,
  FormGroup,
  Select,
} from '@foodtrip/ui';

export interface DishFormProps {
  initialData?: DishType;
  onSubmit: (data: CreateDishInputType) => Promise<void>;
  isLoading?: boolean;
}

export function DishForm({
  initialData,
  onSubmit,
  isLoading = false,
}: DishFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDishInputType>({
    resolver: zodResolver(CreateDishSchema),
    defaultValues: initialData
      ? {
          name: initialData.name || '',
          description: initialData.description || '',
          price: String(initialData.price),
          categoryId: initialData.category?.id || '',
          restaurantId: initialData.restaurant?.id || '',
          isAvailable: initialData.isAvailable,
          // imageId: initialData.imageId || '',
          restaurantName: initialData.restaurant?.name || '',
          categoryName: initialData.category?.name || '',
        }
      : {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full ">
      <FormGroup>
        <Input
          label="Dish Name"
          placeholder="Enter dish name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Restaurant Name"
          placeholder="Enter restaurant name"
          error={errors.restaurantName?.message}
          {...register('restaurantName')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          label="Category ID"
          placeholder="Enter dish category ID"
          error={errors.categoryId?.message}
          {...register('categoryId')}
        />
        <NumberInput
          label="Price"
          placeholder="Enter dish price"
          min={0}
          step={0.01}
          error={errors.price?.message}
          {...register('price')}
        />
      </FormGroup>

      <Textarea
        label="Description"
        placeholder="Enter dish description"
        rows={4}
        error={errors.description?.message}
        {...register('description')}
      />

      <FormGroup>
        <Select
          label="Status"
          error={errors.isAvailable?.message}
          {...register('isAvailable', {
            setValueAs: (value) => value === 'true',
          })}
        >
          <option value="">Select Status</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </Select>
        <Input
          label="Image URL"
          type="url"
          placeholder="Enter image URL"
          error={errors.imageId?.message}
          {...register('imageId')}
        />
      </FormGroup>

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Dish' : 'Create Dish'}
      </Button>
    </form>
  );
}
