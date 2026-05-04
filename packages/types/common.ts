import { z } from 'zod';
export const AuditFieldsSchema = z.object({
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  deleted_by: z.string().uuid().nullable(),
  date_created: z.string().datetime(),
  date_updated: z.string().datetime(),
  date_deleted: z.string().datetime().nullable(),
});
export type AuditFields = z.infer<typeof AuditFieldsSchema>;
