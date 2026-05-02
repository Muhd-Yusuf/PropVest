'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { FeeSettings } from '@/components/settings/FeeSettings';
import { KYCSettings } from '@/components/settings/KYCSettings';
import { PayoutSettings } from '@/components/settings/PayoutSettings';
import { InvestmentSettings } from '@/components/settings/InvestmentSettings';
import { ReferralSettings } from '@/components/settings/ReferralSettings';
import { SupportSettings } from '@/components/settings/SupportSettings';
import { FeatureFlags } from '@/components/settings/FeatureFlags';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role !== 'ceo' && user.role !== 'coo') {
      router.replace('/unauthorized');
    }
  }, [user, router]);

  if (!user || (user.role !== 'ceo' && user.role !== 'coo')) return null;

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Platform configuration and feature flags"
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FeeSettings />
        <KYCSettings />
        <PayoutSettings />
        <InvestmentSettings />
        <ReferralSettings />
        <SupportSettings />
        <FeatureFlags />
      </div>
    </div>
  );
}
