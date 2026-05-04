import { z } from 'zod';

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
  created_by: z.string().uuid().nullable(),
  updated_by: z.null(),
  deleted_by: z.null(),
  date_created: z.string().datetime(),
  date_updated: z.string().datetime(),
  date_deleted: z.null(),
  restaurant_category: z
    .object({
      restocatg_id: z.string().uuid(),
      restocatg_name: z.string(),
      created_by: z.string().uuid().nullable(),
      updated_by: z.null(),
      deleted_by: z.null(),
      date_created: z.string().datetime(),
      date_updated: z.string().datetime(),
      date_deleted: z.null(),
    })
    .nullable(),
  restoadmin: z
    .object({
      user_id: z.string().uuid(),
      resto_id: z.string().uuid(),
      user_no: z.string(),
      password: z.string(),
      first_name: z.string(),
      middle_name: z.string().nullable(),
      last_name: z.string(),
      email_address: z.string().email(),
      phone_number: z.string().nullable(),
      gender: z.string().nullable(),
      user_type: z.string(),
      created_by: z.string().uuid().nullable(),
      updated_by: z.null(),
      deleted_by: z.null(),
      date_created: z.string().datetime(),
      date_updated: z.string().datetime(),
      date_deleted: z.null(),
    })
    .nullable(),
});

export type Restaurant = z.infer<typeof RestaurantSchema>;

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
  draw: z.number(),
  data: z.array(RestaurantSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type RestaurantListResponse = z.infer<typeof RestaurantListSchema>;

/**
 * Single restaurant response
 */
export const RestaurantDetailSchema = z.object({
  data: RestaurantSchema,
});

export type RestaurantDetailResponse = z.infer<typeof RestaurantDetailSchema>;
