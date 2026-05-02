'use client';

import { AlertTriangle, FileText, Bell } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { properties, notifications } from '@/lib/mock-data';

export function PendingActions() {
  const underReview = properties.filter((p) => p.status === 'under_review');
  const unreadNotifications = notifications.filter((n) => !n.read);
  const draftProperties = properties.filter((p) => p.status === 'draft');

  const actions = [
    ...underReview.map((p) => ({
      icon: FileText,
      label: `"${p.name}" is under review`,
      sublabel: 'Waiting for admin approval',
      color: 'text-warning',
      bgColor: 'bg-warning-bg',
    })),
    ...draftProperties.map((p) => ({
      icon: AlertTriangle,
      label: `"${p.name}" is still a draft`,
      sublabel: 'Complete and submit for review',
      color: 'text-text-tertiary',
      bgColor: 'bg-bg-tertiary',
    })),
    ...(unreadNotifications.length > 0
      ? [{
          icon: Bell,
          label: `${unreadNotifications.length} unread notifications`,
          sublabel: 'Check your latest updates',
          color: 'text-royal',
          bgColor: 'bg-info-bg',
        }]
      : []),
  ];

  if (actions.length === 0) {
    return (
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Pending Actions</h3>
        <p className="text-sm text-text-tertiary">No pending actions. You're all caught up!</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">Pending Actions</h3>
      <div className="space-y-3">
        {actions.map((action, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg ${action.bgColor} flex items-center justify-center shrink-0`}>
              <action.icon className={`w-4 h-4 ${action.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{action.label}</p>
              <p className="text-xs text-text-tertiary mt-0.5">{action.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
