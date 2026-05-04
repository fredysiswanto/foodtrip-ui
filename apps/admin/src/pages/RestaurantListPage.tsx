import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurantList, useDeleteRestaurant } from '../features/restaurant';
import { RestaurantTable } from '../features/restaurant/components';
import { Button, Card, VStack, Spinner, Alert, Modal } from '@foodtrip/ui';

export function RestaurantListPage() {
  const navigate = useNavigate();
  const { data: restaurants = [], isLoading, error } = useRestaurantList();
  const { mutate: deleteRestaurant } = useDeleteRestaurant();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Debug logging
  console.log('RestaurantListPage - data:', restaurants);
  console.log('RestaurantListPage - isLoading:', isLoading);
  console.log('RestaurantListPage - error:', error);

  const handleEdit = (id: string) => {
    navigate(`/admin/restaurants/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteRestaurant(selectedId);
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  return (
    <VStack gap="lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Restaurant Management
          </h1>
          <p className="text-gray-600">Manage all restaurants in the system</p>
        </div>
        <Button
          onClick={() => navigate('/admin/restaurants/new')}
          size="lg"
        >
          + Add Restaurant
        </Button>
      </div>

      {error && (
        <Alert type="error" closeable>
          {error instanceof Error 
            ? error.message 
            : 'Failed to load restaurants. Please try again.'}
        </Alert>
      )}

      {isLoading ? (
        <Card className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </Card>
      ) : restaurants.length === 0 ? (
        
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No restaurants found</p>
          <Button onClick={() => navigate('/admin/restaurants/new')}>
            Create your first restaurant
          </Button>
        </Card>
      ) : (
        <Card>
          <RestaurantTable
            restaurants={restaurants}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Card>
      )}

      <Modal
        isOpen={showDeleteModal}
        title="Delete Restaurant"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
      >
        Are you sure you want to delete this restaurant? This action cannot be undone.
      </Modal>
    </VStack>
  );
}
