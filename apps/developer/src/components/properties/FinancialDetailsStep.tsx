'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { PAYOUT_FREQUENCY_LABELS } from '@/lib/constants';

interface FinancialDetailsStepProps {
  data: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function FinancialDetailsStep({ data, onChange }: FinancialDetailsStepProps) {
  const propertyType = data.type || '';

  return (
    <div className="space-y-6">
      {/* Common fields */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Core Financials</h3>
        <p className="text-xs text-text-tertiary mb-4">All values are set by you. We only show placeholder examples.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Unit Price (&#8358;)"
            value={data.unitPrice || ''}
            onChange={(e) => onChange('unitPrice', e.target.value)}
            placeholder="e.g. 150,000"
          />
          <Input
            label="Total Units"
            value={data.totalUnits || ''}
            onChange={(e) => onChange('totalUnits', e.target.value)}
            placeholder="e.g. 600"
          />
          <Input
            label="Management Fee (%)"
            value={data.managementFee || ''}
            onChange={(e) => onChange('managementFee', e.target.value)}
            placeholder="e.g. 10"
          />
        </div>
        <p className="text-xs text-text-tertiary mt-2">
          Management fee is your compensation for managing the property (maintenance, tenant relations, etc.). It&apos;s deducted from rent/proceeds before investor payouts. Platform fee is set by PropVest admin.
        </p>
      </Card>

      {/* Rental-specific fields */}
      {propertyType === 'rental' && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Rental Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Expected Annual Rent (&#8358;)"
              value={data.annualRent || ''}
              onChange={(e) => onChange('annualRent', e.target.value)}
              placeholder="e.g. 4,200,000"
            />
            <Select
              label="Payout Frequency"
              value={data.payoutFrequency || ''}
              onChange={(e) => onChange('payoutFrequency', e.target.value)}
            >
              <option value="">Select frequency...</option>
              {Object.entries(PAYOUT_FREQUENCY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </Select>
            <Input
              label="Expected Yield (%)"
              value={data.rentYield || ''}
              onChange={(e) => onChange('rentYield', e.target.value)}
              placeholder="e.g. 8.5"
            />
          </div>
        </Card>
      )}

      {/* Build & Sell-specific fields */}
      {propertyType === 'build_sell' && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Build & Sell Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Build Cost (&#8358;)"
              value={data.buildCost || ''}
              onChange={(e) => onChange('buildCost', e.target.value)}
              placeholder="e.g. 130,000,000"
            />
            <Input
              label="Estimated Sale Price (&#8358;)"
              value={data.estimatedSalePrice || ''}
              onChange={(e) => onChange('estimatedSalePrice', e.target.value)}
              placeholder="e.g. 250,000,000"
            />
            <Input
              label="Timeline (months)"
              value={data.timelineMonths || ''}
              onChange={(e) => onChange('timelineMonths', e.target.value)}
              placeholder="e.g. 14"
            />
          </div>
        </Card>
      )}

      {/* Land-specific fields */}
      {propertyType === 'land' && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Land Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Total Area (sqm)"
              value={data.totalArea || ''}
              onChange={(e) => onChange('totalArea', e.target.value)}
              placeholder="e.g. 10,000"
            />
            <Input
              label="Price per sqm (&#8358;)"
              value={data.pricePerSqm || ''}
              onChange={(e) => onChange('pricePerSqm', e.target.value)}
              placeholder="e.g. 50,000"
            />
            <Input
              label="Estimated Appreciation Rate (%)"
              value={data.appreciationRate || ''}
              onChange={(e) => onChange('appreciationRate', e.target.value)}
              placeholder="e.g. 15"
            />
            <Input
              label="Hold Period (months)"
              value={data.holdPeriod || ''}
              onChange={(e) => onChange('holdPeriod', e.target.value)}
              placeholder="e.g. 24"
            />
          </div>
        </Card>
      )}

      {/* Other type */}
      {propertyType === 'other' && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Custom Return Model</h3>
          <div className="space-y-4">
            <Textarea
              label="Return Model Description"
              value={data.returnModelDescription || ''}
              onChange={(e) => onChange('returnModelDescription', e.target.value)}
              placeholder="Describe how investors will earn returns on this property..."
              rows={3}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Estimated Return (%)"
                value={data.estimatedReturn || ''}
                onChange={(e) => onChange('estimatedReturn', e.target.value)}
                placeholder="e.g. 25"
              />
              <Input
                label="Timeline (months)"
                value={data.estimatedTimeline || ''}
                onChange={(e) => onChange('estimatedTimeline', e.target.value)}
                placeholder="e.g. 12"
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
