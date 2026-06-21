import { RestaurantType } from '@foodtrip/types';
import { Table, Button, Badge } from '@foodtrip/ui';

export interface RestaurantTableProps {
  restaurants: RestaurantType[];
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
      key: 'phone',
      label: 'Phone',
      render: (value: string) => (
        <span className="text-sm text-gray-600">{value}</span>
      ),
    },
    {
      key: 'phone',
      label: 'Restaurant No.',
      render: (value: string) => (
        <Badge variant={value ? 'info' : 'default'}>{value || 'N/A'}</Badge>
      ),
    },
    // {
    //   key: 'category',
    //   label: 'Resto Category',
    //   render: (value: { restocatg_name?: string } | null) => (
    //     <span className="font-semibold">{value?.restocatg_name || 'N/A'}</span>
    //   ),
    // },
    {
      key: 'isAvailable',
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
            variant="primary"
            onClick={() => onEdit(value)}
            disabled={isLoading}
            className="px-2 py-1"
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(value)}
            disabled={isLoading}
            className="p-1"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table columns={columns} data={restaurants} rowKey="id" striped hoverable />
  );
}
