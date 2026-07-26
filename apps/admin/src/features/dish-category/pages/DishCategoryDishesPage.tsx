import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDishCategoryDetail, DishList } from '..';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

interface LocationState {
  categoryName?: string;
}

export function DishCategoryDishesPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { categoryName: stateCategory } = (location.state ||
    {}) as LocationState;

  const { data: category, isLoading, error } = useDishCategoryDetail(id || '');

  const categoryName = stateCategory || category?.name || 'Category';
  const dishes = category?.dishes || [];

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
        <Button onClick={() => navigate('/dish-categories')}>
          Back to Categories
        </Button>
      </VStack>
    );
  }

  return (
    <VStack gap="lg">
      <div>
        <Button variant="ghost" onClick={() => navigate('/dish-categories')}>
          ← Back to Categories
        </Button>
      </div>

      <Card>
        <DishList
          dishes={dishes}
          categoryName={categoryName}
          isLoading={isLoading}
        />
      </Card>
    </VStack>
  );
}
