import React from 'react';
import { clsx } from "clsx";
import type { ButtonProps } from './Button.types';

/**
 * Reusable Button component with multiple variants and customizable styling
 * 
 * Features:
 * - Multiple visual variants (default, ghost, destructive, custom)
 * - Extends native button attributes
 * - Customizable via className and style props
 * - Responsive design with Tailwind CSS
 */
export const Button: React.FC<ButtonProps> = ({ 
  variant = "default", 
  className, 
  style, 
  children,
  ...props 
}: ButtonProps) => {
  // Base button styles that apply to all variants
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 shadow rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Variant-specific styles
  // Note: Default variant has no colors to allow easy overriding via className
  const variantStyles = {
    default: "", // No default colors - use className for customization
    ghost: "bg-transparent hover:bg-white text-white hover:text-red-500 border border-white",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    custom: "" // Custom variant for complete customization
  };

  // Combine base styles with variant styles and custom className
  const buttonClasses = clsx(baseStyles, variantStyles[variant], className);

  return (
    <button
      className={buttonClasses}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};
