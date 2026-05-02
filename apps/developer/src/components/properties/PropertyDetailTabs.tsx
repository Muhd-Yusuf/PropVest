'use client';

import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatNaira, formatNairaFull, formatPercent, formatDate } from '@/lib/format';
import { PROPERTY_PHASE_LABELS, PROPERTY_TYPE_LABELS, PAYOUT_FREQUENCY_LABELS } from '@/lib/constants';
import type { Property, PropertyInvestor, Payout } from '@/lib/types';

interface PropertyDetailTabsProps {
  property: Property;
  propertyInvestors: PropertyInvestor[];
  propertyPayouts: Payout[];
}

export function PropertyDetailTabs({ property, propertyInvestors, propertyPayouts }: PropertyDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'investors', label: 'Investors', count: propertyInvestors.length },
    { key: 'payouts', label: 'Payouts', count: propertyPayouts.length },
    { key: 'documents', label: 'Documents', count: property.documents.length },
  ];

  const fundingPercent = Math.round((property.unitsSold / property.totalUnits) * 100);

  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Property Details</h3>
              <div className="space-y-3">
                <DetailRow label="Type" value={PROPERTY_TYPE_LABELS[property.type] || property.type} />
                <DetailRow label="Phase" value={PROPERTY_PHASE_LABELS[property.phase] || property.phase} />
                <DetailRow label="Location" value={`${property.location.area}, ${property.location.city}, ${property.location.state}`} />
                <DetailRow label="Total Value" value={formatNaira(property.totalValue)} />
                <DetailRow label="Unit Price" value={formatNairaFull(property.unitPrice)} />
                <DetailRow label="Total Units" value={property.totalUnits.toLocaleString()} />
                <DetailRow label="Units Sold" value={property.unitsSold.toLocaleString()} />
                {property.type === 'rental' && (
                  <>
                    <DetailRow label="Annual Rent" value={formatNaira(property.annualRent || 0)} />
                    <DetailRow label="Rent Yield" value={formatPercent(property.rentYield || 0)} />
                    <DetailRow label="Payout Frequency" value={PAYOUT_FREQUENCY_LABELS[property.payoutFrequency || 'quarterly']} />
                  </>
                )}
                {property.type === 'build_sell' && (
                  <>
                    <DetailRow label="Build Cost" value={formatNaira(property.buildCost || 0)} />
                    <DetailRow label="Est. Sale Price" value={formatNaira(property.estimatedSalePrice || 0)} />
                    <DetailRow label="Timeline" value={`${property.timelineMonths || 0} months`} />
                  </>
                )}
                {property.type === 'land' && (
                  <>
                    <DetailRow label="Total Area" value={`${(property.totalAreaSqm || 0).toLocaleString()} sqm`} />
                    <DetailRow label="Price/sqm" value={formatNairaFull(property.pricePerSqm || 0)} />
                  </>
                )}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Funding Progress</h3>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-text-primary">{fundingPercent}%</p>
                <p className="text-sm text-text-tertiary mt-1">of units sold</p>
              </div>
              <ProgressBar value={fundingPercent} />
              <div className="flex justify-between mt-3 text-xs text-text-tertiary">
                <span>{property.unitsSold.toLocaleString()} sold</span>
                <span>{(property.totalUnits - property.unitsSold).toLocaleString()} remaining</span>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle">
                <h4 className="text-sm font-semibold text-text-primary mb-3">Fee Structure</h4>
                <div className="space-y-2">
                  <DetailRow label="Platform Fee" value={`${property.platformFeePercent}%`} />
                  <DetailRow label="Management Fee" value={`${property.managementFeePercent}%`} />
                </div>
              </div>

              {property.constructionProgress !== undefined && property.constructionProgress > 0 && (
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Construction</h4>
                  <ProgressBar value={property.constructionProgress} />
                  <p className="text-xs text-text-tertiary mt-2">{property.constructionProgress}% complete</p>
                </div>
              )}
            </Card>

            <Card className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-text-primary mb-2">Description</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{property.description}</p>
            </Card>
          </div>
        )}

        {activeTab === 'investors' && (
          <Card>
            {propertyInvestors.length === 0 ? (
              <p className="text-sm text-text-tertiary text-center py-8">No investors yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-default">
                      <th className="text-left py-3 px-2 font-medium text-text-tertiary">Investor</th>
                      <th className="text-left py-3 px-2 font-medium text-text-tertiary">Email</th>
                      <th className="text-right py-3 px-2 font-medium text-text-tertiary">Units</th>
                      <th className="text-right py-3 px-2 font-medium text-text-tertiary">Invested</th>
                      <th className="text-right py-3 px-2 font-medium text-text-tertiary">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyInvestors.map((inv) => (
                      <tr key={inv.id} className="border-b border-border-subtle last:border-0">
                        <td className="py-3 px-2 font-medium text-text-primary">{inv.fullName}</td>
                        <td className="py-3 px-2 text-text-secondary">{inv.email}</td>
                        <td className="py-3 px-2 text-right font-mono text-text-primary">{inv.units}</td>
                        <td className="py-3 px-2 text-right font-mono text-text-primary">{formatNairaFull(inv.investedAmount)}</td>
                        <td className="py-3 px-2 text-right text-text-tertiary">{formatDate(inv.investedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'payouts' && (
          <Card>
            {propertyPayouts.length === 0 ? (
              <p className="text-sm text-text-tertiary text-center py-8">No payouts yet.</p>
            ) : (
              <div className="space-y-3">
                {propertyPayouts.map((payout) => (
                  <a
                    key={payout.id}
                    href={`/payouts/${payout.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-border-subtle hover:border-border-default transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">{payout.period}</p>
                      <p className="text-xs text-text-tertiary mt-0.5">{payout.investorPayouts.length} investors paid</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-medium text-text-primary">{formatNaira(payout.distributableAmount)}</p>
                      <Badge label={payout.status} variant={payout.status === 'completed' ? 'success' : 'warning'} className="mt-1" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card>
            {property.documents.length === 0 ? (
              <p className="text-sm text-text-tertiary text-center py-8">No documents uploaded.</p>
            ) : (
              <div className="space-y-2">
                {property.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border-subtle">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                      <p className="text-xs text-text-tertiary mt-0.5 capitalize">{doc.type.replace(/_/g, ' ')}</p>
                    </div>
                    <Badge label="Uploaded" variant="neutral" />
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-tertiary">{label}</span>
      <span className="text-sm font-medium text-text-primary">{value}</span>
    </div>
  );
}
