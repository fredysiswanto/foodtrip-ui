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
      {restaurant.resto_name && (
        <img
          src={restaurant.resto_img}
          alt={restaurant.resto_name}
          className="w-full h-48 object-cover rounded-t-lg -m-6 mb-4"
        />
      )}

      <VStack gap="sm" className="flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {restaurant.resto_name}
          </h3>
          <p className="text-sm text-gray-500">{restaurant.resto_landline}</p>
        </div>

        {restaurant.status && <Badge variant="info">{restaurant.status}</Badge>}

        {restaurant.resto_phone && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {restaurant.resto_phone}
          </p>
        )}

        <div className="space-y-1 text-sm">
          {restaurant.resto_phone && (
            <p className="text-gray-600">📞 {restaurant.resto_phone}</p>
          )}
          {restaurant.resto_email && (
            <p className="text-gray-600">✉️ {restaurant.resto_email}</p>
          )}
          {restaurant.resto_website && (
            <a
              href={restaurant.resto_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              🌐 Visit Website
            </a>
          )}
        </div>

        {restaurant.status && (
          <p className="text-lg font-semibold">{restaurant.status} ⭐</p>
        )}

        {(onEdit || onDelete) && (
          <HStack gap="sm" className="mt-auto pt-4">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(restaurant.resto_id)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(restaurant.resto_id)}
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
