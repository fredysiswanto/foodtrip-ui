import { z } from 'zod';

import { GetApiAdminRestaurantsResponse, RestaurantBaseSchema } from './global';

/**
 * Restaurant entity schema
 * Represents a restaurant in the system
 */

export const RestaurantSchema = RestaurantBaseSchema;

export type RestaurantType = z.infer<typeof RestaurantSchema>;
export type Restaurant = RestaurantType; // Backward compatibility alias

/**
 * Create restaurant request schema
 * Matches the form UI expectations
 */
export const CreateRestaurantSchema = z.object({
  name: z.string().min(2, 'Restaurant name is required'),
  slug: z.string().min(2, 'Slug is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  province: z.string().min(2, 'Province is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
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
export const RestaurantListSchema = GetApiAdminRestaurantsResponse;

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
