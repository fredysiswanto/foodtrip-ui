import { DishType } from '@foodtrip/types';
import { Table, Button } from '@foodtrip/ui';

export interface DishTableProps {
  dishes: DishType[];
  isLoading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export function DishTable({
  dishes,
  isLoading,
  onEdit,
  onDelete,
  onView,
}: DishTableProps) {
  const columns = [
    {
      key: 'restaurant',
      label: 'Restaurant Name',
      render: (value: { name: string } | null) => (
        <span className="font-medium">{value ? value.name : 'N/A'}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: { name: string } | null) => (
        <span className="text-sm text-gray-600">
          {value ? value.name : 'N/A'}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      render: (value: number) => (
        <span className="font-semibold">${value}</span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string | null) => (
        <span className="text-sm text-gray-600">{value || 'N/A'}</span>
      ),
    },
    {
      key: 'isAvailable',
      label: 'Status',
      render: (value: string) => {
        let color = 'gray';
        if (value === 'Available') color = 'green';
        else if (value === 'Unavailable') color = 'red';
        else if (value === 'Out of Stock') color = 'yellow';

        return (
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-${color}-100 text-${color}-800`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value: string) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onView(value)}
            disabled={isLoading}
            className="px-2 py-1 border border-gray-300"
          >
            View
          </Button>
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
    <Table
      sortKey="desc"
      sortDirection="asc"
      columns={columns}
      data={dishes}
      rowKey="id"
      striped
      hoverable
    />
  );
}
