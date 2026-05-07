import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserList, useDeleteUser, UserTable } from '../features/user';
import { Card, Spinner, Alert } from '@foodtrip/ui';

type UserType = 'admin' | 'resto-admin' | 'customer';

export function UserListPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<UserType>('resto-admin');
  const { data, isLoading, error } = useUserList({
    typeUser: selectedType,
    page: 1,
    limit: 10,
  });
  const { mutate: deleteUser } = useDeleteUser();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>

      {/* Type Filter Tabs */}
      <div className="flex gap-2 border-b">
        {(['admin', 'resto-admin', 'customer'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 font-medium transition ${
              selectedType === type
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {type === 'admin'
              ? 'Admin Users'
              : type === 'resto-admin'
                ? 'Restaurant Admins'
                : 'Customers'}
          </button>
        ))}
      </div>

      {/* Content */}
      {error && (
        <Alert type="error">
          {error instanceof Error ? error.message : 'Failed to load users'}
        </Alert>
      )}

      {isLoading ? (
        <Card>
          <Spinner />
        </Card>
      ) : (
        <Card>
          <UserTable
            users={data || []}
            onEdit={(id) => navigate(`/admin/users/${id}`)}
            onDelete={(id) =>
              new Promise<void>((resolve) => {
                deleteUser(id, {
                  onSuccess: () => resolve(),
                });
              })
            }
          />
        </Card>
      )}
    </div>
  );
}
