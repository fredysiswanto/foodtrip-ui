import React from 'react';
import { RestaurantCategoryWithRestaurantsType } from '@foodtrip/types';
import { Table, Button, Badge, Spinner } from '@foodtrip/ui';

export interface RestaurantCategoryTableProps {
  categories: RestaurantCategoryWithRestaurantsType[];
  isLoading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  onViewRestaurants?: (categoryId: string, categoryName: string) => void;
}

export function RestaurantCategoryTable({
  categories,
  isLoading,
  onEdit,
  onDelete,
  onViewRestaurants,
}: RestaurantCategoryTableProps) {
  const [deleting, setDeleting] = React.useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}" and unassign all restaurants?`)) {
      return;
    }
    try {
      setDeleting(id);
      await onDelete(id);
    } finally {
      setDeleting(null);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="overflow-x-auto">
      <Table
        columns={[
          {
            key: 'restocatg_name',
            label: 'Category Name',
            align: 'left',
          },
          {
            key: 'restaurants',
            label: 'Restaurants',
            render: (restaurants: any[]) => (
              <Badge variant="info">
                {restaurants?.length || 0} restaurants
              </Badge>
            ),
            align: 'center',
          },
          {
            key: 'date_created',
            label: 'Created',
            render: (date: string) => new Date(date).toLocaleDateString(),
            align: 'left',
          },
          {
            key: 'restocatg_id',
            label: 'Actions',
            render: (_, row: RestaurantCategoryWithRestaurantsType) => (
              <div className="space-x-2 flex justify-center">
                {onViewRestaurants && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      onViewRestaurants(row.restocatg_id, row.restocatg_name)
                    }
                  >
                    View
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => onEdit(row.restocatg_id)}
                  disabled={deleting === row.restocatg_id}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={deleting === row.restocatg_id}
                  onClick={() =>
                    handleDelete(row.restocatg_id, row.restocatg_name)
                  }
                >
                  {deleting === row.restocatg_id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            ),
            align: 'center',
          },
        ]}
        data={categories}
        rowKey="restocatg_id"
        striped
        hoverable
        emptyMessage="No restaurant categories found"
      />
    </div>
  );
}
