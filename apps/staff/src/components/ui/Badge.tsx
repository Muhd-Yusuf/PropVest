'use client';

import { clsx } from 'clsx';

const variantStyles = {
  success: 'bg-success-bg text-emerald',
  warning: 'bg-warning-bg text-amber-700',
  error: 'bg-error-bg text-error',
  info: 'bg-info-bg text-royal',
  neutral: 'bg-bg-tertiary text-text-secondary',
};

interface BadgeProps {
  label: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
}

export function Badge({ label, variant, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
