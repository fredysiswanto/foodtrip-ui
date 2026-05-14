import { useNavigate } from 'react-router-dom';
import {
  useRestaurantCategoryList,
  useDeleteRestaurantCategory,
  RestaurantCategoryTable,
} from '../features/resto-category';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

export function RestaurantCategoryListPage() {
  const navigate = useNavigate();
  const {
    data: categories = [],
    isLoading,
    error,
  } = useRestaurantCategoryList();
  const { mutate: deleteRestaurantCategory } = useDeleteRestaurantCategory();

  const handleEdit = (id: string) => {
    navigate(`/admin/restaurant-categories/${id}`);
  };

  const handleDelete = async (id: string) => {
    deleteRestaurantCategory(id);
  };

  const handleViewRestaurants = (categoryId: string, categoryName: string) => {
    navigate(`/admin/restaurant-categories/${categoryId}/restaurants`, {
      state: { categoryName },
    });
  };

  return (
    <VStack gap="lg">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Restaurant Categories
          </h1>
          <p className="text-gray-600">
            Manage restaurant categories and their associated restaurants
          </p>
        </div>
        <Button
          onClick={() => navigate('/admin/restaurant-categories/create')}
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
          <Button
            onClick={() => navigate('/admin/restaurant-categories/create')}
          >
            Create your first category
          </Button>
        </Card>
      ) : (
        <Card className="w-full">
          <RestaurantCategoryTable
            categories={categories}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewRestaurants={handleViewRestaurants}
          />
        </Card>
      )}
    </VStack>
  );
}
