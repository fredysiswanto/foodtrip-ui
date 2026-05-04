import { z } from 'zod';
import { AuditFieldsSchema } from './common';
export const RestaurantCategorySchema = z
  .object({
    restocatg_id: z.string().uuid(),
    restocatg_name: z.string(),
  })
  .merge(AuditFieldsSchema);
export type RestaurantCategory = z.infer<typeof RestaurantCategorySchema>;
