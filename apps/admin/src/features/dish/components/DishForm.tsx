import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateRestaurantSchema,
  CreateRestaurantInput,
  DishType,
} from '@foodtrip/types';
import { Button, Input, Textarea, NumberInput, FormGroup } from '@foodtrip/ui';

export interface DishFormProps {
  initialData?: DishType;
  onSubmit: (data: CreateRestaurantInput) => Promise<void>;
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
  } = useForm<CreateRestaurantInput>({
    resolver: zodResolver(CreateRestaurantSchema),
    defaultValues: initialData
      ? {
          name: initialData.dish_name,
          address: initialData.dish_desc,
          image: initialData.dish_img || '',
          status: initialData.status || undefined,
          website: initialData.status || '',
        }
      : {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormGroup>
        <Input
          label="Dish Name"
          placeholder="Enter dish name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Address"
          placeholder="Enter dish address"
          error={errors.address?.message}
          {...register('address')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          label="Cuisine Type"
          placeholder="e.g., Italian, Japanese, etc."
          error={errors.cuisine?.message}
          {...register('cuisine')}
        />
        <NumberInput
          label="Rating"
          placeholder="0 - 5"
          min={0}
          max={5}
          step={0.1}
          error={errors.rating?.message}
          {...register('rating', { valueAsNumber: true })}
        />
      </FormGroup>

      <Textarea
        label="Description"
        placeholder="Enter restaurant description"
        rows={4}
        error={errors.description?.message}
        {...register('description')}
      />

      <FormGroup>
        <Input
          label="Email"
          type="email"
          placeholder="Enter email address"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="Enter phone number"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          label="Website"
          type="url"
          placeholder="Enter website URL"
          error={errors.website?.message}
          {...register('website')}
        />
        <Input
          label="Image URL"
          placeholder="Enter image URL"
          error={errors.image?.message}
          {...register('image')}
        />
      </FormGroup>

      <FormGroup column={false}>
        <NumberInput
          label="Latitude"
          placeholder="Enter latitude"
          step={0.0001}
          error={errors.latitude?.message}
          {...register('latitude', { valueAsNumber: true })}
        />
        <NumberInput
          label="Longitude"
          placeholder="Enter longitude"
          step={0.0001}
          error={errors.longitude?.message}
          {...register('longitude', { valueAsNumber: true })}
        />
      </FormGroup>

      <div className="flex gap-3 pt-4">
        <Button type="submit" isLoading={isLoading} fullWidth>
          {initialData ? 'Update Restaurant' : 'Create Restaurant'}
        </Button>
      </div>
    </form>
  );
}
