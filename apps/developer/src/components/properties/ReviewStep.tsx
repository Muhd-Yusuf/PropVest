'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PROPERTY_TYPE_LABELS, PAYOUT_FREQUENCY_LABELS } from '@/lib/constants';

interface ReviewStepProps {
  data: Record<string, string>;
  documents: { name: string; type: string }[];
}

export function ReviewStep({ data, documents }: ReviewStepProps) {
  const type = data.type || '';

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Basic Information</h3>
        <div className="space-y-2">
          <ReviewRow label="Name" value={data.name} />
          <ReviewRow label="Type" value={PROPERTY_TYPE_LABELS[type] || type} />
          <ReviewRow label="Location" value={`${data.area || ''}, ${data.city || ''}, ${data.state || ''}`} />
          <ReviewRow label="Description" value={data.description} />
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Financial Details</h3>
        <div className="space-y-2">
          <ReviewRow label="Unit Price" value={data.unitPrice ? `₦${data.unitPrice}` : '—'} />
          <ReviewRow label="Total Units" value={data.totalUnits || '—'} />
          <ReviewRow label="Management Fee" value={data.managementFee ? `${data.managementFee}%` : '—'} />

          {type === 'rental' && (
            <>
              <ReviewRow label="Annual Rent" value={data.annualRent ? `₦${data.annualRent}` : '—'} />
              <ReviewRow label="Payout Frequency" value={PAYOUT_FREQUENCY_LABELS[data.payoutFrequency] || '—'} />
              <ReviewRow label="Expected Yield" value={data.rentYield ? `${data.rentYield}%` : '—'} />
            </>
          )}
          {type === 'build_sell' && (
            <>
              <ReviewRow label="Build Cost" value={data.buildCost ? `₦${data.buildCost}` : '—'} />
              <ReviewRow label="Est. Sale Price" value={data.estimatedSalePrice ? `₦${data.estimatedSalePrice}` : '—'} />
              <ReviewRow label="Timeline" value={data.timelineMonths ? `${data.timelineMonths} months` : '—'} />
            </>
          )}
          {type === 'land' && (
            <>
              <ReviewRow label="Total Area" value={data.totalArea ? `${data.totalArea} sqm` : '—'} />
              <ReviewRow label="Price/sqm" value={data.pricePerSqm ? `₦${data.pricePerSqm}` : '—'} />
              <ReviewRow label="Appreciation Rate" value={data.appreciationRate ? `${data.appreciationRate}%` : '—'} />
              <ReviewRow label="Hold Period" value={data.holdPeriod ? `${data.holdPeriod} months` : '—'} />
            </>
          )}
          {type === 'other' && (
            <>
              <ReviewRow label="Return Model" value={data.returnModelDescription || '—'} />
              <ReviewRow label="Est. Return" value={data.estimatedReturn ? `${data.estimatedReturn}%` : '—'} />
              <ReviewRow label="Timeline" value={data.estimatedTimeline ? `${data.estimatedTimeline} months` : '—'} />
            </>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Documents ({documents.length})</h3>
        {documents.length === 0 ? (
          <p className="text-sm text-text-tertiary">No documents uploaded.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {documents.map((doc, i) => (
              <Badge key={i} label={doc.name} variant="neutral" />
            ))}
          </div>
        )}
      </Card>

      <div className="p-4 rounded-lg bg-warning-bg border border-warning/20">
        <p className="text-sm text-text-primary font-medium">Ready to submit?</p>
        <p className="text-xs text-text-secondary mt-1">
          Once submitted, your property will be reviewed by the PropVest team. You'll be notified when it's approved.
        </p>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-text-tertiary shrink-0">{label}</span>
      <span className="text-sm font-medium text-text-primary text-right">{value || '—'}</span>
    </div>
  );
}
