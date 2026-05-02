'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loadConfig, saveConfig } from '@/lib/platform-config';

export function FeeSettings() {
  const config = loadConfig();
  const [platformFee, setPlatformFee] = useState(String(config.platformFeePercent));
  const [platformFeeCap, setPlatformFeeCap] = useState(String(config.platformFeeCap));
  const [investmentFee, setInvestmentFee] = useState(String(config.investmentFeePercent));
  const [investmentFeeCap, setInvestmentFeeCap] = useState(String(config.investmentFeeCap));
  const [p2pFee, setP2pFee] = useState(String(config.p2pTradingFeePercent));
  const [p2pCap, setP2pCap] = useState(String(config.p2pTradingFeeCap));
  const [maxMgmtFee, setMaxMgmtFee] = useState(String(config.maxManagementFeePercent));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const updated = loadConfig();
    updated.platformFeePercent = parseFloat(platformFee) || 3;
    updated.platformFeeCap = parseInt(platformFeeCap, 10) || 50_000;
    updated.investmentFeePercent = parseFloat(investmentFee) || 2;
    updated.investmentFeeCap = parseInt(investmentFeeCap, 10) || 100_000;
    updated.p2pTradingFeePercent = parseFloat(p2pFee) || 1;
    updated.p2pTradingFeeCap = parseInt(p2pCap, 10) || 5000;
    updated.maxManagementFeePercent = parseFloat(maxMgmtFee) || 15;
    saveConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Fee Configuration
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Platform Fee % (on payouts)"
            type="number"
            value={platformFee}
            onChange={(e) => setPlatformFee(e.target.value)}
            placeholder="3"
          />
          <Input
            label="Platform Fee Cap (N)"
            type="number"
            value={platformFeeCap}
            onChange={(e) => setPlatformFeeCap(e.target.value)}
            placeholder="50000"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Investment Fee % (on unit purchase)"
            type="number"
            value={investmentFee}
            onChange={(e) => setInvestmentFee(e.target.value)}
            placeholder="2"
          />
          <Input
            label="Investment Fee Cap (N)"
            type="number"
            value={investmentFeeCap}
            onChange={(e) => setInvestmentFeeCap(e.target.value)}
            placeholder="100000"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="P2P Trading Fee %"
            type="number"
            value={p2pFee}
            onChange={(e) => setP2pFee(e.target.value)}
            placeholder="1"
          />
          <Input
            label="P2P Trading Fee Cap (N)"
            type="number"
            value={p2pCap}
            onChange={(e) => setP2pCap(e.target.value)}
            placeholder="5000"
          />
        </div>
        <Input
          label="Max Management Fee % (developer limit)"
          type="number"
          value={maxMgmtFee}
          onChange={(e) => setMaxMgmtFee(e.target.value)}
          placeholder="15"
        />
        <p className="text-xs text-text-tertiary -mt-2">
          Developers set their own management fee per property, up to this maximum. Paystack transaction fees are separate and handled automatically.
        </p>
        <Button onClick={handleSave} size="sm">
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
}
