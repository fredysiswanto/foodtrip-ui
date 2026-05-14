/**
 * Restaurant Admin - Dish Management Page
 */

import { useNavigate } from 'react-router-dom';
import { useRestoDishList } from '../hooks/useRestoDishList';
import { Alert, Button, Card, Spinner, VStack } from '@foodtrip/ui';
import { RestoDishTable } from '../components';

export function RestoDishListPage() {
  const restoID = window.localStorage.getItem('resto_id'); // Replace with actual logic to get current restaurant ID
  const navigate = useNavigate();
  const {
    data: dishes = [],
    isLoading,
    error,
  } = useRestoDishList(restoID || '');

  const handleEdit = (id: string) => {
    navigate(`/restaurant-admin/dishes/${id}/edit`);
  };
  const handleDelete = (id: string) => {
    navigate(`/restaurant-admin/dishes/${id}`);
  };
  const handleView = (id: string) => {
    navigate(`/restaurant-admin/dishes/${id}`);
  };

  return (
    <VStack gap="lg">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dish Management</h1>
          <p className="text-gray-600">Manage all dishes in the system</p>
        </div>
        <Button
          onClick={() => navigate('/restaurant-admin/dishes/new')}
          variant="primary"
        >
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
          <Button onClick={() => navigate('/restaurant-admin/dishes/new')}>
            Create your first dish
          </Button>
        </Card>
      ) : (
        <Card className="w-full overflow-x-auto">
          <RestoDishTable
            dishes={dishes}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </Card>
      )}
    </VStack>
  );
}
