import { useNavigate } from 'react-router-dom';
import { CreateDishInputType, DishForm, useCreateDish } from '@/features/dish';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';

export function DishCreatePage() {
  const navigate = useNavigate();
  const { mutate: createDish, isPending, error } = useCreateDish();

  const handleSubmit = async (data: CreateDishInputType) => {
    createDish(data, {
      onSuccess: () => {
        navigate('/admin/dishes');
      },
    });
  };

  return (
    <VStack gap="lg">
      <div>
        <Button variant="ghost" onClick={() => navigate('/admin/dishes')}>
          ← Back to Dishes
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Create New Dish
        </h1>
        <p className="text-gray-600">Add a new dish to the system</p>
      </div>

      {error && (
        <Alert type="error" closeable>
          {error instanceof Error ? error.message : 'Failed to create dish'}
        </Alert>
      )}

      {isPending ? (
        <Card className="flex justify-center items-center py-12 w-full">
          <Spinner size="lg" />
        </Card>
      ) : (
        <Card className="max-w-2xl">
          <DishForm onSubmit={handleSubmit} isLoading={isPending} />
        </Card>
      )}
    </VStack>
  );
}
