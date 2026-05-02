// Platform configuration — mirrors staff portal settings.
// In production, these values will be fetched from the API.
// For now, defaults match the staff portal's platform-config.ts.

export const platformConfig = {
  // Fees
  platformFeePercent: 3,
  platformFeeCap: 50_000,
  investmentFeePercent: 2,
  investmentFeeCap: 100_000,
  p2pTradingFeePercent: 1,
  p2pTradingFeeCap: 5_000,
  // KYC Limits
  tier1Limit: 5_000_000,
  tier2Limit: 25_000_000,
} as const;

export function calcTradingFee(amount: number): number {
  return Math.min(
    Math.round(amount * (platformConfig.p2pTradingFeePercent / 100)),
    platformConfig.p2pTradingFeeCap,
  );
}

export function calcInvestmentFee(amount: number): number {
  return Math.min(
    Math.round(amount * (platformConfig.investmentFeePercent / 100)),
    platformConfig.investmentFeeCap,
  );
}

export function tradingFeeLabel(): string {
  return `Trading fee (${platformConfig.p2pTradingFeePercent}%, max ₦${platformConfig.p2pTradingFeeCap.toLocaleString()})`;
}

export function investmentFeeLabel(): string {
  return `Platform fee (${platformConfig.investmentFeePercent}%, max ₦${platformConfig.investmentFeeCap.toLocaleString()})`;
}
