import { z } from 'zod';
import { AuditFieldsSchema } from './common';
export const RestaurantCategorySchema = z
  .object({
    restocatg_id: z.string().uuid(),
    restocatg_name: z.string(),
  })
  .merge(AuditFieldsSchema);
export type RestaurantCategoryType = z.infer<typeof RestaurantCategorySchema>;

export const RestaurantCategoryListSchema = z.object({
  draw: z.number(),
  data: z.array(RestaurantCategorySchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type RestaurantCategoryListResponseType = z.infer<
  typeof RestaurantCategoryListSchema
>;
