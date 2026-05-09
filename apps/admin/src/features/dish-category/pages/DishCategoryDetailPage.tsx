import { useNavigate, useParams } from 'react-router-dom';
import {
  useDishCategoryDetail,
  useUpdateDishCategory,
  DishCategoryForm,
} from '..';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

export function DishCategoryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading, error } = useDishCategoryDetail(id || '');
  const { mutate: updateDishCategory, isPending } = useUpdateDishCategory();

  const handleSubmit = async (data: { dishcatg_name: string }) => {
    if (!id) return;

    updateDishCategory(
      { id, data },
      {
        onSuccess: () => {
          navigate('/admin/dish-categories');
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
        <Button onClick={() => navigate('/admin/dish-categories')}>
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
          onClick={() => navigate('/admin/dish-categories')}
        >
          ← Back to Categories
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Category</h1>
      </div>

      <Card>
        <DishCategoryForm
          initialData={category}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </Card>
    </VStack>
  );
}
