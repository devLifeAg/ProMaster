/**
 * Application constants and configuration values
 * Centralizes all constant values used throughout the application
 */

/**
 * API base URL for all backend requests
 */
export const BASE_URL = 'https://ww3.mhw.com.my:1606/ProMaster/';

/**
 * Base path for static assets (matches Vite base configuration)
 */
export const STATIC_BASE_PATH = '/ProMaster';

/**
 * Icon path mappings for different UI elements
 * Maps icon names to their file paths
 * All icons are located in /public/assets/icons/
 */
export const IconPaths = {
  dashboard: `${STATIC_BASE_PATH}/assets/icons/dashboard.png`,
  property: `${STATIC_BASE_PATH}/assets/icons/property.png`,
  booking: `${STATIC_BASE_PATH}/assets/icons/booking.png`,
  contacts: `${STATIC_BASE_PATH}/assets/icons/contacts.png`,
  appointment: `${STATIC_BASE_PATH}/assets/icons/appointment.png`,
  approval: `${STATIC_BASE_PATH}/assets/icons/approval.png`,
  enquiry: `${STATIC_BASE_PATH}/assets/icons/enquiry.png`,
  chart: `${STATIC_BASE_PATH}/assets/icons/chart.png`,
  group: `${STATIC_BASE_PATH}/assets/icons/group.png`,
  tag: `${STATIC_BASE_PATH}/assets/icons/tag.png`,
  help: `${STATIC_BASE_PATH}/assets/icons/Help.png`,
  notification: `${STATIC_BASE_PATH}/assets/icons/Noti.png`,
  filter: `${STATIC_BASE_PATH}/assets/icons/filterIcon.png`,
  buy: `${STATIC_BASE_PATH}/assets/icons/buy.png`,
  showcase: `${STATIC_BASE_PATH}/assets/icons/showcase.png`,
  
  // Additional icon paths (aliases for consistency)
  bookings: `${STATIC_BASE_PATH}/assets/icons/booking.png`,
  noti: `${STATIC_BASE_PATH}/assets/icons/Noti.png`,
} as const;

/**
 * Image path mappings for different UI elements
 * Maps image names to their file paths
 * All images are located in /public/assets/
 */
export const ImagePaths = {
  logo: `${STATIC_BASE_PATH}/assets/logo.png`,
  defaultAvatar: `${STATIC_BASE_PATH}/assets/image.jpg`, // Using logo as default avatar
  placeholder: `${STATIC_BASE_PATH}/assets/image.jpg`,
  
  // Additional image paths
  avatar: `${STATIC_BASE_PATH}/assets/image.jpg`, // Using logo as avatar
} as const;

/**
 * Application configuration constants
 */
export const APP_CONFIG = {
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Timeout values (in milliseconds)
  API_TIMEOUT: 30000,
  DEBOUNCE_DELAY: 300,
  
  // Cache settings
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  
  // UI constants
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

/**
 * Status color mappings for different states
 */
export const STATUS_COLORS = {
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  pending: '#6B7280',
} as const;

/**
 * Chart color palette for data visualization
 */
export const CHART_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
] as const;
