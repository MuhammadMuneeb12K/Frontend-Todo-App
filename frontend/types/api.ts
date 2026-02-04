
export interface ApiErrorResponse {
  detail: string | { [key: string]: string };
}

export interface ApiSuccessResponse<T> {
  data: T;
  message: string;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;
  detail: string | { [key: string]: string };

  constructor(statusCode: number, detail: string | { [key: string]: string }, message?: string) {
    super(message || (typeof detail === 'string' ? detail : 'An error occurred'));
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.detail = detail;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

