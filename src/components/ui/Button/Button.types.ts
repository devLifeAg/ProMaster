import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'destructive' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface ButtonVariants {
  default: string;
  ghost: string;
  destructive: string;
  custom: string;
}

export interface ButtonSizes {
  sm: string;
  md: string;
  lg: string;
}
