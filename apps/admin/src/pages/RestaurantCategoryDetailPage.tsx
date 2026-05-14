import { useNavigate, useParams } from 'react-router-dom';
import {
  useRestaurantCategoryDetail,
  useUpdateRestaurantCategory,
  RestaurantCategoryForm,
} from '../features/resto-category';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

export function RestaurantCategoryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    data: category,
    isLoading,
    error,
  } = useRestaurantCategoryDetail(id || '');
  const { mutate: updateRestaurantCategory, isPending } =
    useUpdateRestaurantCategory();

  const handleSubmit = async (data: { restocatg_name: string }) => {
    if (!id) return;

    updateRestaurantCategory(
      { id, data },
      {
        onSuccess: () => {
          navigate('/admin/restaurant-categories');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Card className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </Card>
    );
  }

  if (error || !category) {
    return (
      <VStack gap="lg">
        <Alert type="error">Failed to load category details</Alert>
        <Button onClick={() => navigate('/admin/restaurant-categories')}>
          Back to Categories
        </Button>
      </VStack>
    );
  }

  return (
    <VStack gap="lg">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/restaurant-categories')}
        >
          ← Back to Categories
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Category</h1>
      </div>

      <Card>
        <RestaurantCategoryForm
          initialData={category}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </Card>
    </VStack>
  );
}
