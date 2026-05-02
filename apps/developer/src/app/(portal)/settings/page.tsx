'use client';

import { useState } from 'react';
import { Save, Camera } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { developer, updateProfile } = useAuth();
  const [companyName, setCompanyName] = useState(developer?.companyName || '');
  const [contactName, setContactName] = useState(developer?.contactName || '');
  const [phone, setPhone] = useState(developer?.phone || '');
  const [bio, setBio] = useState(developer?.bio || '');
  const [bankName, setBankName] = useState(developer?.bankName || '');
  const [bankAccount, setBankAccount] = useState(developer?.bankAccountNumber || '');
  const [accountName, setAccountName] = useState(developer?.bankAccountName || '');

  const handleSave = () => {
    updateProfile({ companyName, contactName, phone, bio, bankName, bankAccountNumber: bankAccount, bankAccountName: accountName });
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ profilePicture: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePicture = () => {
    updateProfile({ profilePicture: undefined });
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your company profile and bank details."
        actions={
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1.5" />
            Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Company Profile</h3>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-default">
            <div className="relative group">
              <Avatar name={developer?.companyName || ''} src={developer?.profilePicture} size="lg" />
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 rounded-full bg-midnight/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
              >
                <Camera className="w-5 h-5 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePictureUpload}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Company Logo</p>
              <p className="text-xs text-text-tertiary mt-0.5">JPG or PNG. Max 2MB.</p>
              {developer?.profilePicture && (
                <button
                  type="button"
                  onClick={handleRemovePicture}
                  className="text-xs text-error mt-1 cursor-pointer hover:underline"
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <Input label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <Input label="Contact Person" value={contactName} onChange={(e) => setContactName(e.target.value)} />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Bank Details</h3>
            <div className="space-y-4">
              <Input label="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
              <Input label="Account Number" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
              <Input label="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Change Password</h3>
            <div className="space-y-4">
              <Input label="Current Password" type="password" placeholder="Enter current password" />
              <Input label="New Password" type="password" placeholder="Enter new password" />
              <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
              <Button variant="secondary" size="sm">Update Password</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
