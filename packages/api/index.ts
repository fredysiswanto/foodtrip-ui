// API client and endpoints
// export {
//   authApi,
//   restaurantApi,
//   restaurantCategoryApi,
//   dishApi,
//   dishCategoryApi,
//   userApi,
// } from './client';

// Role-based API endpoints
export {
  adminRestaurantApi,
  adminDishApi,
  adminDishCategoryApi,
  adminRestaurantCategoryApi,
  adminUserApi,
} from './admin';

export { apiFetch, ApiError, authApi } from './api-request';
