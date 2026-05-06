import { z } from 'zod';
import { AuditFieldsSchema } from './common';
import { DishSchema } from './dish';
import { CustomerSchema } from './user';
import { RestaurantSchema } from './restaurant';

/**
 * Order item (dish in order)
 */
export const OrderItemSchema = z.object({
  order_item_id: z.string().uuid().optional(),
  order_id: z.string().uuid(),
  dish_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  unit_price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  subtotal: z.string().regex(/^\d+(\.\d{1,2})?$/),
  dish: DishSchema.optional(),
});

export type OrderItemType = z.infer<typeof OrderItemSchema>;

/**
 * Order status enum
 */
export const OrderStatusEnum = z.enum([
  'Pending',
  'Confirmed',
  'In_Process',
  'On_The_Way',
  'Delivered',
  'Rejected',
  'Cancelled',
]);

export type OrderStatusType = z.infer<typeof OrderStatusEnum>;

/**
 * Order entity schema
 */
export const OrderSchema = z
  .object({
    order_id: z.string().uuid(),
    order_no: z.string(),
    customer_id: z.string().uuid(),
    resto_id: z.string().uuid(),
    delivery_address_id: z.string().uuid().optional(),
    status: OrderStatusEnum,
    total_amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
    delivery_fee: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/)
      .optional(),
    tax_amount: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/)
      .optional(),
    notes: z.string().max(500).optional(),
    estimated_delivery_time: z.string().datetime().optional(),
    delivery_time: z.string().datetime().nullable().optional(),
  })
  .merge(AuditFieldsSchema);

export type OrderType = z.infer<typeof OrderSchema>;

/**
 * Order with items and customer/restaurant details
 */
export const OrderDetailSchema = OrderSchema.extend({
  items: z.array(OrderItemSchema).optional(),
  customer: CustomerSchema.optional(),
  restaurant: RestaurantSchema.optional(),
});

export type OrderDetailType = z.infer<typeof OrderDetailSchema>;

/**
 * Create order request schema
 */
export const CreateOrderSchema = z.object({
  customer_id: z.string().uuid('Valid customer ID is required'),
  resto_id: z.string().uuid('Valid restaurant ID is required'),
  delivery_address_id: z.string().uuid('Valid address ID is required'),
  items: z
    .array(
      z.object({
        dish_id: z.string().uuid('Valid dish ID is required'),
        quantity: z.number().int().positive('Quantity must be at least 1'),
      })
    )
    .min(1, 'Order must have at least one item'),
  notes: z.string().max(500).optional(),
});

export type CreateOrderInputType = z.infer<typeof CreateOrderSchema>;

/**
 * Update order status request
 */
export const UpdateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
});

export type UpdateOrderStatusInputType = z.infer<
  typeof UpdateOrderStatusSchema
>;

/**
 * Set delivery details (OTW status)
 */
export const SetDeliveryDetailsSchema = z.object({
  status: z.literal('On_The_Way'),
  estimated_delivery_time: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
});

export type SetDeliveryDetailsInputType = z.infer<
  typeof SetDeliveryDetailsSchema
>;

/**
 * Cancel order request
 */
export const CancelOrderSchema = z.object({
  reason: z.string().max(500).optional(),
});

export type CancelOrderInputType = z.infer<typeof CancelOrderSchema>;

/**
 * Order list response
 */
export const OrderListSchema = z.object({
  draw: z.number(),
  data: z.array(OrderSchema),
  recordsFiltered: z.number(),
  recordsTotal: z.number(),
});

export type OrderListResponseType = z.infer<typeof OrderListSchema>;

/**
 * Single order response
 */
export const OrderDetailResponseSchema = z.object({
  data: OrderDetailSchema,
});

export type OrderDetailResponseType = z.infer<typeof OrderDetailResponseSchema>;
