import { useParams, useNavigate } from 'react-router-dom';
import { useUserDetail, useUpdateUser, UserForm } from '../features/user';
import { Card, Spinner, Alert } from '@foodtrip/ui';

export function UserDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    data: initialData,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useUserDetail(id);
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const handleSubmit = async (
    formData: Record<string, unknown>
  ): Promise<void> => {
    if (!id) return;
    return new Promise((resolve) => {
      updateUser(
        { id, data: formData },
        {
          onSuccess: () => {
            navigate('/admin/users');
            resolve();
          },
        }
      );
    });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>

      {detailError && (
        <Alert type="error">
          {detailError instanceof Error
            ? detailError.message
            : 'Failed to load user'}
        </Alert>
      )}

      {isLoadingDetail ? (
        <Card>
          <Spinner />
        </Card>
      ) : initialData ? (
        <Card>
          <UserForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isUpdating || isLoadingDetail}
          />
        </Card>
      ) : (
        <Alert type="error">User not found</Alert>
      )}
    </div>
  );
}
