import type { ApiResponse, PaginationParams, PaginatedResponse } from '../types/common.types';

/**
 * API base URL from environment variables or fallback to localhost
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Default headers for all API requests
 */
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

/**
 * Centralized API service for handling HTTP requests
 * Provides type-safe methods for all common HTTP operations
 */
class ApiService {
  /**
   * Private method to handle all HTTP requests
   * 
   * @param endpoint - API endpoint path
   * @param options - Fetch options (method, headers, body, etc.)
   * @returns Promise with typed API response
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Merge default headers with custom headers
    const config: RequestInit = {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle HTTP error responses
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      // Log error for debugging
      console.error('API Error:', error);
      
      // Re-throw with more context
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  /**
   * Perform GET request
   * 
   * @param endpoint - API endpoint
   * @param params - Query parameters (optional)
   * @returns Promise with typed response
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  }

  /**
   * Perform POST request
   * 
   * @param endpoint - API endpoint
   * @param data - Request body data (optional)
   * @returns Promise with typed response
   */
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Perform PUT request
   * 
   * @param endpoint - API endpoint
   * @param data - Request body data (optional)
   * @returns Promise with typed response
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Perform DELETE request
   * 
   * @param endpoint - API endpoint
   * @returns Promise with typed response
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * Perform PATCH request
   * 
   * @param endpoint - API endpoint
   * @param data - Request body data (optional)
   * @returns Promise with typed response
   */
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Perform GET request with pagination support
   * 
   * @param endpoint - API endpoint
   * @param params - Pagination parameters and additional query params
   * @returns Promise with paginated response
   */
  async getPaginated<T>(
    endpoint: string,
    params: PaginationParams & Record<string, any> = { page: 1, limit: 10 }
  ): Promise<PaginatedResponse<T>> {
    const response = await this.get<PaginatedResponse<T>>(endpoint, params);
    return response.data;
  }
}

/**
 * Singleton instance of ApiService
 * Use this instance throughout the application
 */
export const apiService = new ApiService();
