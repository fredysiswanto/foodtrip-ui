import { useNavigate } from 'react-router-dom';
import { CreateRestaurantInput, useCreateRestaurant } from '..';
import { RestaurantForm } from '../components';
import { Button, Card, VStack } from '@foodtrip/ui';

export function RestaurantCreatePage() {
  const navigate = useNavigate();
  const { mutate: createRestaurant, isPending } = useCreateRestaurant();

  const handleSubmit = async (data: CreateRestaurantInput) => {
    createRestaurant(data, {
      onSuccess: () => {
        navigate('/restaurants');
      },
    });
  };

  return (
    <VStack gap="lg">
      <div>
        <Button variant="ghost" onClick={() => navigate('/restaurants')}>
          ← Back to Restaurants
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Create New Restaurant
        </h1>
      </div>

      <Card>
        <RestaurantForm onSubmit={handleSubmit} isLoading={isPending} />
      </Card>
    </VStack>
  );
}
