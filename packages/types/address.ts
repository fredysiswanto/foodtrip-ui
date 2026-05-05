import { z } from 'zod';
import { AuditFieldsSchema } from './common';

/**
 * Address entity schema
 * Represents a delivery/billing address
 */
export const AddressSchema = z
  .object({
    address_id: z.string().uuid(),
    customer_id: z.string().uuid(),
    address_type: z.enum(['Residential', 'Commercial', 'Other']),
    recipient_name: z.string().min(2),
    recipient_phone: z.string(),
    street_address: z.string().min(5),
    postal_code: z.string(),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    is_default: z.boolean().default(false),
    notes: z.string().max(500).optional(),
  })
  .merge(AuditFieldsSchema);

export type AddressType = z.infer<typeof AddressSchema>;

/**
 * Create address request schema
 */
export const CreateAddressSchema = z.object({
  address_type: z.enum(['Residential', 'Commercial', 'Other']),
  recipient_name: z.string().min(2, 'Recipient name is required'),
  recipient_phone: z.string().min(10, 'Valid phone number is required'),
  street_address: z.string().min(5, 'Street address is required'),
  postal_code: z.string().min(3, 'Valid postal code is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  country: z.string().min(2, 'Country is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  is_default: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export type CreateAddressInputType = z.infer<typeof CreateAddressSchema>;

/**
 * Update address request schema
 */
export const UpdateAddressSchema = CreateAddressSchema.partial();

export type UpdateAddressInputType = z.infer<typeof UpdateAddressSchema>;

/**
 * Set default address request
 */
export const SetDefaultAddressSchema = z.object({
  address_id: z.string().uuid('Valid address ID is required'),
});

export type SetDefaultAddressInputType = z.infer<
  typeof SetDefaultAddressSchema
>;

/**
 * Address list response
 */
export const AddressListSchema = z.object({
  draw: z.number(),
  data: z.array(AddressSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type AddressListResponseType = z.infer<typeof AddressListSchema>;

/**
 * Single address response
 */
export const AddressDetailSchema = z.object({
  data: AddressSchema,
});

export type AddressDetailResponseType = z.infer<typeof AddressDetailSchema>;
