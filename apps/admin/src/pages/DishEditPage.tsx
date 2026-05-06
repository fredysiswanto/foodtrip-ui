import { useNavigate, useParams } from 'react-router-dom';
import { DishForm, useDishDetail, useUpdateDish } from '../features/dish';
import { Button, Card, VStack, Spinner, Alert } from '@foodtrip/ui';
import { CreateDishInputType } from '@foodtrip/types';

export function DishEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: dish, isLoading, error } = useDishDetail(id || '');
  const { mutate: updateDish, isPending } = useUpdateDish();

  const handleSubmit = async (data: CreateDishInputType) => {
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
    <VStack gap="lg">
      <div>
        <Button variant="ghost" onClick={() => navigate(`/dishes/${id}`)}>
          ← Back to Dish
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Edit Dish</h1>
        <p className="text-gray-600">{dish.dish_name}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Card className="space-y-6 w-full sm:w-1/2">
          {dish.dish_img && (
            <img
              src={dish.dish_img}
              alt={dish.dish_name}
              className="w-full h-80 object-cover rounded-lg"
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Restaurant</p>
              <p className="text-lg font-semibold">
                {dish.restaurant?.resto_name || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="text-lg font-semibold">
                {dish.dish_category?.dishcatg_name || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-lg font-semibold">${dish.dish_price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold">{dish.status}</p>
            </div>
          </div>

          {dish.dish_desc && (
            <div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-gray-700 mt-2">{dish.dish_desc}</p>
            </div>
          )}
        </Card>

        <Card className="w-full sm:w-3/4">
          <DishForm
            initialData={dish}
            onSubmit={handleSubmit}
            isLoading={isPending}
          />
        </Card>
      </div>
    </VStack>
  );
}
