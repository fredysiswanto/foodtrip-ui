import { z } from 'zod';

/**
 * Restaurant entity schema
 * Represents a restaurant in the system
 */
export const RestaurantSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  cuisine: z.string().optional().nullable(),
  rating: z.number().min(0).max(5).optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  website: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type Restaurant = z.infer<typeof RestaurantSchema>;

/**
 * Create restaurant request schema
 */
export const CreateRestaurantSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  cuisine: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type CreateRestaurantInput = z.infer<typeof CreateRestaurantSchema>;

/**
 * Update restaurant request schema
 */
export const UpdateRestaurantSchema = CreateRestaurantSchema.partial();

export type UpdateRestaurantInput = z.infer<typeof UpdateRestaurantSchema>;

/**
 * Restaurant list response
 */
export const RestaurantListSchema = z.object({
  data: z.array(RestaurantSchema),
  pagination: z
    .object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      pages: z.number(),
    })
    .optional(),
});

export type RestaurantListResponse = z.infer<typeof RestaurantListSchema>;

/**
 * Single restaurant response
 */
export const RestaurantDetailSchema = z.object({
  data: RestaurantSchema,
});

export type RestaurantDetailResponse = z.infer<typeof RestaurantDetailSchema>;
