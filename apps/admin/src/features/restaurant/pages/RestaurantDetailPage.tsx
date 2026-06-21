import { useNavigate, useParams } from 'react-router-dom';
import {
  CreateRestaurantInput,
  useRestaurantDetail,
  useUpdateRestaurant,
} from '..';
import { RestaurantForm } from '../components';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

export function RestaurantDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: restaurant, isLoading, error } = useRestaurantDetail(id || '');
  const { mutate: updateRestaurant, isPending } = useUpdateRestaurant();

  const handleSubmit = async (data: CreateRestaurantInput) => {
    if (!id) return;

    updateRestaurant(
      { id, data },
      {
        onSuccess: () => {
          navigate('/restaurants');
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

  if (error || !restaurant) {
    return (
      <VStack gap="lg">
        <Alert type="error">Failed to load restaurant details</Alert>
        <Button onClick={() => navigate('/restaurants')}>
          Back to Restaurants
        </Button>
      </VStack>
    );
  }

  return (
    <VStack gap="lg">
      <div>
        <Button variant="ghost" onClick={() => navigate('/restaurants')}>
          ← Back to Restaurants
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Edit Restaurant
        </h1>
      </div>

      <Card>
        <RestaurantForm
          initialData={restaurant}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </Card>
    </VStack>
  );
}
