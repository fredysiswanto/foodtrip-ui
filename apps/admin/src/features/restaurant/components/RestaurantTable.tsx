import { Restaurant } from '@foodtrip/types';
import { Table, Button, Badge } from '@foodtrip/ui';

export interface RestaurantTableProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RestaurantTable({
  restaurants,
  isLoading,
  onEdit,
  onDelete,
}: RestaurantTableProps) {
  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'address',
      label: 'Address',
      render: (value: string) => (
        <span className="text-sm text-gray-600 line-clamp-2">{value}</span>
      ),
    },
    {
      key: 'cuisine',
      label: 'Cuisine',
      render: (value: string) => (
        <Badge variant={value ? 'info' : 'default'}>{value || 'N/A'}</Badge>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value: number) => (
        <span className="font-semibold">
          {value ? `${value.toFixed(1)} ⭐` : 'N/A'}
        </span>
      ),
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'success' : 'warning'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value: string) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(value)}
            disabled={isLoading}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(value)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={restaurants}
      rowKey="id"
      striped
      hoverable
    />
  );
}
