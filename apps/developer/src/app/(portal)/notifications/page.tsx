'use client';

import { CheckCheck, Bell } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { useNotifications } from '@/hooks/useNotifications';
import type { NotificationType } from '@/lib/types';

type FilterKey = 'all' | 'investors' | 'payouts' | 'properties' | 'system';

const filterDefs: { key: FilterKey; label: string; types: NotificationType[] }[] = [
  { key: 'all', label: 'All', types: [] },
  { key: 'investors', label: 'Investors', types: ['new_investor'] },
  { key: 'payouts', label: 'Payouts', types: ['payout_completed'] },
  { key: 'properties', label: 'Properties', types: ['property_approved', 'property_rejected', 'property_funded'] },
  { key: 'system', label: 'System', types: ['system', 'kyc_update'] },
];

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markOneRead } = useNotifications();
  const activeFilter = 'all';

  const filtered = notifications;

  return (
    <>
      <PageHeader
        title="Notifications"
        description={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        actions={
          unreadCount > 0 ? (
            <Button variant="secondary" size="sm" onClick={markAllRead}>
              <CheckCheck className="w-4 h-4 mr-1.5" />
              Mark all read
            </Button>
          ) : undefined
        }
      />

      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-border-default">
          {filtered.map((n) => (
            <NotificationItem key={n.id} notification={n} onRead={markOneRead} />
          ))}
        </div>

        {filtered.length === 0 && (
          <EmptyState
            icon={Bell}
            title="No notifications"
            description="You're all caught up!"
          />
        )}
      </Card>
    </>
  );
}
