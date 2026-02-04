
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

