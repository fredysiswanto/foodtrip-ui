import { DishType } from '@foodtrip/types';
import { Card, VStack, Badge, HStack, Button } from '@foodtrip/ui';

export interface RestoDishCardProps {
  dish: DishType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function RestoDishCard({ dish, onEdit, onDelete }: RestoDishCardProps) {
  return (
    <Card className="h-full flex flex-col">
      {dish.dish_name && (
        <img
          src={dish.dish_img}
          alt={dish.dish_name}
          className="w-full h-48 object-cover rounded-t-lg -m-6 mb-4"
        />
      )}

      <VStack gap="sm" className="flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {dish.dish_name}
          </h3>
          <p className="text-sm text-gray-500">{dish.dish_desc}</p>
        </div>

        {dish.status && <Badge variant="info">{dish.status}</Badge>}

        {dish.dish_category && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {dish.dish_category.dishcatg_name}
          </p>
        )}

        {dish.status && (
          <p className="text-lg font-semibold">{dish.status} ⭐</p>
        )}

        {(onEdit || onDelete) && (
          <HStack gap="sm" className="mt-auto pt-4">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(dish.dish_id)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(dish.dish_id)}
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
