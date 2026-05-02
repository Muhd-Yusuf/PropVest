'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { TransactionMonitor } from '@/components/compliance/TransactionMonitor';
import { KYCAudit } from '@/components/compliance/KYCAudit';
import { RegulatoryDocs } from '@/components/compliance/RegulatoryDocs';

const tabs = [
  { key: 'transactions', label: 'Transaction Monitor' },
  { key: 'kyc', label: 'KYC Audit' },
  { key: 'regulatory', label: 'Regulatory Documents' },
];

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div>
      <PageHeader
        title="Compliance"
        description="Transaction monitoring and regulatory compliance"
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'transactions' && <TransactionMonitor />}
        {activeTab === 'kyc' && <KYCAudit />}
        {activeTab === 'regulatory' && <RegulatoryDocs />}
      </div>
    </div>
  );
}
