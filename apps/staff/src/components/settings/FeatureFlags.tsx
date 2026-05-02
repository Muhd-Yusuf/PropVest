'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { loadConfig, saveConfig } from '@/lib/platform-config';

export function FeatureFlags() {
  const config = loadConfig();
  const [p2pEnabled, setP2pEnabled] = useState(config.p2pTradingEnabled);
  const [registrationEnabled, setRegistrationEnabled] = useState(config.registrationEnabled);
  const [maintenanceMode, setMaintenanceMode] = useState(config.maintenanceMode);
  const [kycAutoApprove, setKycAutoApprove] = useState(config.kycAutoApprove);
  const [propertyAutoApproval, setPropertyAutoApproval] = useState(config.propertyAutoApproval);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const updated = loadConfig();
    updated.p2pTradingEnabled = p2pEnabled;
    updated.registrationEnabled = registrationEnabled;
    updated.maintenanceMode = maintenanceMode;
    updated.kycAutoApprove = kycAutoApprove;
    updated.propertyAutoApproval = propertyAutoApproval;
    saveConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Feature Flags
      </h3>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">P2P Trading</p>
            <p className="text-xs text-text-tertiary mt-0.5">
              Enable peer-to-peer unit trading on the secondary market
            </p>
          </div>
          <Toggle checked={p2pEnabled} onChange={setP2pEnabled} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">
              New User Registration
            </p>
            <p className="text-xs text-text-tertiary mt-0.5">
              Allow new investors to register on the platform
            </p>
          </div>
          <Toggle checked={registrationEnabled} onChange={setRegistrationEnabled} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">Maintenance Mode</p>
            <p className="text-xs text-text-tertiary mt-0.5">
              Put the platform in maintenance mode and block all transactions
            </p>
          </div>
          <Toggle checked={maintenanceMode} onChange={setMaintenanceMode} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">
              KYC Auto-approve (Tier 1)
            </p>
            <p className="text-xs text-text-tertiary mt-0.5">
              Automatically approve Tier 1 bank account verifications with exact matches
            </p>
          </div>
          <Toggle checked={kycAutoApprove} onChange={setKycAutoApprove} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">
              Property Auto-approval
            </p>
            <p className="text-xs text-text-tertiary mt-0.5">
              Automatically approve new property listings from verified developers
            </p>
          </div>
          <Toggle checked={propertyAutoApproval} onChange={setPropertyAutoApproval} />
        </div>
      </div>
      <div className="mt-5">
        <Button onClick={handleSave} size="sm">
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
}
