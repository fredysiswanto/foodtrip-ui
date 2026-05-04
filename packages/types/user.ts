import { z } from 'zod';
import { AuditFieldsSchema } from './common';
export const RestaurantAdminSchema = z
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
  })
  .merge(AuditFieldsSchema);
export type RestaurantAdminType = z.infer<typeof RestaurantAdminSchema>;
