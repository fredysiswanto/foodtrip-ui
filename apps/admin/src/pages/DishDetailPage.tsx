import { useNavigate, useParams } from 'react-router-dom';
import {
  useRestaurantDetail,
  useUpdateRestaurant,
} from '../features/restaurant';
import { DishCard, DishForm } from '../features/dish/components';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';
import { useUpdateDish } from '../features/dish/hooks/useUpdateDish';
import { useDishDetail } from '../features/dish/hooks/useDishDetail';

export function DishDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: dish, isLoading, error } = useDishDetail(id || '');
  const { mutate: updateDish, isPending } = useUpdateDish();

  const handleSubmit = async (data: any) => {
    if (!id) return;

    updateDish(
      { id, data },
      {
        onSuccess: () => {
          navigate('/dishes');
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

  if (error || !dish) {
    return (
      <VStack gap="lg">
        <Alert type="error">Failed to load dish details</Alert>
        <Button onClick={() => navigate('/dishes')}>Back to Dishes</Button>
      </VStack>
    );
  }

  return (
    <VStack gap="lg">
      <div>
        <Button variant="ghost" onClick={() => navigate('/dishes')}>
          ← Back to Dishes
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Dish</h1>
      </div>

      <DishCard dish={dish} />

      <Card>
        <DishForm
          initialData={dish}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </Card>
    </VStack>
  );
}
