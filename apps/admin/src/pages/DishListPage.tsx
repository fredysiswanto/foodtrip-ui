import { useNavigate } from 'react-router-dom';
import { DishTable, useDishList } from '../features/dish';
import { Alert, Breadcrumb, Button, Card, Spinner, VStack } from '@foodtrip/ui';

export function DishListPage() {
  const navigate = useNavigate();
  const { data: dishes = [], isLoading, error } = useDishList();
  console.log(dishes);

  return (
    <VStack gap="lg" className="px-5 py-2">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dish Management</h1>
          <p className="text-gray-600">Manage all dishes in the system</p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Dish Management', href: '/dishes' },
          ]}
        />
      </div>

      {error && (
        <Alert type="error" closeable>
          {error instanceof Error
            ? error.message
            : 'Failed to load restaurants. Please try again.'}
        </Alert>
      )}

      {isLoading ? (
        <Card className="w-full flex justify-center items-center py-12">
          <Spinner size="lg" />
        </Card>
      ) : dishes.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No dishes found</p>
          <Button onClick={() => navigate('/admin/dishes/new')}>
            Create your first dish
          </Button>
        </Card>
      ) : (
        <Card className="w-full overflow-x-auto">
          <DishTable
            dishes={dishes}
            isLoading={isLoading}
            onEdit={(id) => navigate(`/admin/dishes/${id}/edit`)}
            onDelete={(id) => navigate(`/admin/dishes/${id}/delete`)}
          />
        </Card>
      )}
    </VStack>
  );
}
