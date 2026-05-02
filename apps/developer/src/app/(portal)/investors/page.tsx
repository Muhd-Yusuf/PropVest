'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { InvestorsList } from '@/components/investors/InvestorsList';
import { investors } from '@/lib/mock-data';

export default function InvestorsPage() {
  return (
    <>
      <PageHeader
        title="Investors"
        description={`${new Set(investors.map((i) => i.id)).size} investors across your properties.`}
      />
      <InvestorsList />
    </>
  );
}
