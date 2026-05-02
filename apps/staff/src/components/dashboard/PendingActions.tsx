'use client';

import Link from 'next/link';
import { Shield, Building2, Wallet, Flag, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  mockKYCRecords,
  mockProperties,
  mockPayouts,
  mockP2PTrades,
  mockSupportTickets,
} from '@/lib/mock-data/index';

export function PendingActions() {
  const pendingKYC = mockKYCRecords.filter((k) => k.status === 'pending').length;
  const propertiesUnderReview = mockProperties.filter((p) => p.status === 'under_review').length;
  const payoutsAwaitingApproval = mockPayouts.filter((p) => p.status === 'pending_approval').length;
  const flaggedTrades = mockP2PTrades.filter((t) => t.isFlagged).length;
  const openTickets = mockSupportTickets.filter(
    (t) => t.status === 'open' || t.status === 'in_progress',
  ).length;

  const actions = [
    {
      icon: Shield,
      label: 'Pending KYC reviews',
      count: pendingKYC,
      href: '/kyc',
      variant: 'warning' as const,
    },
    {
      icon: Building2,
      label: 'Properties under review',
      count: propertiesUnderReview,
      href: '/properties',
      variant: 'info' as const,
    },
    {
      icon: Wallet,
      label: 'Payouts awaiting approval',
      count: payoutsAwaitingApproval,
      href: '/payouts',
      variant: 'warning' as const,
    },
    {
      icon: Flag,
      label: 'Flagged P2P trades',
      count: flaggedTrades,
      href: '/p2p',
      variant: 'error' as const,
    },
    {
      icon: Headphones,
      label: 'Open support tickets',
      count: openTickets,
      href: '/support',
      variant: 'info' as const,
    },
  ];

  return (
    <Card>
      <h3 className="text-base font-semibold text-text-primary mb-4">Pending Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-tertiary transition-colors duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center">
                <action.icon className="w-4 h-4 text-text-secondary" />
              </div>
              <span className="text-sm text-text-primary">{action.label}</span>
            </div>
            <Badge label={String(action.count)} variant={action.variant} />
          </Link>
        ))}
      </div>
    </Card>
  );
}
