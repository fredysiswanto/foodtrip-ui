import { z } from 'zod';
import { DishBaseSchema, ResponseListWrapper, ResponseWrapper } from './global';
/**
 * Dish entity schema
 * Represents a dish in the system
 */

export const DishSchema = DishBaseSchema.pick({
  id: true,
  name: true,
  description: true,
  price: true,
  isAvailable: true,
  createdAt: true,
  restaurant: true,
  category: true,
});

export type DishType = z.infer<typeof DishSchema>;

/**
 * Create dish request schema
 */
export const CreateDishSchema = z.object({
  name: z.string().min(2, 'Dish name must be at least 2 characters').max(100),
  description: z.string().max(255).optional(),
  stock: z.number().int().optional(),
  slug: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number'),
  categoryId: z.string().uuid('Valid category ID is required'),
  restaurantId: z.string().uuid('Valid restaurant ID is required'),
  status: z.enum(['Available', 'Unavailable']).default('Available'),
  imageId: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(false),
  restaurantName: z.string().readonly(),
  categoryName: z.string().readonly(),
});

export type CreateDishInputType = z.infer<typeof CreateDishSchema>;

/**
 * Update dish request schema
 */
export const UpdateDishSchema = CreateDishSchema.partial();

export type UpdateDishInputType = z.infer<typeof UpdateDishSchema>;

/**
 * Dish list response
 */
export const DishListSchema = ResponseListWrapper(z.array(DishSchema));

export type DishListResponseType = z.infer<typeof DishListSchema>;

/**
 * Single dish response
 */
export const DishDetailSchema = ResponseWrapper(DishSchema);

export type DishDetailResponseType = z.infer<typeof DishDetailSchema>;
