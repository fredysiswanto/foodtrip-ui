import { DishType } from '@foodtrip/types';
import { Card, VStack, Badge, HStack, Button } from '@foodtrip/ui';

export interface DishCardProps {
  dish: DishType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DishCard({ dish, onEdit, onDelete }: DishCardProps) {
  return (
    <Card className="h-full flex flex-col">
      {dish.name && (
        <img
          // src={dish.dish_img}
          // alt={dish.dish_name}
          className="w-full h-48 object-cover rounded-t-lg -m-6 mb-4"
        />
      )}

      <VStack gap="sm" className="flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
          <p className="text-sm text-gray-500">{dish.description}</p>
        </div>

        {dish.isAvailable && (
          <Badge variant="info">
            {dish.isAvailable ? 'Available' : 'Not Available'}
          </Badge>
        )}

        {dish.category?.name && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {dish.category.name}
          </p>
        )}

        {/* {dish.isFeatured && (
          <p className="text-lg font-semibold">
            {dish.isFeatured ? 'Featured' : 'Not Featured'} ⭐
          </p>
        )} */}

        {(onEdit || onDelete) && (
          <HStack gap="sm" className="mt-auto pt-4">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(dish.id)}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(dish.id)}
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
