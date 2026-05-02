'use client';

import { useMemo } from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { mockKYCRecords } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';

export function KYCStats() {
  const stats = useMemo(() => {
    const total = mockKYCRecords.length;
    const pending = mockKYCRecords.filter((r) => r.status === 'pending').length;
    const approved = mockKYCRecords.filter((r) => r.status === 'approved').length;
    const rejected = mockKYCRecords.filter((r) => r.status === 'rejected').length;
    return { total, pending, approved, rejected };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Reviews"
        value={String(stats.total)}
        icon={FileText}
      />
      <StatCard
        label="Pending"
        value={String(stats.pending)}
        icon={Clock}
      />
      <StatCard
        label="Approved"
        value={String(stats.approved)}
        icon={CheckCircle}
      />
      <StatCard
        label="Rejected"
        value={String(stats.rejected)}
        icon={XCircle}
      />
    </div>
  );
}
