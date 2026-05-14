import { RestaurantInCategoryType } from '@foodtrip/types';
import { Table, Spinner } from '@foodtrip/ui';

export interface RestaurantListProps {
  restaurants: RestaurantInCategoryType[];
  categoryName: string;
  isLoading?: boolean;
}

export function RestaurantList({
  restaurants,
  categoryName,
  isLoading,
}: RestaurantListProps) {
  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{categoryName}</h2>
        <p className="text-gray-600">
          {restaurants?.length || 0} restaurants in this category
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              key: 'resto_no',
              label: 'Number',
              align: 'left',
            },
            {
              key: 'resto_name',
              label: 'Restaurant Name',
              align: 'left',
            },
            {
              key: 'resto_email',
              label: 'Email',
              align: 'left',
            },
            {
              key: 'resto_phone',
              label: 'Phone',
              align: 'left',
            },
            {
              key: 'status',
              label: 'Status',
              render: (status: string) => (
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    status === 'Open'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {status}
                </span>
              ),
              align: 'center',
            },
          ]}
          data={restaurants || []}
          rowKey="resto_id"
          striped
          hoverable
          emptyMessage="No restaurants in this category"
        />
      </div>
    </div>
  );
}
