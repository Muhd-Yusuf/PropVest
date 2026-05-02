'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { DeveloperStats } from '@/components/dashboard/DeveloperStats';
import { RevenueOverview } from '@/components/dashboard/RevenueOverview';
import { PropertiesQuickList } from '@/components/dashboard/PropertiesQuickList';
import { PendingActions } from '@/components/dashboard/PendingActions';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { developer } = useAuth();

  return (
    <>
      <PageHeader
        title={`Welcome back, ${developer?.contactName?.split(' ')[0] || 'Developer'}`}
        description="Here's an overview of your properties and performance."
      />

      <DeveloperStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <PropertiesQuickList />
        </div>
        <div className="space-y-6">
          <RevenueOverview />
          <PendingActions />
        </div>
      </div>
    </>
  );
}
