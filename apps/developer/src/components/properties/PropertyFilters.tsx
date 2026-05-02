'use client';

import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS } from '@/lib/constants';

interface PropertyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function PropertyFilters({
  search, onSearchChange,
  typeFilter, onTypeFilterChange,
  statusFilter, onStatusFilterChange,
}: PropertyFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search properties..."
        />
      </div>
      <Select
        value={typeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
        className="w-full sm:w-40"
      >
        <option value="">All Types</option>
        {Object.entries(PROPERTY_TYPE_LABELS).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </Select>
      <Select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="w-full sm:w-40"
      >
        <option value="">All Status</option>
        {Object.entries(PROPERTY_STATUS_LABELS).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </Select>
    </div>
  );
}
