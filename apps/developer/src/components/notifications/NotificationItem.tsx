'use client';

import { useRouter } from 'next/navigation';
import {
  CircleDollarSign, UserPlus, Building2, TrendingUp, Bell,
} from 'lucide-react';
import { clsx } from 'clsx';
import type { DeveloperNotification, NotificationType } from '@/lib/types';
import { formatRelativeTime } from '@/lib/format';

const iconMap: Record<NotificationType, React.ElementType> = {
  payout_completed: CircleDollarSign,
  new_investor: UserPlus,
  property_approved: Building2,
  property_rejected: Building2,
  property_funded: TrendingUp,
  kyc_update: Bell,
  system: Bell,
};

const colorMap: Record<NotificationType, { text: string; bg: string }> = {
  payout_completed: { text: 'text-emerald', bg: 'bg-success-bg' },
  new_investor: { text: 'text-royal', bg: 'bg-info-bg' },
  property_approved: { text: 'text-emerald', bg: 'bg-success-bg' },
  property_rejected: { text: 'text-error', bg: 'bg-error-bg' },
  property_funded: { text: 'text-amber-600', bg: 'bg-warning-bg' },
  kyc_update: { text: 'text-text-secondary', bg: 'bg-bg-tertiary' },
  system: { text: 'text-text-secondary', bg: 'bg-bg-tertiary' },
};

interface NotificationItemProps {
  notification: DeveloperNotification;
  compact?: boolean;
  onRead?: (id: string) => void;
}

export function NotificationItem({ notification, compact = false, onRead }: NotificationItemProps) {
  const router = useRouter();
  const Icon = iconMap[notification.type];
  const colors = colorMap[notification.type];

  const handleClick = () => {
    onRead?.(notification.id);
    if (notification.route) {
      router.push(notification.route);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'w-full flex items-start gap-3 text-left transition-colors cursor-pointer',
        compact ? 'px-4 py-3 hover:bg-bg-secondary' : 'px-5 py-4 hover:bg-bg-secondary',
        !notification.read && 'bg-emerald/[0.03]',
      )}
    >
      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-emerald mt-2 shrink-0" />
      )}
      {notification.read && <span className="w-2 shrink-0" />}

      <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', colors.bg)}>
        <Icon className={clsx('w-4 h-4', colors.text)} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={clsx('text-sm text-text-primary', notification.read ? 'font-medium' : 'font-semibold')}>
          {notification.title}
        </p>
        <p className={clsx('text-xs text-text-secondary mt-0.5', compact && 'line-clamp-1')}>
          {notification.body}
        </p>
        <p className="text-[11px] text-text-tertiary mt-1">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>
    </button>
  );
}
