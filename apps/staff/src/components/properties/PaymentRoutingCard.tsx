'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatNairaFull, formatDate } from '@/lib/format';
import type { Property, PropertyPhase } from '@/lib/types';
import {
  CreditCard,
  ArrowDown,
  Split,
  Building2,
  Landmark,
  Wallet,
  Copy,
  CheckCircle,
  Hammer,
  Home,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  ShoppingBag,
  MapPin,
  Hourglass,
  PackageCheck,
  AlertTriangle,
} from 'lucide-react';

interface PaymentRoutingCardProps {
  property: Property;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-royal hover:text-royal/80 transition-colors cursor-pointer"
    >
      {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const phaseConfig: Record<PropertyPhase, { label: string; description: string; icon: React.ElementType; variant: 'info' | 'warning' | 'success' | 'neutral' | 'error' }> = {
  funding: { label: 'Funding', description: 'Investors are buying units to fund this property.', icon: CreditCard, variant: 'info' },
  construction: { label: 'Construction', description: 'Property is being built by the developer.', icon: Hammer, variant: 'warning' },
  vacant: { label: 'Awaiting Tenant', description: 'Property is built but not yet tenanted. No income yet.', icon: Hourglass, variant: 'warning' },
  renting: { label: 'Renting', description: 'Property is tenanted and generating rental income.', icon: Home, variant: 'success' },
  selling: { label: 'Selling', description: 'Developer is selling finished units to end-buyers.', icon: ShoppingBag, variant: 'info' },
  sold: { label: 'Sold', description: 'Property sold. Profit being distributed to investors.', icon: DollarSign, variant: 'success' },
  holding: { label: 'Holding', description: 'Land is being held for appreciation before resale.', icon: MapPin, variant: 'info' },
  completed: { label: 'Completed', description: 'Investment cycle complete. All investors paid out.', icon: PackageCheck, variant: 'neutral' },
};

// Lifecycle per property type
const phaseLifecycle: Record<string, PropertyPhase[]> = {
  rental: ['funding', 'construction', 'vacant', 'renting', 'completed'],
  build_sell: ['funding', 'construction', 'selling', 'sold', 'completed'],
  land: ['funding', 'holding', 'selling', 'sold', 'completed'],
};

export function PaymentRoutingCard({ property }: PaymentRoutingCardProps) {
  const exampleAmount = property.unitPrice;
  const platformAmount = Math.round(exampleAmount * (property.platformFeePercent / 100));
  const developerAmount = exampleAmount - platformAmount;

  const currentPhase = phaseConfig[property.phase];
  const PhaseIcon = currentPhase.icon;
  const lifecycle = phaseLifecycle[property.type] ?? ['funding', 'completed'];
  const currentPhaseIndex = lifecycle.indexOf(property.phase);

  return (
    <div className="space-y-5">
      {/* ── Property Lifecycle ── */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Property Lifecycle</h3>

        {/* Step indicators */}
        <div className="flex items-center gap-1 mb-4">
          {lifecycle.map((phase, i) => {
            const config = phaseConfig[phase];
            const Icon = config.icon;
            const isActive = i === currentPhaseIndex;
            const isDone = i < currentPhaseIndex;
            return (
              <div key={phase} className="flex items-center gap-1 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isDone ? 'bg-emerald text-white'
                    : isActive ? 'bg-emerald/15 text-emerald border-2 border-emerald'
                    : 'bg-bg-tertiary text-text-tertiary'
                }`}>
                  {isDone ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs whitespace-nowrap ${
                  isActive ? 'text-text-primary font-semibold' : isDone ? 'text-emerald font-medium' : 'text-text-tertiary'
                }`}>
                  {config.label}
                </span>
                {i < lifecycle.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${isDone ? 'bg-emerald' : 'bg-border-default'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Current phase info */}
        <div className="bg-bg-secondary rounded-lg p-3 flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            currentPhase.variant === 'success' ? 'bg-emerald/10' :
            currentPhase.variant === 'warning' ? 'bg-amber-100' :
            currentPhase.variant === 'neutral' ? 'bg-bg-tertiary' :
            'bg-royal/10'
          }`}>
            <PhaseIcon className={`w-4 h-4 ${
              currentPhase.variant === 'success' ? 'text-emerald' :
              currentPhase.variant === 'warning' ? 'text-amber-700' :
              currentPhase.variant === 'neutral' ? 'text-text-tertiary' :
              'text-royal'
            }`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-primary">{currentPhase.label}</span>
              <Badge label="Current" variant={currentPhase.variant === 'error' ? 'error' : currentPhase.variant} />
            </div>
            <p className="text-xs text-text-secondary mt-0.5">{currentPhase.description}</p>
          </div>
        </div>

        {/* Construction progress */}
        {property.phase === 'construction' && property.constructionProgress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-text-secondary">Construction Progress</span>
              <span className="text-xs font-mono font-medium">{property.constructionProgress}%</span>
            </div>
            <ProgressBar progress={property.constructionProgress / 100} />
            {property.expectedCompletionDate && (
              <p className="text-xs text-text-tertiary mt-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Expected completion: {formatDate(property.expectedCompletionDate)}
              </p>
            )}
          </div>
        )}

        {/* Vacant notice */}
        {property.phase === 'vacant' && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800">
              <p className="font-semibold">No rental income yet</p>
              <p>Property is ready but waiting for tenants. Once a tenant signs, phase transitions to Renting and payouts can begin.</p>
            </div>
          </div>
        )}

        {/* Renting since */}
        {property.phase === 'renting' && property.firstRentDate && (
          <p className="text-xs text-text-tertiary mt-3 flex items-center gap-1">
            <Home className="w-3 h-3" />
            Generating rental income since {formatDate(property.firstRentDate)}
          </p>
        )}
      </Card>

      {/* ── Money IN: Investment Flow ── */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-1">Money IN — Investment Flow</h3>
        <p className="text-xs text-text-secondary mb-4">
          {property.type === 'rental' ? 'Investors buy units to fund the property. Developer builds/manages it.'
            : property.type === 'build_sell' ? 'Investors fund construction. Developer builds and sells to end-buyers.'
            : 'Investors fund land purchase. Land is held for appreciation then resold.'}
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-bg-secondary rounded-lg p-3">
            <div className="w-9 h-9 rounded-full bg-royal/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 text-royal" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">Investor Pays</p>
              <p className="text-xs text-text-secondary">Buys units at {formatNairaFull(property.unitPrice)}/unit via Paystack</p>
            </div>
            <span className="font-mono text-sm font-bold text-text-primary shrink-0">{formatNairaFull(exampleAmount)}</span>
          </div>

          <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>

          {property.dvaAccountNumber ? (
            <div className="flex items-center gap-3 bg-emerald/5 border border-emerald/20 rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4 text-emerald" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">Paystack DVA</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xs text-text-secondary">{property.dvaAccountNumber} ({property.dvaBank})</span>
                  <CopyButton text={property.dvaAccountNumber} />
                </div>
              </div>
              <Badge label="Auto-split" variant="success" />
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">DVA Not Configured</p>
                <p className="text-xs text-amber-700">Payment account will be set up after property approval</p>
              </div>
              <Badge label="Pending" variant="warning" />
            </div>
          )}

          <div className="flex justify-center"><Split className="w-4 h-4 text-text-tertiary" /></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border-default p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5 text-blue-700" />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-primary">Developer</p>
                  <p className="text-xs text-text-tertiary">{property.developerName}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge label={`${100 - property.platformFeePercent}%`} variant="info" />
                <span className="font-mono text-sm font-bold text-text-primary">{formatNairaFull(developerAmount)}</span>
              </div>
              {property.paystackSubaccountCode && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-xs text-text-tertiary">Subaccount:</span>
                  <span className="font-mono text-xs text-text-secondary">{property.paystackSubaccountCode}</span>
                  <CopyButton text={property.paystackSubaccountCode} />
                </div>
              )}
            </div>
            <div className="rounded-lg border border-emerald/30 bg-emerald/5 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-emerald/10 flex items-center justify-center">
                  <Wallet className="w-3.5 h-3.5 text-emerald" />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-primary">PropVest Platform</p>
                  <p className="text-xs text-text-tertiary">Platform revenue</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge label={`${property.platformFeePercent}%`} variant="success" />
                <span className="font-mono text-sm font-bold text-emerald">{formatNairaFull(platformAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Money OUT — depends on property type ── */}

      {/* RENTAL: Rent distribution */}
      {property.type === 'rental' && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-1">Money OUT — Rental Income Distribution</h3>
          <p className="text-xs text-text-secondary mb-4">
            {property.phase === 'renting'
              ? 'Each quarter, rent is collected and distributed to investors after fees.'
              : property.phase === 'vacant'
                ? 'Once tenants are secured, quarterly rent will be distributed to investors.'
                : property.phase === 'construction' || property.phase === 'funding'
                  ? 'After construction and tenant onboarding, rental income will flow to investors.'
                  : 'Rental income was distributed during the active rental period.'}
          </p>

          <div className="space-y-3">
            <div className={`flex items-center gap-3 rounded-lg p-3 ${property.phase === 'renting' ? 'bg-emerald/5 border border-emerald/20' : 'bg-bg-secondary opacity-60'}`}>
              <div className="w-9 h-9 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                <Home className="w-4 h-4 text-emerald" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Tenant Pays Rent (Quarterly)</p>
                <p className="text-xs text-text-secondary">Rent collected from tenants into property account</p>
              </div>
              {property.phase !== 'renting' && <Badge label={property.phase === 'vacant' ? 'No tenant yet' : 'Not yet'} variant="warning" />}
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="bg-bg-secondary rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-text-primary">Deductions</p>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Management Fee ({property.managementFeePercent}%)</span>
                <span className="text-error font-mono">→ Developer</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Platform Share ({property.platformFeePercent}%)</span>
                <span className="text-error font-mono">→ PropVest</span>
              </div>
              <div className="border-t border-border-default pt-2 flex justify-between text-xs">
                <span className="font-semibold text-text-primary">Distributable to Investors</span>
                <span className="font-semibold text-emerald font-mono">Remaining amount</span>
              </div>
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Staff Triggers Payout</p>
                <p className="text-xs text-text-secondary">Finance enters rent amount → system calculates per-investor split → CEO approves</p>
              </div>
              <Badge label="Manual" variant="warning" />
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="flex items-center gap-3 bg-emerald/5 border border-emerald/20 rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4 text-emerald" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Paystack Bulk Transfer</p>
                <p className="text-xs text-text-secondary">Each investor receives their share directly to their bank</p>
              </div>
              <Badge label="Auto" variant="success" />
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="flex items-center gap-3 bg-bg-secondary rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-royal/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-royal" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{property.investorCount} Investors Get Paid</p>
                <p className="text-xs text-text-secondary">Amount proportional to units owned out of {property.unitsSold} sold units</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* BUILD & SELL: Sale profit distribution */}
      {property.type === 'build_sell' && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-1">Money OUT — Sale Profit Distribution</h3>
          <p className="text-xs text-text-secondary mb-4">
            {property.phase === 'selling' || property.phase === 'sold'
              ? 'Developer sells completed property to end-buyers. Profit is distributed to investors.'
              : 'Once the property is built and sold, profit from the sale will be distributed.'}
          </p>

          <div className="space-y-3">
            <div className={`flex items-center gap-3 rounded-lg p-3 ${property.phase === 'selling' || property.phase === 'sold' ? 'bg-emerald/5 border border-emerald/20' : 'bg-bg-secondary opacity-60'}`}>
              <div className="w-9 h-9 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4 text-emerald" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">End-Buyer Purchases Property</p>
                <p className="text-xs text-text-secondary">Developer sells finished units at market price</p>
              </div>
              {property.phase !== 'selling' && property.phase !== 'sold' && <Badge label="Not yet" variant="warning" />}
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="bg-bg-secondary rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-text-primary">Profit Calculation</p>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Sale Price (to end-buyer)</span>
                <span className="font-mono">Market value</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Less: Total Investment Cost</span>
                <span className="text-error font-mono">−{formatNairaFull(property.totalValue)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Less: Developer Fee ({property.managementFeePercent}%)</span>
                <span className="text-error font-mono">→ Developer</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Less: Platform Fee ({property.platformFeePercent}%)</span>
                <span className="text-error font-mono">→ PropVest</span>
              </div>
              <div className="border-t border-border-default pt-2 flex justify-between text-xs">
                <span className="font-semibold text-text-primary">Net Profit to Investors</span>
                <span className="font-semibold text-emerald font-mono">Distributed proportionally</span>
              </div>
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Staff Triggers Sale Payout</p>
                <p className="text-xs text-text-secondary">Finance enters sale price → system calculates profit → CEO approves disbursement</p>
              </div>
              <Badge label="Manual" variant="warning" />
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="flex items-center gap-3 bg-emerald/5 border border-emerald/20 rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4 text-emerald" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Paystack Bulk Transfer</p>
                <p className="text-xs text-text-secondary">Original investment + profit share sent to each investor&apos;s bank</p>
              </div>
              <Badge label="Auto" variant="success" />
            </div>
          </div>
        </Card>
      )}

      {/* LAND: Resale profit distribution */}
      {property.type === 'land' && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-1">Money OUT — Land Resale Profit</h3>
          <p className="text-xs text-text-secondary mb-4">
            {property.phase === 'selling' || property.phase === 'sold'
              ? 'Land is being sold / has been sold. Profit distributed to investors.'
              : 'Land is being held for appreciation. Once sold, profit will be distributed.'}
          </p>

          <div className="space-y-3">
            <div className={`flex items-center gap-3 rounded-lg p-3 ${property.phase === 'selling' || property.phase === 'sold' ? 'bg-emerald/5 border border-emerald/20' : 'bg-bg-secondary'}`}>
              <div className="w-9 h-9 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-emerald" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Land Appreciates & Is Sold</p>
                <p className="text-xs text-text-secondary">
                  Bought at {formatNairaFull(property.totalValue)} total — sold at market value when appreciation target is hit
                </p>
              </div>
              {property.phase === 'holding' && <Badge label="Holding" variant="info" />}
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="bg-bg-secondary rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-text-primary">Profit Calculation</p>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Sale Price</span>
                <span className="font-mono">Market value at sale</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Less: Original Purchase Price</span>
                <span className="text-error font-mono">−{formatNairaFull(property.totalValue)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Less: Platform Fee ({property.platformFeePercent}%)</span>
                <span className="text-error font-mono">→ PropVest</span>
              </div>
              <div className="border-t border-border-default pt-2 flex justify-between text-xs">
                <span className="font-semibold text-text-primary">Net Profit to Investors</span>
                <span className="font-semibold text-emerald font-mono">Investment + appreciation profit</span>
              </div>
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Staff Triggers Sale Payout</p>
                <p className="text-xs text-text-secondary">Finance enters sale price → calculates profit per unit → CEO approves</p>
              </div>
            </div>
            <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-text-tertiary" /></div>
            <div className="flex items-center gap-3 bg-emerald/5 border border-emerald/20 rounded-lg p-3">
              <div className="w-9 h-9 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4 text-emerald" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">Paystack Bulk Transfer</p>
                <p className="text-xs text-text-secondary">Original investment + profit sent to each investor&apos;s bank</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ── Fee Structure ── */}
      <Card>
        <p className="text-xs font-semibold text-text-primary mb-2">Fee Structure</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-secondary rounded-lg p-2.5 text-center">
            <p className="text-xs text-text-tertiary">Platform Fee</p>
            <p className="text-sm font-bold text-text-primary">{property.platformFeePercent}%</p>
          </div>
          <div className="bg-bg-secondary rounded-lg p-2.5 text-center">
            <p className="text-xs text-text-tertiary">
              {property.type === 'rental' ? 'Management Fee' : property.type === 'land' ? 'No Mgmt Fee' : 'Developer Fee'}
            </p>
            <p className="text-sm font-bold text-text-primary">{property.managementFeePercent}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
