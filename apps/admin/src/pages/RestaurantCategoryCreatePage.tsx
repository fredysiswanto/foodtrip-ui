import { useNavigate } from 'react-router-dom';
import {
  useCreateRestaurantCategory,
  RestaurantCategoryForm,
} from '../features/restaurant-category';
import { Button, Card, VStack } from '@foodtrip/ui';

export function RestaurantCategoryCreatePage() {
  const navigate = useNavigate();
  const { mutate: createRestaurantCategory, isPending } =
    useCreateRestaurantCategory();

  const handleSubmit = async (data: { restocatg_name: string }) => {
    createRestaurantCategory(data, {
      onSuccess: () => {
        navigate('/admin/restaurant-categories');
      },
    });
  };

  return (
    <VStack gap="lg">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/restaurant-categories')}
        >
          ← Back to Categories
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Create New Category
        </h1>
      </div>

      <Card>
        <RestaurantCategoryForm onSubmit={handleSubmit} isLoading={isPending} />
      </Card>
    </VStack>
  );
}
