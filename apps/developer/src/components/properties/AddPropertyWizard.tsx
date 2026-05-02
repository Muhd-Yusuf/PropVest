'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BasicInfoStep } from './BasicInfoStep';
import { FinancialDetailsStep } from './FinancialDetailsStep';
import { DocumentsStep } from './DocumentsStep';
import { ReviewStep } from './ReviewStep';

const STEPS = [
  { key: 'basic', label: 'Basic Info' },
  { key: 'financial', label: 'Financials' },
  { key: 'documents', label: 'Documents' },
  { key: 'review', label: 'Review' },
];

export function AddPropertyWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [documents, setDocuments] = useState<{ name: string; type: string }[]>([]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddDocument = useCallback((doc: { name: string; type: string }) => {
    setDocuments((prev) => [...prev, doc]);
  }, []);

  const handleRemoveDocument = useCallback((index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = () => {
    alert('Property submitted for review (mock). In production, this would create via API.');
    router.push('/properties');
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return !!(formData.name && formData.type && formData.state && formData.city);
    }
    if (currentStep === 1) {
      return !!(formData.unitPrice && formData.totalUnits);
    }
    return true;
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex items-center">
            <button
              type="button"
              onClick={() => i < currentStep && setCurrentStep(i)}
              className={clsx(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                i === currentStep && 'bg-emerald/15 text-emerald',
                i < currentStep && 'bg-success-bg text-emerald cursor-pointer',
                i > currentStep && 'text-text-tertiary',
              )}
            >
              <span className={clsx(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold',
                i === currentStep && 'bg-emerald text-white',
                i < currentStep && 'bg-emerald text-white',
                i > currentStep && 'bg-bg-tertiary text-text-tertiary',
              )}>
                {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={clsx(
                'w-8 sm:w-12 h-px mx-1',
                i < currentStep ? 'bg-emerald' : 'bg-border-default',
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <Card className="max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-text-primary mb-1">{STEPS[currentStep].label}</h2>
        <p className="text-sm text-text-tertiary mb-6">
          {currentStep === 0 && 'Tell us about your property.'}
          {currentStep === 1 && 'Set your financial terms. All values are defined by you.'}
          {currentStep === 2 && 'Upload supporting documents for verification.'}
          {currentStep === 3 && 'Review your property details before submitting.'}
        </p>

        {currentStep === 0 && <BasicInfoStep data={formData} onChange={handleChange} />}
        {currentStep === 1 && <FinancialDetailsStep data={formData} onChange={handleChange} />}
        {currentStep === 2 && <DocumentsStep documents={documents} onAdd={handleAddDocument} onRemove={handleRemoveDocument} />}
        {currentStep === 3 && <ReviewStep data={formData} documents={documents} />}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-subtle">
          <Button
            variant="secondary"
            onClick={() => currentStep === 0 ? router.push('/properties') : setCurrentStep(currentStep - 1)}
          >
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
            >
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Submit for Review
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
