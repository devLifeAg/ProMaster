/**
 * Color palette and theme configuration
 * Defines all colors used throughout the application
 */

/**
 * Main color palette for the application
 */
const colors = {
  // Primary colors
  primary: '#3B82F6',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',
  
  // Secondary colors
  secondary: '#6B7280',
  secondaryDark: '#374151',
  secondaryLight: '#F3F4F6',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#F9FAFB',
  backgroundLight: '#FFFFFF',
  
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',
  
  // Border colors
  border: '#E5E7EB',
  borderDark: '#D1D5DB',
  borderLight: '#F3F4F6',
  
  // Status-specific colors
  bookedStatus: '#3B82F6',
  waitingStatus: '#F59E0B',
  reserveStatus: '#3B82F6',
  cancelledStatus: '#EF4444',
  
  // Chart colors
  chartBlue: '#3B82F6',
  chartGreen: '#10B981',
  chartYellow: '#F59E0B',
  chartRed: '#EF4444',
  chartPurple: '#8B5CF6',
  chartOrange: '#F97316',
  chartCyan: '#06B6D4',
  chartLime: '#84CC16',
  
  // Semantic colors
  blackDark: '#111827',
  redRuby: '#DC2626',
  grayLight: '#F9FAFB',
  grayMedium: '#6B7280',
  grayDark: '#374151',
  
  // Additional colors for existing components
  greyInputText: '#6B7280',
  greyCalm: '#9CA3AF',
  greyShadow: '#D1D5DB',
  greyIron: '#6B7280',
  greyLight: '#F9FAFB',
  
  // Status colors
  lightBlue: '#DBEAFE',
  lightGreen: '#D1FAE5',
  lightOrange: '#FED7AA',
  activeStatus: '#10B981',
  availableStatus: '#10B981',
  appointmentColor: '#3B82F6',
  timelineColor: '#F59E0B',
  
  // Background colors
  whiteCloud: '#FFFFFF',
  Active_Bg: '#D1FADD',
  
  // Additional colors
  warningTitle: '#F59E0B',
} as const;

/**
 * Convert hex color to rgba for transparency
 * 
 * @param hex - Hex color string
 * @param alpha - Alpha value (0-1)
 * @returns RGBA color string
 * 
 * @example
 * hexToRgba('#3B82F6', 0.5) // 'rgba(59, 130, 246, 0.5)'
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Red gradient function for special styling
 * 
 * @returns CSS gradient string
 */
export const redGradient = (): string => 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';

export default colors;
