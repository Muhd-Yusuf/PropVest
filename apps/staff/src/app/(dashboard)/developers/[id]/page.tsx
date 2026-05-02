'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DeveloperDetailTabs } from '@/components/developers/DeveloperDetailTabs';
import { mockDevelopers } from '@/lib/mock-data';

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
};

export default function DeveloperDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const developer = mockDevelopers.find((d) => d.id === id);

  if (!developer) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Developer not found.</p>
        <Button variant="ghost" onClick={() => router.push('/developers')} className="mt-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Developers
        </Button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => router.push('/developers')}
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Developers
      </button>

      <PageHeader
        title={developer.companyName}
        actions={
          <Badge
            label={developer.status.charAt(0).toUpperCase() + developer.status.slice(1)}
            variant={statusVariant[developer.status] || 'neutral'}
          />
        }
      />

      <DeveloperDetailTabs developer={developer} />
    </div>
  );
}
