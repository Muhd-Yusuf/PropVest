'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { RevenueDashboard } from '@/components/finance/RevenueDashboard';
import { PropertyPnL } from '@/components/finance/PropertyPnL';
import { FeeBreakdown } from '@/components/finance/FeeBreakdown';

export default function FinancePage() {
  return (
    <div>
      <PageHeader
        title="Finance"
        description="Revenue dashboard and financial reporting"
      />

      <RevenueDashboard />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <PropertyPnL />
        <FeeBreakdown />
      </div>
    </div>
  );
}
