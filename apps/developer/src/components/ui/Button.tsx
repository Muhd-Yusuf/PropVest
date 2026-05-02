'use client';

import { clsx } from 'clsx';

const variantStyles = {
  primary: 'bg-emerald text-midnight hover:bg-emerald-dark focus:ring-emerald/30',
  secondary: 'border border-border-default text-text-primary bg-white hover:bg-bg-secondary focus:ring-emerald/20',
  ghost: 'text-text-secondary hover:bg-bg-tertiary focus:ring-emerald/20',
  danger: 'bg-error text-white hover:bg-red-600 focus:ring-error/30',
};

const sizeStyles = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

interface ButtonProps {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
  disabled = false,
  type = 'button',
  href,
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
