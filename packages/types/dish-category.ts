import { z } from 'zod';
import { CategorySchema } from './global';

/**
 * Dish entity within category (simplified for list response)
 */
export const DishInCategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export type DishInCategoryType = z.infer<typeof DishInCategorySchema>;

/**
 * Dish category entity schema
 * Represents a dish category in the system
 */
export const DishCategorySchema = CategorySchema.pick({
  id: true,
  name: true,
  slug: true,
  description: true,
  createdAt: true,
  updatedAt: true,
});

export type DishCategoryType = z.infer<typeof DishCategorySchema>;

/**
 * Dish category with dishes array (for detail view)
 */
export const DishCategoryWithDishesSchema = DishCategorySchema.extend({
  dishes: z.array(DishInCategorySchema).optional(),
});

export type DishCategoryWithDishesType = z.infer<
  typeof DishCategoryWithDishesSchema
>;

/**
 * Create dish category schema
 */
export const CreateDishCategorySchema = z.object({
  dishcatg_name: z.string().min(1, 'Category name is required'),
});

export type CreateDishCategoryInputType = z.infer<
  typeof CreateDishCategorySchema
>;

/**
 * Update dish category schema
 */
export const UpdateDishCategorySchema = CreateDishCategorySchema.partial();

export type UpdateDishCategoryInputType = z.infer<
  typeof UpdateDishCategorySchema
>;

/**
 * Dish category list response (with dishes)
 */
export const DishCategoryListSchema = z.object({
  draw: z.number(),
  data: z.array(DishCategoryWithDishesSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type DishCategoryListResponseType = z.infer<
  typeof DishCategoryListSchema
>;

/**
 * Single dish category response
 */
export const DishCategoryDetailSchema = z.object({
  data: DishCategoryWithDishesSchema,
});

export type DishCategoryDetailResponseType = z.infer<
  typeof DishCategoryDetailSchema
>;
