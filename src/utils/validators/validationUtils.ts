/**
 * Validation utility functions for form validation and data validation
 * Provides common validation patterns used throughout the application
 */

/**
 * Validate email format
 * 
 * @param email - Email string to validate
 * @returns boolean indicating if email is valid
 * 
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Vietnamese phone number format
 * 
 * @param phone - Phone number string to validate
 * @returns boolean indicating if phone number is valid
 * 
 * @example
 * isValidPhoneNumber('0123456789') // true
 * isValidPhoneNumber('+84123456789') // true
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * Requires: minimum 8 characters, uppercase, lowercase, number
 * 
 * @param password - Password string to validate
 * @returns boolean indicating if password meets requirements
 * 
 * @example
 * isValidPassword('StrongPass123') // true
 * isValidPassword('weak') // false
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate URL format
 * 
 * @param url - URL string to validate
 * @returns boolean indicating if URL is valid
 * 
 * @example
 * isValidUrl('https://example.com') // true
 * isValidUrl('not-a-url') // false
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate positive integer
 * 
 * @param value - Value to validate
 * @returns boolean indicating if value is a positive integer
 * 
 * @example
 * isValidPositiveInteger(5) // true
 * isValidPositiveInteger(-1) // false
 */
export const isValidPositiveInteger = (value: string | number): boolean => {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
};

/**
 * Validate string length within range
 * 
 * @param value - String to validate
 * @param min - Minimum length
 * @param max - Maximum length (optional)
 * @returns boolean indicating if length is within range
 * 
 * @example
 * isValidLength('hello', 3, 10) // true
 * isValidLength('hi', 5) // false
 */
export const isValidLength = (value: string, min: number, max?: number): boolean => {
  if (max) {
    return value.length >= min && value.length <= max;
  }
  return value.length >= min;
};

/**
 * Validate non-empty value
 * 
 * @param value - Value to validate
 * @returns boolean indicating if value is not empty
 * 
 * @example
 * isNotEmpty('hello') // true
 * isNotEmpty('') // false
 * isNotEmpty(null) // false
 */
export const isNotEmpty = (value: string | number | null | undefined): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};
