'use client';

import { use } from 'react';
import { ArrowLeft, Edit } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { PropertyDetailTabs } from '@/components/properties/PropertyDetailTabs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { properties, investors, payouts } from '@/lib/mock-data';
import { PROPERTY_STATUS_LABELS } from '@/lib/constants';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return <EmptyState title="Property not found" description="This property does not exist." />;
  }

  const propertyInvestors = investors.filter((i) => i.propertyId === property.id);
  const propertyPayouts = payouts.filter((p) => p.propertyId === property.id);

  return (
    <>
      <div className="mb-4">
        <a href="/properties" className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </a>
      </div>

      <PageHeader
        title={property.name}
        description={`${property.location.area}, ${property.location.city}, ${property.location.state}`}
        actions={
          <div className="flex items-center gap-2">
            <Badge label={PROPERTY_STATUS_LABELS[property.status]} variant={property.status === 'active' ? 'success' : property.status === 'under_review' ? 'warning' : 'neutral'} />
            <a href={`/properties/${property.id}/edit`}>
              <Button variant="secondary" size="sm">
                <Edit className="w-4 h-4 mr-1.5" />
                Edit
              </Button>
            </a>
          </div>
        }
      />

      <PropertyDetailTabs
        property={property}
        propertyInvestors={propertyInvestors}
        propertyPayouts={propertyPayouts}
      />
    </>
  );
}
