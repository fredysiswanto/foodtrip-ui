import { useNavigate } from 'react-router-dom';
import {
  useDishCategoryList,
  useDeleteDishCategory,
  DishCategoryTable,
} from '..';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

export function DishCategoryListPage() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading, error } = useDishCategoryList();
  const { mutate: deleteDishCategory } = useDeleteDishCategory();

  const handleEdit = (id: string) => {
    navigate(`/admin/dish-categories/${id}`);
  };

  const handleDelete = async (id: string) => {
    deleteDishCategory(id);
  };

  const handleViewDishes = (categoryId: string, categoryName: string) => {
    navigate(`/admin/dish-categories/${categoryId}/dishes`, {
      state: { categoryName },
    });
  };

  return (
    <VStack gap="lg">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dish Categories</h1>
          <p className="text-gray-600">
            Manage dish categories and their associated dishes
          </p>
        </div>
        <Button
          onClick={() => navigate('/admin/dish-categories/create')}
          size="lg"
        >
          + Add Category
        </Button>
      </div>

      {error && (
        <Alert type="error" closeable>
          {error instanceof Error
            ? error.message
            : 'Failed to load categories. Please try again.'}
        </Alert>
      )}

      {isLoading ? (
        <Card className="w-full flex justify-center items-center py-12">
          <Spinner size="lg" />
        </Card>
      ) : categories.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No categories found</p>
          <Button onClick={() => navigate('/admin/dish-categories/create')}>
            Create your first category
          </Button>
        </Card>
      ) : (
        <Card className="w-full">
          <DishCategoryTable
            categories={categories}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewDishes={handleViewDishes}
          />
        </Card>
      )}
    </VStack>
  );
}
