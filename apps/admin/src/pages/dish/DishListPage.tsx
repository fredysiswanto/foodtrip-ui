import { useNavigate } from 'react-router-dom';
import { DishTable, useDishList } from '../../features/dish';
import { Alert, Button, Card, Spinner, VStack } from '@foodtrip/ui';

export function DishListPage() {
  const navigate = useNavigate();
  const { data: dishes = [], isLoading, error } = useDishList();
  const handelEdit = (id: string) => {
    navigate(`/admin/dishes/${id}/edit`);
  };
  const handelDelete = (id: string) => {
    navigate(`/admin/dishes/${id}`);
  };

  return (
    <VStack gap="lg">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dish Management</h1>
          <p className="text-gray-600">Manage all dishes in the system</p>
        </div>
        <Button onClick={() => navigate('/dishes/new')} variant="primary">
          + Create Dish
        </Button>
      </div>

      {error && (
        <Alert type="error" closeable>
          {error instanceof Error
            ? error.message
            : 'Failed to load dishes. Please try again.'}
        </Alert>
      )}

      {isLoading ? (
        <Card className="w-full flex justify-center items-center py-12">
          <Spinner size="lg" />
        </Card>
      ) : dishes.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No dishes found</p>
          <Button onClick={() => navigate('/dishes/new')}>
            Create your first dish
          </Button>
        </Card>
      ) : (
        <Card className="w-full overflow-x-auto">
          <DishTable
            dishes={dishes}
            isLoading={isLoading}
            onEdit={handelEdit}
            onDelete={handelDelete}
          />
        </Card>
      )}
    </VStack>
  );
}
