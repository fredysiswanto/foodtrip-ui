// API client and endpoints
export {
  authApi,
  restaurantApi,
  restaurantCategoryApi,
  dishApi,
  dishCategoryApi,
  userApi,
  apiFetch,
  ApiError,
} from './client';

// Role-based API endpoints
export {
  adminRestaurantApi,
  adminDishApi,
  adminDishCategoryApi,
  adminRestaurantCategoryApi,
  adminUserApi,
} from './admin';

export {
  restaurantAdminRestaurantApi,
  restaurantAdminDishApi,
  restaurantAdminDishCategoryApi,
  restaurantAdminAccountApi,
  restaurantAdminOrderApi,
  restaurantAdminCourierApi,
  restaurantAdminOpeningHourApi,
} from './restaurantAdmin';
