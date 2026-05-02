'use client';

import Link from 'next/link';
import { Plus, Shield, Wallet, Megaphone } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePermission } from '@/hooks/usePermission';

export function QuickActions() {
  const { hasPermission } = usePermission();

  const actions = [
    {
      icon: Plus,
      label: 'Add Property',
      href: '/properties',
      permission: 'properties.crud' as const,
    },
    {
      icon: Shield,
      label: 'Review KYC',
      href: '/kyc',
      permission: 'kyc.process' as const,
    },
    {
      icon: Wallet,
      label: 'Approve Payout',
      href: '/payouts',
      permission: 'payouts.approve' as const,
    },
    {
      icon: Megaphone,
      label: 'Send Announcement',
      href: '/announcements',
      permission: 'announcements.full' as const,
    },
  ];

  const visibleActions = actions.filter((action) => hasPermission(action.permission));

  if (visibleActions.length === 0) return null;

  return (
    <Card>
      <h3 className="text-base font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visibleActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Button variant="secondary" className="w-full justify-start">
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
}
