/**
 * Common TypeScript types used throughout the application
 * Provides type safety and consistency across components
 */

/**
 * Base entity interface for all database entities
 * Includes common fields like id, createdAt, updatedAt
 */
export interface BaseEntity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
}

/**
 * User interface extending BaseEntity
 * Represents user data in the application
 */
export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'moderator';
  isActive: boolean;
}

/**
 * Generic API response wrapper
 * Standardizes API response format across the application
 * 
 * @template T - The type of data being returned
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

/**
 * Pagination parameters for API requests
 * Used for paginated data fetching
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated API response wrapper
 * Extends ApiResponse with pagination metadata
 * 
 * @template T - The type of items in the paginated array
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

/**
 * Select option interface for dropdown components
 * Used in form selects and filters
 */
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

/**
 * Chart data interface for visualization components
 * Represents data points in charts and graphs
 */
export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

/**
 * Status type interface for status indicators
 * Used for badges, tags, and status displays
 */
export interface StatusType {
  id: string;
  name: string;
  color: string;
  bgColor: string;
}

/**
 * Notification interface for toast messages and alerts
 * Represents user notifications in the application
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  isRead: boolean;
  createdAt: string;
}
