'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loadConfig, saveConfig } from '@/lib/platform-config';

export function KYCSettings() {
  const config = loadConfig();
  const [tier1Limit, setTier1Limit] = useState(String(config.tier1Limit));
  const [tier2Limit, setTier2Limit] = useState(String(config.tier2Limit));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const updated = loadConfig();
    updated.tier1Limit = parseInt(tier1Limit, 10) || 5_000_000;
    updated.tier2Limit = parseInt(tier2Limit, 10) || 25_000_000;
    saveConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        KYC Tier Limits
      </h3>
      <div className="space-y-4">
        <Input
          label="Tier 1 Investment Limit (N)"
          type="number"
          value={tier1Limit}
          onChange={(e) => setTier1Limit(e.target.value)}
          placeholder="5000000"
        />
        <Input
          label="Tier 2 Investment Limit (N)"
          type="number"
          value={tier2Limit}
          onChange={(e) => setTier2Limit(e.target.value)}
          placeholder="25000000"
        />
        <div>
          <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium mb-1">
            Tier 3 Investment Limit
          </p>
          <p className="text-sm text-text-secondary">Unlimited</p>
        </div>
        <Button onClick={handleSave} size="sm">
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
}
