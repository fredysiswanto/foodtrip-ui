import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserSchema, UserWithRestaurantType } from '@foodtrip/types';
import { FormGroup, Input, Button, Alert } from '@foodtrip/ui';

export interface UserFormProps {
  initialData?: UserWithRestaurantType;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function UserForm({
  initialData,
  onSubmit,
  isLoading,
  error,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData
      ? {
          first_name: initialData.first_name,
          middle_name: initialData.middle_name,
          last_name: initialData.last_name,
          phone_number: initialData.phone_number,
          gender: initialData.gender,
        }
      : {},
    resolver: zodResolver(UpdateUserSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <Alert type="error">{error}</Alert>}

      <FormGroup>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <Input
          {...register('first_name')}
          placeholder="First name"
          disabled={isLoading}
        />
        {errors.first_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.first_name.message}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Middle Name
        </label>
        <Input
          {...register('middle_name')}
          placeholder="Middle name (optional)"
          disabled={isLoading}
        />
        {errors.middle_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.middle_name.message}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <Input
          {...register('last_name')}
          placeholder="Last name"
          disabled={isLoading}
        />
        {errors.last_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.last_name.message}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <Input
          {...register('phone_number')}
          placeholder="Phone number (optional)"
          disabled={isLoading}
        />
        {errors.phone_number && (
          <p className="text-red-600 text-sm mt-1">
            {errors.phone_number.message}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <Input
          {...register('gender')}
          placeholder="Gender (optional)"
          disabled={isLoading}
        />
        {errors.gender && (
          <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
        )}
      </FormGroup>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save User'}
      </Button>
    </form>
  );
}
