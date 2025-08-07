/**
 * Utility functions for formatting data in Vietnamese locale
 * Provides consistent formatting across the application
 */

/**
 * Format currency amount with Vietnamese locale
 * 
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'VND')
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(1234567) // "1.234.567 ₫"
 * formatCurrency(1234567, 'USD') // "$1,234,567.00"
 */
export const formatCurrency = (amount: number, currency = 'VND'): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format number with Vietnamese locale (thousands separator)
 * 
 * @param num - The number to format
 * @returns Formatted number string
 * 
 * @example
 * formatNumber(1234567) // "1.234.567"
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

/**
 * Format percentage with specified decimal places
 * 
 * @param value - The percentage value (0-100)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 * 
 * @example
 * formatPercentage(12.345) // "12.3%"
 * formatPercentage(12.345, 2) // "12.35%"
 */
export const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date with Vietnamese locale
 * 
 * @param date - Date object or date string
 * @param options - Intl.DateTimeFormatOptions for custom formatting
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date()) // "Jan 15, 2024"
 * formatDate(new Date(), { weekday: 'long' }) // "Monday, Jan 15, 2024"
 */
export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat('vi-VN', options || defaultOptions).format(dateObj);
};

/**
 * Format relative time (time ago) in Vietnamese
 * 
 * @param date - Date object or date string
 * @returns Relative time string
 * 
 * @example
 * formatTimeAgo(new Date()) // "Just now"
 * formatTimeAgo(new Date(Date.now() - 3600000)) // "1 hour ago"
 */
export const formatTimeAgo = (date: Date | string): string => {
  const now = new Date();
  const past = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  // Return relative time based on duration
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  // For dates older than 30 days, use absolute date format
  return formatDate(past);
};
