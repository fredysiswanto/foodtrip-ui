import { z } from 'zod';
import { AuditFieldsSchema } from './common';
import { DishSchema } from './dish';

/**
 * Trip entity schema
 * Represents a trip/journey with multiple dishes for a customer
 */
export const TripSchema = z
  .object({
    trip_id: z.string().uuid(),
    trip_no: z.string(),
    trip_name: z.string().min(2).max(100),
    trip_desc: z.string().max(500).optional(),
    trip_image: z.string().url().optional(),
    customer_id: z.string().uuid(),
    status: z.enum(['Draft', 'Active', 'Completed', 'Archived']),
    is_public: z.boolean().default(false),
  })
  .merge(AuditFieldsSchema);

export type TripType = z.infer<typeof TripSchema>;

/**
 * Trip with dishes (detail view)
 */
export const TripDetailSchema = TripSchema.extend({
  dishes: z.array(DishSchema).optional(),
  dish_count: z.number().int().nonnegative().optional(),
});

export type TripDetailType = z.infer<typeof TripDetailSchema>;

/**
 * Create trip request schema
 */
export const CreateTripSchema = z.object({
  trip_name: z
    .string()
    .min(2, 'Trip name must be at least 2 characters')
    .max(100),
  trip_desc: z.string().max(500).optional(),
  trip_image: z.string().url().optional(),
  is_public: z.boolean().default(false),
  customer_id: z.string().uuid('Valid customer ID is required'),
});

export type CreateTripInputType = z.infer<typeof CreateTripSchema>;

/**
 * Update trip request schema
 */
export const UpdateTripSchema = CreateTripSchema.partial();

export type UpdateTripInputType = z.infer<typeof UpdateTripSchema>;

/**
 * Add dish to trip request
 */
export const AddDishToTripSchema = z.object({
  trip_id: z.string().uuid('Valid trip ID is required'),
  dish_id: z.string().uuid('Valid dish ID is required'),
});

export type AddDishToTripInputType = z.infer<typeof AddDishToTripSchema>;

/**
 * Trip list response
 */
export const TripListSchema = z.object({
  draw: z.number(),
  data: z.array(TripSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type TripListResponseType = z.infer<typeof TripListSchema>;

/**
 * Single trip response
 */
export const TripDetailResponseSchema = z.object({
  data: TripDetailSchema,
});

export type TripDetailResponseType = z.infer<typeof TripDetailResponseSchema>;
