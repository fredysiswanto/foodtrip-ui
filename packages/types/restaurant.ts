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
export type Restaurant = RestaurantType; // Backward compatibility alias

/**
 * Create restaurant request schema
 * Matches the form UI expectations
 */
export const CreateRestaurantSchema = z.object({
  name: z.string().min(2, 'Restaurant name is required'),
  address: z.string().min(5, 'Address is required'),
  cuisine: z.string().min(1, 'Cuisine type is required'),
  rating: z.number().min(0).max(5).optional(),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
  website: z.string().url('Valid URL is required').optional(),
  image: z.string().url('Valid URL is required').optional(),
  description: z.string().max(500).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  restocatg_id: z.string().uuid('Valid category ID is required').optional(),
  status: z.string().default('Open').optional(),
});

export type CreateRestaurantInputType = z.infer<typeof CreateRestaurantSchema>;
export type CreateRestaurantInput = CreateRestaurantInputType; // Backward compatibility alias

/**
 * Update restaurant request schema
 */
export const UpdateRestaurantSchema = CreateRestaurantSchema.partial();

export type UpdateRestaurantInputType = z.infer<typeof UpdateRestaurantSchema>;
export type UpdateRestaurantInput = UpdateRestaurantInputType; // Backward compatibility alias

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
