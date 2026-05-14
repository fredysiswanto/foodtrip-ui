import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  useRestaurantCategoryDetail,
  RestaurantList,
} from '../features/resto-category';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

interface LocationState {
  categoryName?: string;
}

export function RestaurantCategoryRestaurantsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { categoryName: stateCategory } = (location.state ||
    {}) as LocationState;

  const {
    data: category,
    isLoading,
    error,
  } = useRestaurantCategoryDetail(id || '');

  const categoryName = stateCategory || category?.restocatg_name || 'Category';
  const restaurants = category?.restaurants || [];

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
      </div>

      <Card>
        <RestaurantList
          restaurants={restaurants}
          categoryName={categoryName}
          isLoading={isLoading}
        />
      </Card>
    </VStack>
  );
}
