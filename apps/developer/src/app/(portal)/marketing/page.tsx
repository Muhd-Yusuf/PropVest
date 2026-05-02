'use client';

import { Link2, QrCode, Copy, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { properties } from '@/lib/mock-data';

export default function MarketingPage() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <>
      <PageHeader title="Marketing" description="Share branded links and QR codes for your properties." />

      <div className="space-y-4">
        {properties.filter((p) => p.status === 'active').map((property) => {
          const link = `https://propvest.co/property/${property.id}`;
          return (
            <Card key={property.id}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{property.name}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">{property.location.area}, {property.location.city}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Link2 className="w-3.5 h-3.5 text-text-tertiary" />
                    <code className="text-xs text-emerald bg-success-bg px-2 py-0.5 rounded">{link}</code>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleCopy(link)}>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copy
                  </Button>
                  <Button variant="secondary" size="sm">
                    <QrCode className="w-3.5 h-3.5 mr-1" />
                    QR Code
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
