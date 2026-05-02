import { z } from 'zod';

// User schema based on API response
export const UserSchema = z.object({
  user_id: z.string().uuid(),
  resto_id: z.string().uuid().nullable(),
  user_no: z.string(),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  email_address: z.string().email(),
  phone_number: z.string().nullable(),
  gender: z.string().nullable(),
  user_type: z.enum(['Admin', 'RestaurantOwner', 'User']),
  created_by: z.string().uuid(),
  updated_by: z.string().uuid().nullable(),
  deleted_by: z.string().uuid().nullable(),
  date_created: z.string().datetime(),
  date_updated: z.string().datetime(),
  date_deleted: z.string().datetime().nullable(),
});

export type User = z.infer<typeof UserSchema>;

// Login request schema
export const LoginRequestSchema = z.object({
  email_address: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// Login response schema
export const LoginResponseSchema = z.object({
  error: z.boolean(),
  data: UserSchema,
  token: z.string(),
  message: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Auth state for UI
export const AuthStateSchema = z.object({
  user: UserSchema.nullable(),
  token: z.string().nullable(),
  isAuthenticated: z.boolean(),
  isLoading: z.boolean(),
});

export type AuthState = z.infer<typeof AuthStateSchema>;

// Token payload (decoded JWT)
export const TokenPayloadSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string(),
  email_address: z.string().email(),
  resto_id: z.string().uuid().nullable(),
  user_type: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

// Refresh token request
export const RefreshTokenRequestSchema = z.object({
  token: z.string(),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
