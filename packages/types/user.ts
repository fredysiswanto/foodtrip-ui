import { z } from 'zod';
import { AuditFieldsSchema } from './common';

/**
 * Admin user schema
 */
export const AdminSchema = z
  .object({
    user_id: z.string().uuid(),
    user_no: z.string(),
    password: z.string().optional(),
    first_name: z.string(),
    middle_name: z.string().nullable(),
    last_name: z.string(),
    email_address: z.string().email(),
    phone_number: z.string().nullable(),
    gender: z.string().nullable(),
    user_type: z.literal('Admin'),
  })
  .merge(AuditFieldsSchema);

export type AdminType = z.infer<typeof AdminSchema>;

/**
 * Restaurant admin user schema
 */
export const RestaurantAdminSchema = z
  .object({
    user_id: z.string().uuid(),
    resto_id: z.string().uuid(),
    user_no: z.string(),
    password: z.string().optional(),
    first_name: z.string(),
    middle_name: z.string().nullable(),
    last_name: z.string(),
    email_address: z.string().email(),
    phone_number: z.string().nullable(),
    gender: z.string().nullable(),
    user_type: z.literal('Resto_Admin'),
  })
  .merge(AuditFieldsSchema);

export type RestaurantAdminType = z.infer<typeof RestaurantAdminSchema>;

/**
 * Customer user schema
 */
export const CustomerSchema = z
  .object({
    user_id: z.string().uuid(),
    user_no: z.string(),
    password: z.string().optional(),
    first_name: z.string(),
    middle_name: z.string().nullable(),
    last_name: z.string(),
    email_address: z.string().email(),
    phone_number: z.string().nullable(),
    gender: z.string().nullable(),
    user_type: z.literal('Customer'),
  })
  .merge(AuditFieldsSchema);

export type CustomerType = z.infer<typeof CustomerSchema>;

/**
 * Union type for all user types (specific user role types)
 */
export const AllUserTypesSchema = z.union([
  AdminSchema,
  RestaurantAdminSchema,
  CustomerSchema,
]);
export type AllUserTypesType = z.infer<typeof AllUserTypesSchema>;

/**
 * Create customer request schema
 */
export const CreateCustomerSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(2, 'Last name is required'),
  email_address: z.string().email('Valid email is required'),
  phone_number: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.string().optional(),
});

export type CreateCustomerInputType = z.infer<typeof CreateCustomerSchema>;

/**
 * Update user request schema (admin/resto-admin/customer)
 */
export const UpdateUserSchema = z.object({
  first_name: z.string().min(2).optional(),
  middle_name: z.string().optional(),
  last_name: z.string().min(2).optional(),
  phone_number: z.string().optional(),
  gender: z.string().optional(),
});

export type UpdateUserInputType = z.infer<typeof UpdateUserSchema>;

/**
 * Update user password schema
 */
export const UpdatePasswordSchema = z
  .object({
    current_password: z.string().min(1, 'Current password is required'),
    new_password: z
      .string()
      .min(6, 'New password must be at least 6 characters'),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export type UpdatePasswordInputType = z.infer<typeof UpdatePasswordSchema>;

/**
 * User list response
 */
export const UserListSchema = z.object({
  draw: z.number(),
  data: z.array(AllUserTypesSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type UserListResponseType = z.infer<typeof UserListSchema>;

/**
 * Single user response
 */
export const UserDetailSchema = z.object({
  data: AllUserTypesSchema,
});

export type UserDetailResponseType = z.infer<typeof UserDetailSchema>;

/**
 * Minimal restaurant schema for nested user response
 */
export const RestaurantInUserSchema = z
  .object({
    resto_img: z.string(),
    resto_id: z.string().uuid(),
    resto_no: z.string(),
    resto_name: z.string(),
    resto_email: z.string().email(),
    resto_phone: z.string(),
    resto_landline: z.string(),
    resto_website: z.string().optional(),
    restocatg_id: z.string().uuid(),
    status: z.string(),
  })
  .merge(AuditFieldsSchema);

export type RestaurantInUserType = z.infer<typeof RestaurantInUserSchema>;

/**
 * Restaurant Admin user with nested restaurant
 */
export const RestaurantAdminWithRestaurantSchema = z
  .object({
    user_id: z.string().uuid(),
    resto_id: z.string().uuid(),
    user_no: z.string(),
    first_name: z.string(),
    middle_name: z.string().nullable(),
    last_name: z.string(),
    email_address: z.string().email(),
    phone_number: z.string().nullable(),
    gender: z.string().nullable(),
    user_type: z.enum(['Resto_Admin']),
    restaurant: RestaurantInUserSchema.optional(),
  })
  .merge(AuditFieldsSchema);

export type RestaurantAdminWithRestaurantType = z.infer<
  typeof RestaurantAdminWithRestaurantSchema
>;

/**
 * Union type for users that can have restaurant (used in list response)
 */
export const UserWithRestaurantSchema = z.union([
  AdminSchema,
  RestaurantAdminWithRestaurantSchema,
  CustomerSchema,
]);

export type UserWithRestaurantType = z.infer<typeof UserWithRestaurantSchema>;

/**
 * User list response with restaurant data
 */
export const UserListWithRestaurantSchema = z.object({
  draw: z.number(),
  data: z.array(UserWithRestaurantSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type UserListWithRestaurantResponseType = z.infer<
  typeof UserListWithRestaurantSchema
>;
