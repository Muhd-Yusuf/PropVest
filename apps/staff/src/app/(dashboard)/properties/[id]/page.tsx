'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Pencil, Zap } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { PropertyDetailTabs } from '@/components/properties/PropertyDetailTabs';
import { ApproveRejectModal } from '@/components/properties/ApproveRejectModal';
import { TriggerPayoutModal } from '@/components/payouts/TriggerPayoutModal';
import { usePermission } from '@/hooks/usePermission';
import { mockProperties } from '@/lib/mock-data/index';
import type { PropertyStatus } from '@/lib/types';

const statusBadgeVariant: Record<PropertyStatus, 'neutral' | 'warning' | 'success' | 'info'> = {
  draft: 'neutral',
  under_review: 'warning',
  active: 'success',
  paused: 'info',
  fully_funded: 'success',
  completed: 'neutral',
};

const statusLabels: Record<PropertyStatus, string> = {
  draft: 'Draft',
  under_review: 'Under Review',
  active: 'Active',
  paused: 'Paused',
  fully_funded: 'Fully Funded',
  completed: 'Completed',
};

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { hasPermission } = usePermission();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const property = mockProperties.find((p: { id: string }) => p.id === params.id);

  if (!property) {
    return (
      <div>
        <Button variant="ghost" onClick={() => router.push('/properties')}>
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </Button>
        <EmptyState
          title="Property not found"
          description="The property you are looking for does not exist or has been removed."
        />
      </div>
    );
  }

  const canApprove =
    property.status === 'under_review' && hasPermission('properties.approve');
  const canEdit = hasPermission('properties.crud');
  const canTriggerPayout =
    (property.phase === 'renting' || property.phase === 'selling' || property.phase === 'sold') &&
    (hasPermission('payouts.full') || hasPermission('payouts.prepare'));

  function handleApprove(notes: string) {
    if (!property) return;
    // In a real app, this would call an API
    console.log('Approved:', property.id, notes);
    setShowApproveModal(false);
  }

  function handleReject(notes: string) {
    if (!property) return;
    // In a real app, this would call an API
    console.log('Rejected:', property.id, notes);
    setShowApproveModal(false);
  }

  return (
    <div>
      <div className="mb-4">
        <Button variant="ghost" onClick={() => router.push('/properties')}>
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </Button>
      </div>

      <PageHeader
        title={property.name}
        description={`${property.location.area}, ${property.location.city}, ${property.location.state}`}
        actions={
          <div className="flex items-center gap-2">
            <Badge
              label={statusLabels[property.status]}
              variant={statusBadgeVariant[property.status]}
            />
            {canTriggerPayout && (
              <Button variant="secondary" onClick={() => setShowPayoutModal(true)}>
                <Zap className="w-4 h-4" />
                Trigger Payout
              </Button>
            )}
            {canApprove && (
              <Button onClick={() => setShowApproveModal(true)}>
                <CheckCircle className="w-4 h-4" />
                Review
              </Button>
            )}
            {canEdit && (
              <Button variant="secondary">
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>
        }
      />

      <PropertyDetailTabs property={property} />

      <ApproveRejectModal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        property={property}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <TriggerPayoutModal
        open={showPayoutModal}
        onClose={() => setShowPayoutModal(false)}
        preselectedPropertyId={property.id}
      />
    </div>
  );
}
