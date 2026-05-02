'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';
import type { Announcement } from '@/lib/types';

const typeVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  broadcast: 'info',
  targeted: 'warning',
};

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  sent: 'success',
  draft: 'neutral',
};

interface AnnouncementsListProps {
  announcements: Announcement[];
}

export function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  if (announcements.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-text-secondary">No announcements found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary">
                {announcement.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {announcement.body}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge
                  label={announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                  variant={typeVariant[announcement.type] || 'neutral'}
                />
                <Badge
                  label={announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                  variant={statusVariant[announcement.status] || 'neutral'}
                />
                {announcement.recipientCount !== undefined && (
                  <span className="text-xs text-text-tertiary">
                    {announcement.recipientCount.toLocaleString()} recipients
                  </span>
                )}
                {announcement.sentAt && (
                  <span className="text-xs text-text-tertiary">
                    Sent {formatDate(announcement.sentAt)}
                  </span>
                )}
                {!announcement.sentAt && (
                  <span className="text-xs text-text-tertiary">
                    Created {formatDate(announcement.createdAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
