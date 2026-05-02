'use client';

import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { AddPropertyWizard } from '@/components/properties/AddPropertyWizard';

export default function NewPropertyPage() {
  return (
    <>
      <div className="mb-4">
        <a href="/properties" className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </a>
      </div>

      <PageHeader
        title="Add New Property"
        description="List a new property on PropVest. All financial terms are set by you."
      />

      <AddPropertyWizard />
    </>
  );
}
