import { z } from 'zod';
import { AuditFieldsSchema } from './common';

/**
 * Dish category entity schema
 * Represents a dish category in the system
 */
export const DishCategorySchema = z
  .object({
    dishcatg_id: z.string().uuid(),
    dishcatg_name: z.string().min(2).max(100),
  })
  .merge(AuditFieldsSchema);

export type DishCategoryType = z.infer<typeof DishCategorySchema>;
