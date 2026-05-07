import { useState } from 'react';
import { UserWithRestaurantType } from '@foodtrip/types';
import { Table, Button, Badge, Spinner } from '@foodtrip/ui';

export interface UserTableProps {
  users: UserWithRestaurantType[];
  isLoading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export function UserTable({
  users,
  isLoading,
  onEdit,
  onDelete,
}: UserTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    try {
      setDeleting(id);
      await onDelete(id);
    } finally {
      setDeleting(null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'admin':
        return 'danger';
      case 'resto_admin':
        return 'warning';
      case 'user':
        return 'info';
      default:
        return 'default';
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="overflow-x-auto">
      <Table
        columns={[
          {
            key: 'user_no',
            label: 'User No',
            render: (value: string) => (
              <span className="font-mono text-sm">{value}</span>
            ),
          },
          {
            key: 'first_name',
            label: 'Name',
            render: (_, row: UserWithRestaurantType) =>
              `${row.first_name} ${row.middle_name ? row.middle_name + ' ' : ''}${row.last_name}`,
          },
          {
            key: 'email_address',
            label: 'Email',
          },
          {
            key: 'user_type',
            label: 'User Type',
            render: (type: string) => (
              <Badge size="md" variant={getTypeColor(type)}>
                {type}
              </Badge>
            ),
          },
          {
            key: 'restaurant',
            label: 'Restaurant',
            render: (_, row: UserWithRestaurantType) =>
              'restaurant' in row && row.restaurant
                ? row.restaurant.resto_name
                : '-',
          },
          {
            key: 'date_created',
            label: 'Created',
            render: (date: string) => new Date(date).toLocaleDateString(),
          },
          {
            key: 'user_id',
            label: 'Actions',
            render: (_, row: UserWithRestaurantType) => (
              <div className="space-x-2 flex justify-center">
                <Button
                  size="md"
                  onClick={() => onEdit(row.user_id)}
                  disabled={deleting === row.user_id}
                >
                  Edit
                </Button>
                <Button
                  size="md"
                  variant="danger"
                  disabled={deleting === row.user_id}
                  onClick={() => handleDelete(row.user_id)}
                >
                  {deleting === row.user_id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            ),
          },
        ]}
        data={users}
        rowKey="user_id"
        striped
        hoverable
      />
    </div>
  );
}
