import { z } from 'zod';
import { AuditFieldsSchema } from './common';

/**
 * Dish entity within category (simplified for list response)
 */
export const DishInCategorySchema = z.object({
  dish_img: z.string().url().optional(),
  dish_id: z.string().uuid(),
  dish_no: z.string(),
  dish_name: z.string(),
  dish_desc: z.string(),
  dish_price: z.string(),
  status: z.string(),
  dishcatg_id: z.string().uuid(),
  resto_id: z.string().uuid(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  deleted_by: z.string().uuid().nullable(),
  date_created: z.string().datetime(),
  date_updated: z.string().datetime(),
  date_deleted: z.string().datetime().nullable(),
});

export type DishInCategoryType = z.infer<typeof DishInCategorySchema>;

/**
 * Dish category entity schema
 * Represents a dish category in the system
 */
export const DishCategorySchema = z
  .object({
    dishcatg_id: z.string().uuid(),
    dishcatg_name: z.string().min(2).max(100),
  })
  .merge(AuditFieldsSchema);

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
