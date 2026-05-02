'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { loadConfig, saveConfig } from '@/lib/platform-config';

export function ReferralSettings() {
  const config = loadConfig();
  const [enabled, setEnabled] = useState(config.referralEnabled);
  const [referrerReward, setReferrerReward] = useState(String(config.referrerRewardPercent));
  const [referredDiscount, setReferredDiscount] = useState(String(config.referredDiscountPercent));
  const [maxReward, setMaxReward] = useState(String(config.maxReferralReward));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const updated = loadConfig();
    updated.referralEnabled = enabled;
    updated.referrerRewardPercent = parseFloat(referrerReward) || 0.5;
    updated.referredDiscountPercent = parseFloat(referredDiscount) || 0.5;
    updated.maxReferralReward = parseInt(maxReward, 10) || 10000;
    saveConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Referral Program
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">Enable Referrals</p>
            <p className="text-xs text-text-tertiary mt-0.5">
              Reward investors for referring new users
            </p>
          </div>
          <Toggle checked={enabled} onChange={setEnabled} />
        </div>
        {enabled && (
          <>
            <Input
              label="Referrer Reward (% of platform fee)"
              type="number"
              value={referrerReward}
              onChange={(e) => setReferrerReward(e.target.value)}
              placeholder="0.5"
            />
            <p className="text-xs text-text-tertiary -mt-2">
              Referrer gets this % from the referred investor's first investment platform fee. Paid from PropVest's share.
            </p>
            <Input
              label="Referred Investor Discount (% off platform fee)"
              type="number"
              value={referredDiscount}
              onChange={(e) => setReferredDiscount(e.target.value)}
              placeholder="0.5"
            />
            <Input
              label="Max Referral Reward per Referral (N)"
              type="number"
              value={maxReward}
              onChange={(e) => setMaxReward(e.target.value)}
              placeholder="10000"
            />
          </>
        )}
        <Button onClick={handleSave} size="sm">
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
}
