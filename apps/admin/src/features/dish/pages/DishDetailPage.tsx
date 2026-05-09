import { useNavigate, useParams } from 'react-router-dom';
import { useDishDetail, useDeleteDish } from '..';
import { Button, Card, VStack, Spinner, Alert, Modal } from '@foodtrip/ui';
import { useState } from 'react';

export function DishDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: dish, isLoading, error } = useDishDetail(id || '');
  const { mutate: deleteDish, isPending: isDeleting } = useDeleteDish();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    if (!id) return;
    deleteDish(id, {
      onSuccess: () => {
        navigate('/admin/dishes');
      },
    });
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
        <Button onClick={() => navigate('/admin/dishes')}>
          Back to Dishes
        </Button>
      </VStack>
    );
  }

  return (
    <VStack gap="lg">
      <div className="w-full flex justify-between items-center">
        <div>
          <Button variant="ghost" onClick={() => navigate('/admin/dishes')}>
            ← Back to Dishes
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            {dish.dish_name}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="border"
            onClick={() => navigate(`/admin/dishes/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>

      <Card className="space-y-6">
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

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        onConfirm={handleDelete}
        isDangerous
        isLoading={isDeleting}
      >
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete "{dish.dish_name}"? This action cannot
          be undone.
        </p>
      </Modal>
    </VStack>
  );
}
