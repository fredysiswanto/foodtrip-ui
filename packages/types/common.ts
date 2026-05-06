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

/**
 * Pagination query parameters
 */
export const PaginationParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  skip: z.number().int().nonnegative().optional(),
  sortBy: z.string().optional(),
  order: z.enum(['ASC', 'DESC']).optional(),
});

export type PaginationParamsType = z.infer<typeof PaginationParamsSchema>;

/**
 * Generic list response wrapper (matches API response format)
 */
export const ListResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    draw: z.number(),
    data: z.array(dataSchema),
    recordsFiltered: z.number(),
    recordsTotal: z.number(),
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
  error: z.boolean().default(true),
  message: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
});

export type ApiErrorResponseType = z.infer<typeof ApiErrorResponseSchema>;

/**
 * Generic API success response
 */
export const ApiSuccessResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    error: z.boolean().default(false),
    data: dataSchema,
    message: z.string().optional(),
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
