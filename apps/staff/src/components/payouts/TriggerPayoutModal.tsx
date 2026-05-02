'use client';

import { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockProperties, mockInvestors } from '@/lib/mock-data';
import { formatNairaFull } from '@/lib/format';
import { Calculator, Users, ArrowRight } from 'lucide-react';

interface TriggerPayoutModalProps {
  open: boolean;
  onClose: () => void;
  preselectedPropertyId?: string;
}

const currentYear = new Date().getFullYear();
const quarterOptions = [
  { value: '', label: 'Select quarter' },
  { value: `${currentYear}-Q1`, label: `${currentYear} — Q1 (Jan-Mar)` },
  { value: `${currentYear}-Q2`, label: `${currentYear} — Q2 (Apr-Jun)` },
  { value: `${currentYear}-Q3`, label: `${currentYear} — Q3 (Jul-Sep)` },
  { value: `${currentYear}-Q4`, label: `${currentYear} — Q4 (Oct-Dec)` },
];

// Eligible properties:
// - Rental in 'renting' phase → quarterly rent payout
// - Build & Sell in 'selling' or 'sold' phase → sale profit payout
// - Land in 'selling' or 'sold' phase → resale profit payout
const eligibleProperties = mockProperties.filter((p) => {
  if (p.type === 'rental' && p.phase === 'renting') return true;
  if (p.type === 'build_sell' && (p.phase === 'selling' || p.phase === 'sold')) return true;
  if (p.type === 'land' && (p.phase === 'selling' || p.phase === 'sold')) return true;
  return false;
});

const propertyOptions = [
  { value: '', label: 'Select property' },
  ...eligibleProperties.map((p) => ({
    value: p.id,
    label: `${p.name} (${p.type === 'rental' ? 'Rental' : p.type === 'build_sell' ? 'Build & Sell' : 'Land'})`,
  })),
];

const payoutTypeOptions = [
  { value: '', label: 'Select payout type' },
  { value: 'rental', label: 'Quarterly Rent Distribution' },
  { value: 'sale', label: 'Sale Profit Distribution' },
];

function getInvestorBreakdown(propertyId: string, distributableAmount: number) {
  const property = mockProperties.find((p) => p.id === propertyId);
  if (!property || property.unitsSold === 0) return [];

  const count = Math.min(property.investorCount, mockInvestors.length);
  const investors = mockInvestors.slice(0, count);

  let remainingUnits = property.unitsSold;
  return investors.map((inv, i) => {
    const isLast = i === investors.length - 1;
    const units = isLast
      ? remainingUnits
      : Math.max(1, Math.floor(remainingUnits / (investors.length - i) + (Math.random() - 0.5) * 5));
    remainingUnits -= units;

    const share = (units / property.unitsSold) * 100;
    const amount = Math.round(distributableAmount * (units / property.unitsSold));
    const primary = inv.bankAccounts.find((b) => b.isPrimary) ?? inv.bankAccounts[0];

    return {
      investorId: inv.id,
      investorName: inv.fullName,
      units,
      share: Math.round(share * 100) / 100,
      amount,
      bankName: primary?.bankName ?? '—',
      accountNumber: primary?.accountNumber ?? '—',
    };
  });
}

