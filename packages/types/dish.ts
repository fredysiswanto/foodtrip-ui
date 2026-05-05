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

export const DishListSchema = z.object({
  draw: z.number(),
  data: z.array(DishSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type DishListResponseType = z.infer<typeof DishListSchema>;
