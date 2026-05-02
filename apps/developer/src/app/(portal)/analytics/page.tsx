'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { InvestorAnalytics } from '@/components/analytics/InvestorAnalytics';

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Track investor metrics and investment trends." />
      <InvestorAnalytics />
    </>
  );
}
