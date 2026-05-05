import { z } from 'zod';
import { AuditFieldsSchema } from './common';

/**
 * Dish entity schema
 * Represents a dish in the system
 */
export const DishSchema = z
  .object({
    dish_img: z.string().url(),
    dish_id: z.string().uuid(),
    dish_no: z.string(),
    dish_name: z.string().min(2).max(100),
    dish_desc: z.string().max(255).optional(),
    dish_price: z.string().regex(/^\d+(\.\d{1,2})?$/),
    status: z.string(),
    dishcatg_id: z.string().uuid(),
    resto_id: z.string().uuid(),
  })
  .merge(AuditFieldsSchema);

export type DishType = z.infer<typeof DishSchema>;

/**
 * Create dish request schema
 */
export const CreateDishSchema = z.object({
  dish_name: z
    .string()
    .min(2, 'Dish name must be at least 2 characters')
    .max(100),
  dish_desc: z.string().max(255).optional(),
  dish_price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number'),
  dishcatg_id: z.string().uuid('Valid category ID is required'),
  resto_id: z.string().uuid('Valid restaurant ID is required'),
  status: z.string().default('Available'),
  dish_img: z.string().optional(),
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
export const DishListSchema = z.object({
  draw: z.number(),
  data: z.array(DishSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type DishListResponseType = z.infer<typeof DishListSchema>;

/**
 * Single dish response
 */
export const DishDetailSchema = z.object({
  data: DishSchema,
});

export type DishDetailResponseType = z.infer<typeof DishDetailSchema>;
