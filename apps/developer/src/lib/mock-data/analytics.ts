import type { AnalyticsSummary } from '../types';

export const analyticsSummary: AnalyticsSummary = {
  totalInvestors: 1252,
  totalRaised: 420_000_000,
  totalPayoutsDistributed: 7_128_000,
  propertiesListed: 4,
  averageOccupancy: 96,
  investorGrowth: [
    { month: 'Nov 2025', count: 180 },
    { month: 'Dec 2025', count: 245 },
    { month: 'Jan 2026', count: 380 },
    { month: 'Feb 2026', count: 520 },
    { month: 'Mar 2026', count: 780 },
    { month: 'Apr 2026', count: 1252 },
  ],
  investmentTrend: [
    { month: 'Nov 2025', amount: 45_000_000 },
    { month: 'Dec 2025', amount: 62_000_000 },
    { month: 'Jan 2026', amount: 78_000_000 },
    { month: 'Feb 2026', amount: 95_000_000 },
    { month: 'Mar 2026', amount: 112_000_000 },
    { month: 'Apr 2026', amount: 420_000_000 },
  ],
};
