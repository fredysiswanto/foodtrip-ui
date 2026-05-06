import { ApiError } from '@foodtrip/api';

/**
 * Extract user-friendly error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  // ApiError from API client
  if (
    error instanceof Error &&
    error.name === 'ApiError' &&
    'status' in error
  ) {
    const apiError = error as ApiError;

    // Handle specific HTTP status codes
    if (apiError.status === 401) {
      return 'Unauthorized. Please log in again.';
    }
    if (apiError.status === 403) {
      return 'You do not have permission to perform this action.';
    }
    if (apiError.status === 404) {
      return 'The requested resource was not found.';
    }
    if (apiError.status === 409) {
      return 'This item already exists. Please use a different value.';
    }
    if (apiError.status >= 500) {
      return 'Server error. Please try again later.';
    }

    // Return the actual error message from API
    return apiError.message || 'An error occurred. Please try again.';
  }

  // Generic Error
  if (error instanceof Error) {
    return error.message || 'An unexpected error occurred.';
  }

  // Fallback
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('Failed to fetch') ||
      error.message.includes('Network request failed')
    );
  }
  return false;
}

/**
 * Check if error is a timeout
 */
export function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('timeout') || error.message.includes('aborted')
    );
  }
  return false;
}