export function TriggerPayoutModal({ open, onClose, preselectedPropertyId }: TriggerPayoutModalProps) {
  const [propertyId, setPropertyId] = useState(preselectedPropertyId ?? '');
  const [quarter, setQuarter] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [salePriceInput, setSalePriceInput] = useState('');
  const [step, setStep] = useState<'input' | 'preview'>('input');

  const property = mockProperties.find((p) => p.id === propertyId);
  const isRental = property?.type === 'rental';
  const isSale = property?.type === 'build_sell' || property?.type === 'land';

  const rentAmount = Number(amountInput) || 0;
  const salePrice = Number(salePriceInput) || 0;

  const breakdown = useMemo(() => {
    if (!property) return null;

    if (isRental && rentAmount > 0) {
      const managementFee = Math.round(rentAmount * (property.managementFeePercent / 100));
      const afterManagement = rentAmount - managementFee;
      const platformShare = Math.round(afterManagement * (property.platformFeePercent / 100));
      const distributableAmount = afterManagement - platformShare;

      return {
        type: 'rental' as const,
        totalReceived: rentAmount,
        managementFee,
        platformShare,
        distributableAmount,
        investors: getInvestorBreakdown(propertyId, distributableAmount),
      };
    }

    if (isSale && salePrice > 0) {
      const profit = salePrice - property.totalValue;
      const developerFee = Math.round(Math.max(0, profit) * (property.managementFeePercent / 100));
      const platformFee = Math.round(Math.max(0, profit) * (property.platformFeePercent / 100));
      const netProfit = Math.max(0, profit - developerFee - platformFee);
      // Investors get back their original investment + net profit
      const distributableAmount = property.totalValue + netProfit;

      return {
        type: 'sale' as const,
        salePrice,
        originalCost: property.totalValue,
        grossProfit: profit,
        developerFee,
        platformFee,
        netProfit,
        distributableAmount,
        investors: getInvestorBreakdown(propertyId, distributableAmount),
      };
    }

    return null;
  }, [property, propertyId, isRental, isSale, rentAmount, salePrice]);

  function handleClose() {
    setPropertyId(preselectedPropertyId ?? '');
    setQuarter('');
    setAmountInput('');
    setSalePriceInput('');
    setStep('input');
    onClose();
  }

  function handleCalculate() {
    if (propertyId && (isRental ? quarter && rentAmount > 0 : salePrice > 0)) {
      setStep('preview');
    }
  }

  function handleTrigger() {
    console.log('Trigger payout:', { propertyId, quarter, breakdown });
    handleClose();
  }

  const canCalculate = propertyId && (isRental ? quarter && rentAmount > 0 : salePrice > 0);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={step === 'input' ? 'Trigger Payout' : 'Payout Preview'}
      size="lg"
      footer={
        step === 'input' ? (
          <>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCalculate} disabled={!canCalculate}>
              <Calculator className="w-4 h-4" />
              Calculate Breakdown
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setStep('input')}>Back</Button>
            <Button onClick={handleTrigger}>
              Trigger Payout
              <ArrowRight className="w-4 h-4" />
            </Button>
          </>
        )
      }
    >
      {step === 'input' ? (
        <div className="space-y-4">
          <Select
            label="Property"
            options={propertyOptions}
            value={propertyId}
            onChange={(e) => {
              setPropertyId(e.target.value);
              setAmountInput('');
              setSalePriceInput('');
            }}
          />

          {property && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
              <Badge
                label={property.type === 'rental' ? 'Rental' : property.type === 'build_sell' ? 'Build & Sell' : 'Land'}
                variant={property.type === 'rental' ? 'success' : 'info'}
              />
              <Badge label={property.phase} variant="neutral" />
              <span>{property.unitsSold} / {property.totalUnits} units sold</span>
              <span>·</span>
              <span>{property.investorCount} investors</span>
            </div>
          )}

          {/* Rental-specific fields */}
          {isRental && (
            <>
              <Select
                label="Quarter"
                options={quarterOptions}
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
              />
              <Input
                label="Total Rent Received (₦)"
                type="number"
                placeholder="e.g. 5000000"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
              />
              <p className="text-xs text-text-tertiary">
                Enter the total rent collected from tenants for this quarter. Management fee ({property?.managementFeePercent}%) and platform fee ({property?.platformFeePercent}%) will be deducted.
              </p>
            </>
          )}

          {/* Sale-specific fields */}
          {isSale && (
            <>
              <Input
                label="Total Sale Price (₦)"
                type="number"
                placeholder="e.g. 180000000"
                value={salePriceInput}
                onChange={(e) => setSalePriceInput(e.target.value)}
              />
              {property && (
                <div className="bg-bg-secondary rounded-lg p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Original investment cost</span>
                    <span className="font-mono">{formatNairaFull(property.totalValue)}</span>
                  </div>
                  {salePrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Gross profit</span>
                      <span className={`font-mono font-medium ${salePrice > property.totalValue ? 'text-emerald' : 'text-error'}`}>
                        {salePrice > property.totalValue ? '+' : ''}{formatNairaFull(salePrice - property.totalValue)}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <p className="text-xs text-text-tertiary">
                Enter the total amount the property/land was sold for. Profit = Sale Price − Original Cost. Developer fee and platform fee are deducted from the profit. Investors get their original investment back + net profit share.
              </p>
            </>
          )}

          {!eligibleProperties.length && (
            <p className="text-sm text-warning">No eligible properties. Properties must be in renting (rental) or selling/sold (build & sell / land) phase.</p>
          )}
        </div>
      ) : breakdown ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-text-primary">{property?.name}</span>
            {isRental && <Badge label={quarter} variant="info" />}
            <Badge label={breakdown.type === 'rental' ? 'Rent Payout' : 'Sale Payout'} variant={breakdown.type === 'rental' ? 'success' : 'info'} />
          </div>

          {/* Financial breakdown */}
          <Card className="!p-4 space-y-2">
            {breakdown.type === 'rental' ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total Rent Received</span>
                  <span className="font-mono font-semibold">{formatNairaFull(breakdown.totalReceived)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Management Fee ({property?.managementFeePercent}%)</span>
                  <span className="font-mono text-error">−{formatNairaFull(breakdown.managementFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Platform Fee ({property?.platformFeePercent}%)</span>
                  <span className="font-mono text-error">−{formatNairaFull(breakdown.platformShare)}</span>
                </div>
                <div className="border-t border-border-default pt-2 flex justify-between text-sm">
                  <span className="font-semibold text-text-primary">Distributable to Investors</span>
                  <span className="font-mono font-bold text-emerald">{formatNairaFull(breakdown.distributableAmount)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Sale Price</span>
                  <span className="font-mono font-semibold">{formatNairaFull(breakdown.salePrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Original Investment Cost</span>
                  <span className="font-mono text-error">−{formatNairaFull(breakdown.originalCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Gross Profit</span>
                  <span className={`font-mono font-medium ${breakdown.grossProfit >= 0 ? 'text-emerald' : 'text-error'}`}>
                    {breakdown.grossProfit >= 0 ? '+' : ''}{formatNairaFull(breakdown.grossProfit)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Developer Fee ({property?.managementFeePercent}% of profit)</span>
                  <span className="font-mono text-error">−{formatNairaFull(breakdown.developerFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Platform Fee ({property?.platformFeePercent}% of profit)</span>
                  <span className="font-mono text-error">−{formatNairaFull(breakdown.platformFee)}</span>
                </div>
                <div className="border-t border-border-default pt-2 flex justify-between text-sm">
                  <span className="font-semibold text-text-primary">Total to Investors (Investment + Profit)</span>
                  <span className="font-mono font-bold text-emerald">{formatNairaFull(breakdown.distributableAmount)}</span>
                </div>
              </>
            )}
          </Card>

          {/* Investor breakdown */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-text-tertiary" />
              <span className="text-sm font-medium text-text-primary">
                Investor Breakdown ({breakdown.investors.length} investors)
              </span>
            </div>
            <div className="max-h-48 overflow-y-auto rounded-lg border border-border-default">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary sticky top-0">
                  <tr className="border-b border-border-default">
                    <th className="text-left py-2 px-3 text-xs text-text-tertiary font-medium">Investor</th>
                    <th className="text-right py-2 px-3 text-xs text-text-tertiary font-medium">Units</th>
                    <th className="text-right py-2 px-3 text-xs text-text-tertiary font-medium">Share</th>
                    <th className="text-right py-2 px-3 text-xs text-text-tertiary font-medium">Amount</th>
                    <th className="text-left py-2 px-3 text-xs text-text-tertiary font-medium">Bank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {breakdown.investors.map((inv) => (
                    <tr key={inv.investorId}>
                      <td className="py-1.5 px-3 font-medium">{inv.investorName}</td>
                      <td className="py-1.5 px-3 text-right font-mono">{inv.units}</td>
                      <td className="py-1.5 px-3 text-right font-mono">{inv.share}%</td>
                      <td className="py-1.5 px-3 text-right font-mono text-emerald">{formatNairaFull(inv.amount)}</td>
                      <td className="py-1.5 px-3 text-text-secondary">{inv.bankName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-text-tertiary">
            This payout will be created with <strong>Pending Approval</strong> status. A Finance Manager or CEO must approve before funds are disbursed via Paystack.
          </p>
        </div>
      ) : null}
    </Modal>
  );
}
