'use client';

import { Upload, FileText, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface DocumentsStepProps {
  documents: { name: string; type: string }[];
  onAdd: (doc: { name: string; type: string }) => void;
  onRemove: (index: number) => void;
}

const DOCUMENT_TYPES = [
  { value: 'c_of_o', label: 'Certificate of Occupancy' },
  { value: 'building_plan', label: 'Building Plan' },
  { value: 'governors_consent', label: "Governor's Consent" },
  { value: 'ownership_proof', label: 'Proof of Ownership' },
  { value: 'survey_plan', label: 'Survey Plan' },
  { value: 'other', label: 'Other Document' },
];

export function DocumentsStep({ documents, onAdd, onRemove }: DocumentsStepProps) {
  const handleMockUpload = (type: string) => {
    const docType = DOCUMENT_TYPES.find((d) => d.value === type);
    onAdd({ name: docType?.label || type, type });
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">Upload Documents</h3>
        <p className="text-xs text-text-tertiary mb-4">
          Upload required documents to verify your property. These will be reviewed by the PropVest team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DOCUMENT_TYPES.map((docType) => {
            const isUploaded = documents.some((d) => d.type === docType.value);
            return (
              <button
                key={docType.value}
                type="button"
                onClick={() => !isUploaded && handleMockUpload(docType.value)}
                disabled={isUploaded}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors text-left cursor-pointer ${
                  isUploaded
                    ? 'border-emerald/30 bg-success-bg'
                    : 'border-border-default hover:border-emerald/50 hover:bg-bg-secondary'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isUploaded ? 'bg-emerald/15' : 'bg-bg-tertiary'
                }`}>
                  {isUploaded ? (
                    <FileText className="w-4 h-4 text-emerald" />
                  ) : (
                    <Upload className="w-4 h-4 text-text-tertiary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{docType.label}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    {isUploaded ? 'Uploaded' : 'Click to upload'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {documents.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Uploaded Documents</h3>
          <div className="space-y-2">
            {documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-bg-secondary">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald" />
                  <span className="text-sm text-text-primary">{doc.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="w-7 h-7 flex items-center justify-center rounded text-text-tertiary hover:text-error hover:bg-error-bg transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
