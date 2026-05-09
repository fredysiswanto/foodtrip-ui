import { useNavigate } from 'react-router-dom';
import { useCreateDishCategory, DishCategoryForm } from '..';
import { Button, Card, VStack } from '@foodtrip/ui';

export function DishCategoryCreatePage() {
  const navigate = useNavigate();
  const { mutate: createDishCategory, isPending } = useCreateDishCategory();

  const handleSubmit = async (data: { dishcatg_name: string }) => {
    createDishCategory(data, {
      onSuccess: () => {
        navigate('/admin/dish-categories');
      },
    });
  };

  return (
    <VStack gap="lg">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/dish-categories')}
        >
          ← Back to Categories
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Create New Category
        </h1>
      </div>

      <Card>
        <DishCategoryForm onSubmit={handleSubmit} isLoading={isPending} />
      </Card>
    </VStack>
  );
}
