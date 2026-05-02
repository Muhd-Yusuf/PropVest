export interface PlatformConfig {
  // Fees
  platformFeePercent: number;
  platformFeeCap: number;
  investmentFeePercent: number;
  investmentFeeCap: number;
  p2pTradingFeePercent: number;
  p2pTradingFeeCap: number;
  maxManagementFeePercent: number;
  // KYC Limits
  tier1Limit: number;
  tier2Limit: number;
  // Investment Rules
  minInvestmentAmount: number;
  maxUnitsPerInvestor: number;
  // Payouts
  defaultPayoutFrequency: 'monthly' | 'quarterly';
  payoutProcessingDay: number;
  autoApproveThreshold: number;
  retryFailedPayouts: boolean;
  // Referral Program
  referralEnabled: boolean;
  referrerRewardPercent: number;
  referredDiscountPercent: number;
  maxReferralReward: number;
  // Property
  propertyAutoApproval: boolean;
  // Support
  supportEmail: string;
  supportPhone: string;
  // Feature Flags
  p2pTradingEnabled: boolean;
  registrationEnabled: boolean;
  maintenanceMode: boolean;
  kycAutoApprove: boolean;
}

export const DEFAULT_CONFIG: PlatformConfig = {
  platformFeePercent: 3,
  platformFeeCap: 50_000,
  investmentFeePercent: 2,
  investmentFeeCap: 100_000,
  p2pTradingFeePercent: 1,
  p2pTradingFeeCap: 5_000,
  maxManagementFeePercent: 15,
  tier1Limit: 5_000_000,
  tier2Limit: 25_000_000,
  minInvestmentAmount: 0,
  maxUnitsPerInvestor: 100,
  defaultPayoutFrequency: 'quarterly',
  payoutProcessingDay: 1,
  autoApproveThreshold: 1_000_000,
  retryFailedPayouts: true,
  referralEnabled: false,
  referrerRewardPercent: 0.5,
  referredDiscountPercent: 0.5,
  maxReferralReward: 10_000,
  propertyAutoApproval: false,
  supportEmail: 'support@propvest.ng',
  supportPhone: '+234 800 PROPVEST',
  p2pTradingEnabled: true,
  registrationEnabled: true,
  maintenanceMode: false,
  kycAutoApprove: false,
};

const STORAGE_KEY = 'propvest_platform_config';

export function loadConfig(): PlatformConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_CONFIG;
}

export function saveConfig(config: PlatformConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
