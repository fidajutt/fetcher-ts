export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface FetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export interface RetryOptions {
  retries: number;
  delay: number;
}

export function handleApiError(error: any): ApiError {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'Unknown error occurred' };
}