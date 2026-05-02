'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { loadConfig, saveConfig } from '@/lib/platform-config';

export function PayoutSettings() {
  const config = loadConfig();
  const [frequency, setFrequency] = useState(config.defaultPayoutFrequency);
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(String(config.autoApproveThreshold));
  const [processingDay, setProcessingDay] = useState(String(config.payoutProcessingDay));
  const [retryFailed, setRetryFailed] = useState(config.retryFailedPayouts);
  const [saved, setSaved] = useState(false);

  const frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
  ];

  function handleSave() {
    const updated = loadConfig();
    updated.defaultPayoutFrequency = frequency as 'monthly' | 'quarterly';
    updated.autoApproveThreshold = parseInt(autoApproveThreshold, 10) || 1_000_000;
    updated.payoutProcessingDay = Math.min(Math.max(parseInt(processingDay, 10) || 1, 1), 28);
    updated.retryFailedPayouts = retryFailed;
    saveConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Payout Configuration
      </h3>
      <div className="space-y-4">
        <Select
          label="Default Payout Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'monthly' | 'quarterly')}
          options={frequencyOptions}
        />
        <Input
          label="Payout Processing Day"
          type="number"
          value={processingDay}
          onChange={(e) => setProcessingDay(e.target.value)}
          placeholder="1"
        />
        <p className="text-xs text-text-tertiary -mt-2">
          Day of the month payouts are processed (1–28).
        </p>
        <Input
          label="Auto-approve Threshold (N)"
          type="number"
          value={autoApproveThreshold}
          onChange={(e) => setAutoApproveThreshold(e.target.value)}
          placeholder="1000000"
        />
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-sm font-medium text-text-primary">
              Retry Failed Payouts
            </p>
            <p className="text-xs text-text-tertiary mt-0.5">
              Automatically retry payouts that fail due to bank errors
            </p>
          </div>
          <Toggle checked={retryFailed} onChange={setRetryFailed} />
        </div>
        <Button onClick={handleSave} size="sm">
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
}
