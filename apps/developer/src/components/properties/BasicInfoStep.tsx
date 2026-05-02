'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { PROPERTY_TYPE_LABELS, NIGERIAN_STATES } from '@/lib/constants';

interface BasicInfoStepProps {
  data: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-5">
      <Input
        label="Property Name"
        value={data.name || ''}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="e.g. Gwarinpa Luxury Duplex"
      />
      <Select
        label="Property Type"
        value={data.type || ''}
        onChange={(e) => onChange('type', e.target.value)}
      >
        <option value="">Select type...</option>
        {Object.entries(PROPERTY_TYPE_LABELS).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </Select>
      <Select
        label="State"
        value={data.state || ''}
        onChange={(e) => onChange('state', e.target.value)}
      >
        <option value="">Select state...</option>
        {NIGERIAN_STATES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </Select>
      <Input
        label="City"
        value={data.city || ''}
        onChange={(e) => onChange('city', e.target.value)}
        placeholder="e.g. Abuja"
      />
      <Input
        label="Area"
        value={data.area || ''}
        onChange={(e) => onChange('area', e.target.value)}
        placeholder="e.g. Gwarinpa"
      />
      <Textarea
        label="Description"
        value={data.description || ''}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Describe the property, its features, and investment potential..."
        rows={4}
      />
    </div>
  );
}
