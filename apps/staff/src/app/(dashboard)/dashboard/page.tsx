'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { PendingActions } from '@/components/dashboard/PendingActions';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { AlertsList } from '@/components/dashboard/AlertsList';
import { QuickActions } from '@/components/dashboard/QuickActions';

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of platform activity" />

      <div className="space-y-6">
        <MetricsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PendingActions />
          </div>
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertsList />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
