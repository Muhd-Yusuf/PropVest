'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loadConfig, saveConfig } from '@/lib/platform-config';

export function SupportSettings() {
  const config = loadConfig();
  const [email, setEmail] = useState(config.supportEmail);
  const [phone, setPhone] = useState(config.supportPhone);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const updated = loadConfig();
    updated.supportEmail = email.trim() || 'support@propvest.ng';
    updated.supportPhone = phone.trim() || '+234 800 PROPVEST';
    saveConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary mb-4">
        Support Contact
      </h3>
      <div className="space-y-4">
        <Input
          label="Support Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="support@propvest.ng"
        />
        <Input
          label="Support Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 800 PROPVEST"
        />
        <p className="text-xs text-text-tertiary -mt-2">
          Displayed to investors in the app's Help & Support section.
        </p>
        <Button onClick={handleSave} size="sm">
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
}
