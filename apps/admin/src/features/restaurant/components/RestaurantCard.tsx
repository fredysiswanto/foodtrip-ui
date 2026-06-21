import { RestaurantType } from '@foodtrip/types';
import { Card, VStack, Badge, HStack, Button } from '@foodtrip/ui';

export interface RestaurantCardProps {
  restaurant: RestaurantType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function RestaurantCard({
  restaurant,
  onEdit,
  onDelete,
}: RestaurantCardProps) {
  return (
    <Card className="h-full flex flex-col">
      {restaurant.name && (
        <img
          // src={restaurant.img}
          // alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-lg -m-6 mb-4"
        />
      )}

      <VStack gap="sm" className="flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {restaurant.name}
          </h3>
          <p className="text-sm text-gray-500">{restaurant.address}</p>
        </div>

        {restaurant.isOpen && <Badge variant="info">{restaurant.status}</Badge>}

        {restaurant.phone && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {restaurant.phone}
          </p>
        )}

        <div className="space-y-1 text-sm">
          {restaurant.phone && (
            <p className="text-gray-600">📞 {restaurant.phone}</p>
          )}
          {restaurant.email && (
            <p className="text-gray-600">✉️ {restaurant.email}</p>
          )}
          {/* {restaurant.website && (
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              🌐 Visit Website
            </a>
          )} */}
        </div>

        {restaurant.isAvailable && (
          <p className="text-lg font-semibold">{restaurant.isAvailable} ⭐</p>
        )}

        {(onEdit || onDelete) && (
          <HStack gap="sm" className="mt-auto pt-4">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(restaurant.id)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(restaurant.id)}
              >
                Delete
              </Button>
            )}
          </HStack>
        )}
      </VStack>
    </Card>
  );
}
