import { z } from 'zod';

import { RestaurantCategorySchema } from './restauran-category';
import { RestaurantAdminSchema } from './user';

/**
 * Restaurant entity schema
 * Represents a restaurant in the system
 */

export const RestaurantSchema = z.object({
  resto_img: z.string().url(),
  resto_id: z.string().uuid(),
  resto_no: z.string(),
  resto_name: z.string(),
  resto_email: z.string().email(),
  resto_phone: z.string(),
  resto_landline: z.string(),
  resto_website: z.string().optional(),
  restocatg_id: z.string().uuid(),
  status: z.string(),
  restaurant_category: RestaurantCategorySchema.nullable(),
  restoadmin: RestaurantAdminSchema.nullable(),
});

export type RestaurantType = z.infer<typeof RestaurantSchema>;

/**
 * Create restaurant request schema
 */
export const CreateRestaurantSchema = z.object({
  resto_name: z.string().min(1, 'Restaurant name is required'),
  resto_email: z.string().email('Valid email is required').optional(),
  resto_phone: z.string().optional(),
  resto_landline: z.string().optional(),
  resto_website: z.string().optional(),
  restocatg_id: z.string().uuid('Valid category ID is required'),
  status: z.string().default('Open'),
  resto_img: z.string().optional(),
});

export type CreateRestaurantInputType = z.infer<typeof CreateRestaurantSchema>;

/**
 * Update restaurant request schema
 */
export const UpdateRestaurantSchema = CreateRestaurantSchema.partial();

export type UpdateRestaurantInputType = z.infer<typeof UpdateRestaurantSchema>;

/**
 * Restaurant list response
 */
export const RestaurantListSchema = z.object({
  draw: z.number(),
  data: z.array(RestaurantSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type RestaurantListResponseType = z.infer<typeof RestaurantListSchema>;

/**
 * Single restaurant response
 */
export const RestaurantDetailSchema = z.object({
  data: RestaurantSchema,
});

export type RestaurantDetailResponseType = z.infer<
  typeof RestaurantDetailSchema
>;
