'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Avatar } from '@/components/ui/Avatar';
import { formatNairaFull, formatDate } from '@/lib/format';
import { investors, properties } from '@/lib/mock-data';

export function InvestorsList() {
  const [search, setSearch] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('');

  const filtered = useMemo(() => {
    return investors.filter((inv) => {
      if (search && !inv.fullName.toLowerCase().includes(search.toLowerCase()) && !inv.email.toLowerCase().includes(search.toLowerCase())) return false;
      if (propertyFilter && inv.propertyId !== propertyFilter) return false;
      return true;
    });
  }, [search, propertyFilter]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Search investors..." />
        </div>
        <Select value={propertyFilter} onChange={(e) => setPropertyFilter(e.target.value)} className="w-full sm:w-56">
          <option value="">All Properties</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </Select>
      </div>

      <Card>
        {filtered.length === 0 ? (
          <p className="text-sm text-text-tertiary text-center py-8">No investors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-3 px-3 font-medium text-text-tertiary">Investor</th>
                  <th className="text-left py-3 px-3 font-medium text-text-tertiary">Property</th>
                  <th className="text-right py-3 px-3 font-medium text-text-tertiary">Units</th>
                  <th className="text-right py-3 px-3 font-medium text-text-tertiary">Invested</th>
                  <th className="text-right py-3 px-3 font-medium text-text-tertiary">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr key={inv.id} className="border-b border-border-subtle last:border-0 hover:bg-bg-secondary transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={inv.fullName} size="sm" />
                        <div>
                          <p className="font-medium text-text-primary">{inv.fullName}</p>
                          <p className="text-xs text-text-tertiary">{inv.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-text-secondary">{inv.propertyName}</td>
                    <td className="py-3 px-3 text-right font-mono text-text-primary">{inv.units}</td>
                    <td className="py-3 px-3 text-right font-mono text-text-primary">{formatNairaFull(inv.investedAmount)}</td>
                    <td className="py-3 px-3 text-right text-text-tertiary">{formatDate(inv.investedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
