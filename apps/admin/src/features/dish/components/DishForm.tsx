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
          dish_name: initialData.dish_name,
          dish_desc: initialData.dish_desc || '',
          dish_price: String(initialData.dish_price),
          dishcatg_id: initialData.dishcatg_id,
          resto_id: initialData.resto_id,
          status: initialData.status,
          dish_img: initialData.dish_img || '',
        }
      : {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full ">
      <FormGroup>
        <Input
          label="Dish Name"
          placeholder="Enter dish name"
          error={errors.dish_name?.message}
          {...register('dish_name')}
        />
        <Input
          label="Restaurant ID"
          placeholder="Enter restaurant ID"
          error={errors.resto_id?.message}
          {...register('resto_id')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          label="Category ID"
          placeholder="Enter dish category ID"
          error={errors.dishcatg_id?.message}
          {...register('dishcatg_id')}
        />
        <NumberInput
          label="Price"
          placeholder="Enter dish price"
          min={0}
          step={0.01}
          error={errors.dish_price?.message}
          {...register('dish_price')}
        />
      </FormGroup>

      <Textarea
        label="Description"
        placeholder="Enter dish description"
        rows={4}
        error={errors.dish_desc?.message}
        {...register('dish_desc')}
      />

      <FormGroup>
        <Select
          label="Status"
          error={errors.status?.message}
          {...register('status')}
        >
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </Select>
        <Input
          label="Image URL"
          type="url"
          placeholder="Enter image URL"
          error={errors.dish_img?.message}
          {...register('dish_img')}
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
