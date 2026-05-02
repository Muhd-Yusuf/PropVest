import { clsx } from 'clsx';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const variantConfig = {
  warning: {
    bg: 'bg-warning-bg border-warning/30',
    icon: AlertTriangle,
    iconColor: 'text-warning',
    textColor: 'text-amber-800',
  },
  error: {
    bg: 'bg-error-bg border-error/30',
    icon: AlertCircle,
    iconColor: 'text-error',
    textColor: 'text-red-800',
  },
  info: {
    bg: 'bg-info-bg border-royal/30',
    icon: Info,
    iconColor: 'text-royal',
    textColor: 'text-royal',
  },
};

interface AlertBannerProps {
  variant: 'warning' | 'error' | 'info';
  message: string;
  action?: React.ReactNode;
  className?: string;
}

export function AlertBanner({ variant, message, action, className }: AlertBannerProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={clsx(
        'flex items-center gap-3 px-4 py-3 rounded-lg border',
        config.bg,
        className,
      )}
    >
      <Icon className={clsx('w-4 h-4 shrink-0', config.iconColor)} />
      <p className={clsx('text-sm flex-1', config.textColor)}>{message}</p>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
