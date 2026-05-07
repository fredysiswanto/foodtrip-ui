import { DishInCategoryType } from '@foodtrip/types';
import { Table, Spinner } from '@foodtrip/ui';

export interface DishListProps {
  dishes: DishInCategoryType[];
  categoryName: string;
  isLoading?: boolean;
}

export function DishList({ dishes, categoryName, isLoading }: DishListProps) {
  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{categoryName}</h2>
        <p className="text-gray-600">
          {dishes?.length || 0} dishes in this category
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              key: 'dish_no',
              label: 'Number',
              align: 'left',
            },
            {
              key: 'dish_name',
              label: 'Dish Name',
              align: 'left',
            },
            {
              key: 'dish_price',
              label: 'Price',
              render: (price: string) => `$${price}`,
              align: 'right',
            },
            {
              key: 'status',
              label: 'Status',
              render: (status: string) => (
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    status === 'Available'
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
          data={dishes || []}
          rowKey="dish_id"
          striped
          hoverable
          emptyMessage="No dishes in this category"
        />
      </div>
    </div>
  );
}
