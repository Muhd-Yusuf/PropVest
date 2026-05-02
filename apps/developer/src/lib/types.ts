// ---- Developer User ----
export interface DeveloperUser {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  bio: string;
  initials: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  createdAt: string;
}

// ---- Properties ----
export type PropertyType = 'rental' | 'build_sell' | 'land' | 'other';
export type PropertyStatus = 'draft' | 'under_review' | 'active' | 'paused' | 'fully_funded' | 'completed';
export type PropertyPhase =
  | 'funding'
  | 'construction'
  | 'vacant'
  | 'renting'
  | 'selling'
  | 'sold'
  | 'holding'
  | 'completed';

export type PayoutFrequency = 'monthly' | 'quarterly' | 'biannually' | 'annually' | 'custom';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  phase: PropertyPhase;
  location: { state: string; city: string; area: string };
  developerId: string;
  totalValue: number;
  unitPrice: number;
  totalUnits: number;
  unitsSold: number;
  investorCount: number;
  description: string;
  platformFeePercent: number;
  managementFeePercent: number;
  documents: { name: string; url: string; type: string }[];
  images: string[];
  createdAt: string;
  approvedAt?: string;
  // Rental fields
  annualRent?: number;
  rentYield?: number;
  payoutFrequency?: PayoutFrequency;
  // Build & Sell fields
  buildCost?: number;
  estimatedSalePrice?: number;
  timelineMonths?: number;
  constructionProgress?: number;
  expectedCompletionDate?: string;
  // Land fields
  totalAreaSqm?: number;
  pricePerSqm?: number;
  estimatedAppreciationRate?: number;
  holdPeriodMonths?: number;
  // Other type fields
  returnModelDescription?: string;
  estimatedReturnPercent?: number;
}

// ---- Investor (as seen by developer) ----
export interface PropertyInvestor {
  id: string;
  fullName: string;
  email: string;
  propertyId: string;
  propertyName: string;
  units: number;
  investedAmount: number;
  investedAt: string;
}

// ---- Payouts ----
export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface PayoutInvestor {
  investorId: string;
  investorName: string;
  units: number;
  amount: number;
  status: 'pending' | 'sent' | 'failed';
}

export interface Payout {
  id: string;
  propertyId: string;
  propertyName: string;
  period: string;
  totalRentReceived: number;
  managementFee: number;
  platformFee: number;
  distributableAmount: number;
  investorPayouts: PayoutInvestor[];
  status: PayoutStatus;
  createdAt: string;
  completedAt?: string;
}

// ---- Analytics ----
export interface AnalyticsSummary {
  totalInvestors: number;
  totalRaised: number;
  totalPayoutsDistributed: number;
  propertiesListed: number;
  averageOccupancy: number;
  investorGrowth: { month: string; count: number }[];
  investmentTrend: { month: string; amount: number }[];
}

// ---- Notifications ----
export type NotificationType = 'property_approved' | 'property_rejected' | 'new_investor' | 'payout_completed' | 'property_funded' | 'kyc_update' | 'system';

export interface DeveloperNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  route?: string;
}

// ---- DataTable ----
export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}
