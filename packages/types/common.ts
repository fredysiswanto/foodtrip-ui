import { z } from 'zod';

/**
 * Audit fields included in most entities
 */
export const AuditFieldsSchema = z.object({
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  deleted_by: z.string().uuid().nullable(),
  date_created: z.string().datetime(),
  date_updated: z.string().datetime(),
  date_deleted: z.string().datetime().nullable(),
});

export type AuditFieldsType = z.infer<typeof AuditFieldsSchema>;

export const MetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().positive(),
  previousPage: z.number().int().positive().nullable(),
  nextPage: z.number().int().positive().nullable(),
});

export type MetaType = z.infer<typeof MetaSchema>;

/**
 * Pagination query parameters
 */
export const PaginationParamsSchema = z.object({
  meta: MetaSchema,
});

export type PaginationParamsType = z.infer<typeof PaginationParamsSchema>;

/**
 * Generic list response wrapper (matches API response format)
 */
export const ListResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean().default(true),
    message: z.string().optional(),
    data: z.array(dataSchema),
    meta: MetaSchema.optional(),
    statusCode: z.number().int(),
    error: z.string().optional(),
  });

/**
 * Generic detail response wrapper
 */
export const DetailResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
  });

/**
 * Generic API error response
 */
export const ApiErrorResponseSchema = z.object({
  success: z.boolean().default(false),
  message: z.string().optional(),
  data: z.null(),
  statusCode: z.number().int(),
  error: z.string().optional(),
});

export type ApiErrorResponseType = z.infer<typeof ApiErrorResponseSchema>;

/**
 * Generic API success response
 */
export const ApiSuccessResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    success: z.boolean().default(false),
    message: z.string().optional(),
    data: dataSchema,
    statusCode: z.number().int(),
  });

/**
 * File upload metadata
 */
export const FileMetadataSchema = z.object({
  name: z.string(),
  size: z.number().int().positive(),
  type: z.string(),
  url: z.string().url().optional(),
});

export type FileMetadataType = z.infer<typeof FileMetadataSchema>;

/**
 * Upload response
 */
export const UploadResponseSchema = z.object({
  url: z.string().url(),
  filename: z.string(),
  size: z.number(),
});

export type UploadResponseType = z.infer<typeof UploadResponseSchema>;
