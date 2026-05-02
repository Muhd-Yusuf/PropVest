'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loadConfig, saveConfig } from '@/lib/platform-config';

export function InvestmentSettings() {
  const config = loadConfig();
  const [minAmount, setMinAmount] = useState(String(config.minInvestmentAmount));
  const [maxUnits, setMaxUnits] = useState(String(config.maxUnitsPerInvestor));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const updated = loadConfig();
    updated.minInvestmentAmount = parseInt(minAmount, 10) || 0;
    updated.maxUnitsPerInvestor = parseInt(maxUnits, 10) || 100;
    saveConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Investment Rules
      </h3>
      <div className="space-y-4">
        <Input
          label="Minimum Investment Amount (N)"
          type="number"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          placeholder="0"
        />
        <p className="text-xs text-text-tertiary -mt-2">
          Set to 0 for no minimum. Investor must buy at least 1 unit regardless.
        </p>
        <Input
          label="Max Units per Investor per Property"
          type="number"
          value={maxUnits}
          onChange={(e) => setMaxUnits(e.target.value)}
          placeholder="100"
        />
        <Button onClick={handleSave} size="sm">
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
}
