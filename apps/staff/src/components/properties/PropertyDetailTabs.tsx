'use client';

import { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PaymentRoutingCard } from '@/components/properties/PaymentRoutingCard';
import { formatNairaFull, formatDate, formatPercent, formatNumber } from '@/lib/format';
import { PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS } from '@/lib/constants';
import type { Property } from '@/lib/types';

interface PropertyDetailTabsProps {
  property: Property;
}

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'payment-routing', label: 'Payment Routing' },
  { key: 'financial', label: 'Financial' },
  { key: 'documents', label: 'Documents' },
  { key: 'investors', label: 'Investors' },
];

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start py-3 border-b border-border-subtle last:border-b-0">
      <dt className="text-sm font-medium text-text-tertiary sm:w-48 shrink-0">{label}</dt>
      <dd className="text-sm text-text-primary mt-1 sm:mt-0">{value}</dd>
    </div>
  );
}

export function PropertyDetailTabs({ property }: PropertyDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <Card className="p-0">
        <div className="px-5 pt-5">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {activeTab !== 'payment-routing' && (
        <div className="p-5">
        {activeTab === 'overview' && (
          <dl>
            <DetailRow label="Description" value={property.description} />
            <DetailRow
              label="Type"
              value={PROPERTY_TYPE_LABELS[property.type] || property.type}
            />
            <DetailRow
              label="Status"
              value={PROPERTY_STATUS_LABELS[property.status] || property.status}
            />
            <DetailRow
              label="Location"
              value={`${property.location.area}, ${property.location.city}, ${property.location.state}`}
            />
            <DetailRow label="Developer" value={property.developerName} />
            <DetailRow label="Created" value={formatDate(property.createdAt)} />
            {property.approvedAt && (
              <DetailRow label="Approved" value={formatDate(property.approvedAt)} />
            )}
          </dl>
        )}

        {activeTab === 'financial' && (
          <dl>
            <DetailRow label="Total Value" value={formatNairaFull(property.totalValue)} />
            <DetailRow label="Unit Price" value={formatNairaFull(property.unitPrice)} />
            <DetailRow
              label="Units"
              value={`${formatNumber(property.unitsSold)} / ${formatNumber(property.totalUnits)} sold`}
            />
            <DetailRow label="Yield" value={property.yield} />
            <DetailRow
              label="Platform Fee"
              value={formatPercent(property.platformFeePercent)}
            />
            <DetailRow
              label="Management Fee"
              value={formatPercent(property.managementFeePercent)}
            />
            <DetailRow
              label="Paystack Subaccount"
              value={property.paystackSubaccountCode || 'Not configured'}
            />
            <DetailRow
              label="DVA Account"
              value={
                property.dvaAccountNumber
                  ? `${property.dvaAccountNumber} (${property.dvaBank})`
                  : 'Not configured'
              }
            />
          </dl>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-3">
            {property.documents.length === 0 ? (
              <p className="text-sm text-text-tertiary py-4 text-center">No documents uploaded</p>
            ) : (
              property.documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg border border-border-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center">
                      <FileText className="w-4 h-4 text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                      <p className="text-xs text-text-tertiary capitalize">{doc.type}</p>
                    </div>
                  </div>
                  <a
                    href={doc.url}
                    className="inline-flex items-center gap-1 text-sm text-royal hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'investors' && (
          <div className="py-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-text-tertiary">Total Investors:</span>
              <Badge
                label={formatNumber(property.investorCount)}
                variant={property.investorCount > 0 ? 'success' : 'neutral'}
              />
            </div>
            {property.investorCount > 0 ? (
              <p className="text-sm text-text-secondary">
                This property has {formatNumber(property.investorCount)} investors who have
                purchased {formatNumber(property.unitsSold)} of{' '}
                {formatNumber(property.totalUnits)} available units.
              </p>
            ) : (
              <p className="text-sm text-text-tertiary">
                No investors yet. This property has not received any investments.
              </p>
            )}
          </div>
        )}
      </div>
        )}
      </Card>

      {activeTab === 'payment-routing' && (
        <div className="mt-5">
          <PaymentRoutingCard property={property} />
        </div>
      )}
    </div>
  );
}
