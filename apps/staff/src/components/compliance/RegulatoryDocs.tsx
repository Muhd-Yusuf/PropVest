'use client';

import { FileText, Download } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const regulatoryDocuments = [
  {
    id: 'doc-001',
    name: 'AML Policy',
    type: 'Policy Document',
    lastUpdated: '2025-12-15T10:00:00.000Z',
  },
  {
    id: 'doc-002',
    name: 'KYC Procedures',
    type: 'Operational Procedure',
    lastUpdated: '2026-01-20T14:00:00.000Z',
  },
  {
    id: 'doc-003',
    name: 'Data Protection Policy',
    type: 'Policy Document',
    lastUpdated: '2025-11-05T09:00:00.000Z',
  },
  {
    id: 'doc-004',
    name: 'Terms of Service',
    type: 'Legal Agreement',
    lastUpdated: '2026-03-01T11:00:00.000Z',
  },
  {
    id: 'doc-005',
    name: 'Privacy Policy',
    type: 'Policy Document',
    lastUpdated: '2026-02-10T16:00:00.000Z',
  },
];

export function RegulatoryDocs() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Regulatory Documents
      </h3>
      <div className="divide-y divide-border-subtle">
        {regulatoryDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-royal/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-royal" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                <p className="text-xs text-text-tertiary">
                  {doc.type} &middot; Last updated{' '}
                  {new Date(doc.lastUpdated).toLocaleDateString('en-NG', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
