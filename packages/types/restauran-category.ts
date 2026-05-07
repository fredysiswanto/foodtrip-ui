import { z } from 'zod';
import { AuditFieldsSchema } from './common';

/**
 * Restaurant entity within category (simplified for list response)
 */
export const RestaurantInCategorySchema = z.object({
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
  updated_by: z.string().uuid().nullable(),
  deleted_by: z.string().uuid().nullable(),
  date_created: z.string().datetime(),
  date_updated: z.string().datetime(),
  date_deleted: z.string().datetime().nullable(),
});

export type RestaurantInCategoryType = z.infer<
  typeof RestaurantInCategorySchema
>;

/**
 * Restaurant category schema (base)
 */
export const RestaurantCategorySchema = z
  .object({
    restocatg_id: z.string().uuid(),
    restocatg_name: z.string(),
  })
  .merge(AuditFieldsSchema);

export type RestaurantCategoryType = z.infer<typeof RestaurantCategorySchema>;

/**
 * Restaurant category with restaurants array (for detail view)
 */
export const RestaurantCategoryWithRestaurantsSchema =
  RestaurantCategorySchema.extend({
    restaurants: z.array(RestaurantInCategorySchema).optional(),
    created: z.any().nullable().optional(),
  });

export type RestaurantCategoryWithRestaurantsType = z.infer<
  typeof RestaurantCategoryWithRestaurantsSchema
>;

/**
 * Create restaurant category schema
 */
export const CreateRestaurantCategorySchema = z.object({
  restocatg_name: z.string().min(1, 'Category name is required'),
});

export type CreateRestaurantCategoryInputType = z.infer<
  typeof CreateRestaurantCategorySchema
>;

/**
 * Update restaurant category schema
 */
export const UpdateRestaurantCategorySchema =
  CreateRestaurantCategorySchema.partial();

export type UpdateRestaurantCategoryInputType = z.infer<
  typeof UpdateRestaurantCategorySchema
>;

/**
 * Restaurant category list response (with restaurants)
 */
export const RestaurantCategoryListSchema = z.object({
  draw: z.number(),
  data: z.array(RestaurantCategoryWithRestaurantsSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type RestaurantCategoryListResponseType = z.infer<
  typeof RestaurantCategoryListSchema
>;

/**
 * Single restaurant category response
 */
export const RestaurantCategoryDetailSchema = z.object({
  data: RestaurantCategoryWithRestaurantsSchema,
});

export type RestaurantCategoryDetailResponseType = z.infer<
  typeof RestaurantCategoryDetailSchema
>;
