'use client';

import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';

interface PropertyFiltersProps {
  filters: { search: string; type: string; status: string };
  onChange: (filters: { search: string; type: string; status: string }) => void;
}

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'rental', label: 'Rental' },
  { value: 'build_sell', label: 'Build & Sell' },
  { value: 'land', label: 'Land' },
];

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'fully_funded', label: 'Fully Funded' },
  { value: 'completed', label: 'Completed' },
];

export function PropertyFilters({ filters, onChange }: PropertyFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-full sm:w-64">
        <SearchInput
          value={filters.search}
          onChange={(value) => onChange({ ...filters, search: value })}
          placeholder="Search properties..."
        />
      </div>
      <div className="w-full sm:w-44">
        <Select
          options={typeOptions}
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value })}
        />
      </div>
      <div className="w-full sm:w-44">
        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        />
      </div>
    </div>
  );
}
