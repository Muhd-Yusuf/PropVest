'use client';

import { use, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { properties } from '@/lib/mock-data';
import { PROPERTY_TYPE_LABELS, NIGERIAN_STATES, PAYOUT_FREQUENCY_LABELS } from '@/lib/constants';

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);

  const [name, setName] = useState(property?.name || '');
  const [description, setDescription] = useState(property?.description || '');
  const [unitPrice, setUnitPrice] = useState(String(property?.unitPrice || ''));
  const [totalUnits, setTotalUnits] = useState(String(property?.totalUnits || ''));
  const [platformFee, setPlatformFee] = useState(String(property?.platformFeePercent || ''));
  const [managementFee, setManagementFee] = useState(String(property?.managementFeePercent || ''));

  if (!property) {
    return <EmptyState title="Property not found" description="This property does not exist." />;
  }

  const handleSave = () => {
    alert('Changes saved (mock). In production, this would update via API.');
  };

  return (
    <>
      <div className="mb-4">
        <a href={`/properties/${property.id}`} className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Property
        </a>
      </div>

      <PageHeader
        title={`Edit: ${property.name}`}
        description="Update your property details. Financial fields are fully under your control."
        actions={
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1.5" />
            Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Basic Information</h3>
          <div className="space-y-4">
            <Input label="Property Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Select label="Type" value={property.type} disabled>
              {Object.entries(PROPERTY_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </Select>
            <Select label="State" value={property.location.state} disabled>
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
            <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Financial Details</h3>
          <div className="space-y-4">
            <Input label="Unit Price (₦)" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} placeholder="e.g. 150,000" />
            <Input label="Total Units" value={totalUnits} onChange={(e) => setTotalUnits(e.target.value)} placeholder="e.g. 600" />
            <Input label="Platform Fee (%)" value={platformFee} onChange={(e) => setPlatformFee(e.target.value)} placeholder="e.g. 2" />
            <Input label="Management Fee (%)" value={managementFee} onChange={(e) => setManagementFee(e.target.value)} placeholder="e.g. 10" />
            {property.type === 'rental' && (
              <>
                <Input label="Annual Rent (₦)" defaultValue={String(property.annualRent || '')} placeholder="e.g. 4,200,000" />
                <Select label="Payout Frequency" defaultValue={property.payoutFrequency || 'quarterly'}>
                  {Object.entries(PAYOUT_FREQUENCY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </Select>
              </>
            )}
            {property.type === 'build_sell' && (
              <>
                <Input label="Build Cost (₦)" defaultValue={String(property.buildCost || '')} placeholder="e.g. 130,000,000" />
                <Input label="Estimated Sale Price (₦)" defaultValue={String(property.estimatedSalePrice || '')} placeholder="e.g. 250,000,000" />
                <Input label="Timeline (months)" defaultValue={String(property.timelineMonths || '')} placeholder="e.g. 14" />
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
