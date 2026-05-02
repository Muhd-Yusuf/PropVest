'use client';

import type { PayoutStatus } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';

const statusConfig: Record<PayoutStatus, { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' }> = {
  calculating: { label: 'Calculating', variant: 'neutral' },
  pending_approval: { label: 'Pending Approval', variant: 'warning' },
  approved: { label: 'Approved', variant: 'info' },
  processing: { label: 'Processing', variant: 'info' },
  completed: { label: 'Completed', variant: 'success' },
  partial: { label: 'Partial', variant: 'warning' },
};

interface PayoutStatusBadgeProps {
  status: PayoutStatus;
}

export function PayoutStatusBadge({ status }: PayoutStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge label={config.label} variant={config.variant} />;
}
