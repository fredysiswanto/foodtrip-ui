import { useNavigate, useParams } from 'react-router-dom';
import { DishForm, useDishDetail, useUpdateDish } from '../features/dish';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

export function DishEditPage() {
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
          navigate(`/dishes/${id}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Card className="flex justify-center items-center py-12 w-full">
        <Spinner size="lg" />
      </Card>
    );
  }

  if (error || !dish) {
    return (
      <VStack gap="lg">
        <Alert type="error">
          {error instanceof Error ? error.message : 'Failed to load dish'}
        </Alert>
        <Button onClick={() => navigate('/dishes')}>Back to Dishes</Button>
      </VStack>
    );
  }

  return (
    <VStack gap="lg" className="px-5 py-2">
      <div>
        <Button variant="ghost" onClick={() => navigate(`/dishes/${id}`)}>
          ← Back to Dish
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Dish</h1>
        <p className="text-gray-600">{dish.dish_name}</p>
      </div>

      <Card className="max-w-2xl">
        <DishForm
          initialData={dish}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </Card>
    </VStack>
  );
}
