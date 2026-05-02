'use client';

import { useState } from 'react';
import type { Investor } from '@/lib/types';
import { formatNaira, formatDate, formatRelativeTime } from '@/lib/format';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock, Info } from 'lucide-react';

const kycTierBadge = (tier: 1 | 2 | 3) => {
  const map = { 1: 'neutral', 2: 'info', 3: 'success' } as const;
  return <Badge label={`Tier ${tier}`} variant={map[tier]} />;
};

const kycStatusBadge = (status: string) => {
  const map: Record<string, 'success' | 'warning' | 'error'> = {
    verified: 'success',
    pending: 'warning',
    rejected: 'error',
  };
  return <Badge label={status.charAt(0).toUpperCase() + status.slice(1)} variant={map[status] ?? 'neutral'} />;
};

interface InvestorDetailTabsProps {
  investor: Investor;
}

export function InvestorDetailTabs({ investor }: InvestorDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'investments', label: 'Investments' },
    { key: 'bank_accounts', label: 'Bank Accounts' },
    { key: 'activity', label: 'Activity' },
  ];

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Full Name</p>
                  <p className="text-sm text-text-primary mt-1 font-medium">{investor.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Email</p>
                  <p className="text-sm text-text-primary mt-1">{investor.email}</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Phone</p>
                  <p className="text-sm text-text-primary mt-1">{investor.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">KYC Tier</p>
                  <div className="mt-1">{kycTierBadge(investor.kycTier)}</div>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">KYC Status</p>
                  <div className="mt-1">{kycStatusBadge(investor.kycStatus)}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Joined</p>
                  <p className="text-sm text-text-primary mt-1">{formatDate(investor.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Last Login</p>
                  <p className="text-sm text-text-primary mt-1">{formatRelativeTime(investor.lastLoginAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Account Status</p>
                  <div className="mt-1 flex items-center gap-2">
                    {investor.isFrozen && <Badge label="Frozen" variant="error" />}
                    {investor.isFlagged && <Badge label="Flagged" variant="warning" />}
                    {!investor.isFrozen && !investor.isFlagged && <Badge label="Active" variant="success" />}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'investments' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Properties</p>
              <p className="text-2xl font-mono font-bold text-text-primary mt-1">{investor.propertiesCount}</p>
            </Card>
            <Card>
              <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Total Invested</p>
              <p className="text-2xl font-mono font-bold text-text-primary mt-1">{formatNaira(investor.totalInvested)}</p>
            </Card>
            <Card>
              <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium">Current Value</p>
              <p className="text-2xl font-mono font-bold text-text-primary mt-1">{formatNaira(investor.currentValue)}</p>
              {investor.totalInvested > 0 && (
                <p className="text-xs text-emerald mt-1">
                  +{(((investor.currentValue - investor.totalInvested) / investor.totalInvested) * 100).toFixed(1)}% returns
                </p>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'bank_accounts' && (
          <Card>
            {investor.bankAccounts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-text-tertiary">No bank accounts linked</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-default">
                      <th className="py-3 px-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">Bank Name</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">Account Number</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">Account Name</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-text-tertiary uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {investor.bankAccounts.map((account, i) => (
                      <tr key={i}>
                        <td className="py-3 px-4 text-sm text-text-primary">{account.bankName}</td>
                        <td className="py-3 px-4 text-sm text-text-primary font-mono">{account.accountNumber}</td>
                        <td className="py-3 px-4 text-sm text-text-primary">{account.accountName}</td>
                        <td className="py-3 px-4 text-sm">
                          {account.isPrimary ? (
                            <Badge label="Primary" variant="success" />
                          ) : (
                            <Badge label="Secondary" variant="neutral" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'activity' && (
          <Card>
            <div className="flex items-center gap-3 py-8 justify-center text-text-tertiary">
              <Info className="w-5 h-5" />
              <p className="text-sm">Transaction history will be available when backend is connected</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
