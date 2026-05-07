import React from 'react';
import { DishCategoryWithDishesType } from '@foodtrip/types';
import { Table, Button, Badge, Spinner } from '@foodtrip/ui';

export interface DishCategoryTableProps {
  categories: DishCategoryWithDishesType[];
  isLoading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  onViewDishes?: (categoryId: string, categoryName: string) => void;
}

export function DishCategoryTable({
  categories,
  isLoading,
  onEdit,
  onDelete,
  onViewDishes,
}: DishCategoryTableProps) {
  const [deleting, setDeleting] = React.useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}" and unassign all dishes?`)) {
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
            key: 'dishcatg_name',
            label: 'Category Name',
            align: 'left',
          },
          {
            key: 'dishes',
            label: 'Dishes',
            render: (dishes: { length: number }) => (
              <Badge variant="info">{dishes?.length || 0} dishes</Badge>
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
            key: 'dishcatg_id',
            label: 'Actions',
            render: (_, row: DishCategoryWithDishesType) => (
              <div className="space-x-2 flex justify-center">
                {onViewDishes && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      onViewDishes(row.dishcatg_id, row.dishcatg_name)
                    }
                  >
                    View
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => onEdit(row.dishcatg_id)}
                  disabled={deleting === row.dishcatg_id}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={deleting === row.dishcatg_id}
                  onClick={() =>
                    handleDelete(row.dishcatg_id, row.dishcatg_name)
                  }
                >
                  {deleting === row.dishcatg_id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            ),
            align: 'center',
          },
        ]}
        data={categories}
        rowKey="dishcatg_id"
        striped
        hoverable
        emptyMessage="No dish categories found"
      />
    </div>
  );
}
