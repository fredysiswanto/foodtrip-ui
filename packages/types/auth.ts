import { z } from 'zod';
import { ApiSuccessResponseSchema } from './common';
import { UserSchema } from './global';

export const UserRolesSchema = ['ADMIN', 'SUPER_ADMIN'] as const;

export const UserRestoRolesSchema = ['ADMIN', 'STAFF', 'OWNER'] as const;

export type UserRoles = (typeof UserRolesSchema)[number];
export type UserRestoRoles = (typeof UserRestoRolesSchema)[number];

export const AuthUserRestaurantsSchema = z.array(
  z.object({
    restaurantId: z.string().uuid(),
    restaurantRole: z.enum(UserRestoRolesSchema),
  })
);
export type AuthUserRestaurants = z.infer<typeof AuthUserRestaurantsSchema>;

export const AuthUserSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(UserRolesSchema),
  permissions: z.array(z.string()),
  restaurants: AuthUserRestaurantsSchema.optional(),
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

export const AuthLoginDataSchema = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
  expiresIn: z.string(),
});
export type AuthLoginData = z.infer<typeof AuthLoginDataSchema>;

// User schema based on API response
// export const UserSchema = z
//   .object({
//     user_id: z.string().uuid(),
//     resto_id: z.string().uuid().nullable(),
//     user_no: z.string(),
//     first_name: z.string(),
//     middle_name: z.string().nullable(),
//     last_name: z.string(),
//     email_address: z.string().email(),
//     phone_number: z.string().nullable(),
//     gender: z.string().nullable(),
//     user_type: z.enum(['Admin', 'Resto_Admin', 'User']),
//   })
// .merge(AuditFieldsSchema);

export type User = z.infer<typeof UserSchema>;

// Login request schema
export const LoginRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// Login response schema
// export const LoginResponseSchema = z.object({
//   error: z.boolean().optional(),
//   data: UserSchema,
//   token: z.string(),
//   message: z.string(),
// });

export const LoginResponseSchema =
  ApiSuccessResponseSchema(AuthLoginDataSchema);

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Auth state for UI
export const AuthStateSchema = z.object({
  user: AuthUserSchema.nullable(),
  token: z.string().nullable(),
  isAuthenticated: z.boolean(),
  isLoading: z.boolean(),
});

export type AuthState = z.infer<typeof AuthStateSchema>;

// Token payload (decoded JWT)
export const TokenPayloadSchema = AuthUserSchema;

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

// Refresh token request
export const RefreshTokenRequestSchema = z.object({
  token: z.string(),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
