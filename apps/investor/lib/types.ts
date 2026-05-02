export type PropertyType = 'rental' | 'build_sell' | 'land';

export type PropertyStatus = 'active' | 'fully_funded' | 'completed' | 'paused';

export type PropertyPhase =
  | 'funding'        // All types: investors buying units
  | 'construction'   // rental & build_sell: being built
  | 'vacant'         // rental only: built but no tenant yet
  | 'renting'        // rental only: tenanted, generating income
  | 'selling'        // build_sell & land: listed for sale to end-buyers
  | 'sold'           // build_sell & land: sold, profit being distributed
  | 'holding'        // land only: appreciating, waiting to sell
  | 'completed';     // all types: cycle finished

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  phase: PropertyPhase;
  location: { state: string; city: string; area: string };
  developer: { id: string; name: string; initials: string };
  image: string;
  totalValue: number;
  unitPrice: number;
  totalUnits: number;
  unitsSold: number;
  investorCount: number;
  // Rental
  annualRent?: number;
  rentYield?: number;
  // Build & Sell
  estimatedProfit?: number;
  timelineMonths?: number;
  constructionProgress?: number;
  // Land
  pricePerSqm?: number;
  totalAreaSqm?: number;
  description: string;
}

export interface Holding {
  id: string;
  property: Property;
  units: number;
  investedAmount: number;
  currentValue: number;
  totalEarned: number;
  nextPayoutAmount: number;
  nextPayoutDays: number;
}

export interface Payout {
  id: string;
  propertyName: string;
  amount: number;
  date: string;
  status: 'sent' | 'pending' | 'failed';
}

export interface Developer {
  id: string;
  name: string;
  initials: string;
  bio: string;
  propertiesListed: number;
  totalRaised: number;
  investorCount: number;
  followerCount: number;
  isFollowing?: boolean;
  propertyIds: string[];
}

// Investment Flow
export interface InvestmentOrder {
  id: string;
  propertyId: string;
  propertyName: string;
  units: number;
  unitPrice: number;
  subtotal: number;
  platformFee: number;
  totalAmount: number;
}

// Secondary Market
export interface MarketListing {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyType: PropertyType;
  sellerName: string;
  units: number;
  askingPrice: number;
  originalPrice: number;
  gainPercent: number;
  listedAt: string;
}

export type ListingStatus = 'active' | 'sold' | 'cancelled';

export type TradeStatus = 'pending_payment' | 'payment_received' | 'processing' | 'seller_paid' | 'completed';

export interface P2PTrade {
  id: string;
  listingId: string;
  propertyId: string;
  propertyName: string;
  propertyType: PropertyType;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  units: number;
  pricePerUnit: number;
  subtotal: number;
  tradingFee: number;
  buyerPaid: number;
  sellerReceives: number;
  status: TradeStatus;
  sellerBankName: string;
  sellerAccountLast4: string;
  createdAt: string;
  paidAt?: string;
  sellerPaidAt?: string;
  completedAt?: string;
}

export interface MyListing {
  id: string;
  propertyName: string;
  propertyType: PropertyType;
  units: number;
  askingPrice: number;
  originalPrice: number;
  listedAt: string;
  views: number;
  status: ListingStatus;
  soldAt?: string;
  tradeId?: string;
  netReceived?: number;
  buyerName?: string;
}

// KYC
export type KYCTier = 'none' | 'tier1' | 'tier2' | 'tier3';

export interface KYCStatus {
  tier: KYCTier;
  verifiedAt?: string;
  bankAccount?: BankAccount;
  investmentLimit: number;
}

// Bank Account
export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
}

// Notifications
export type NotificationType = 'payout' | 'property' | 'market' | 'system';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  route?: string;
}

// Transactions
export type TransactionType = 'investment' | 'payout' | 'market_buy' | 'market_sell' | 'withdrawal';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// FAQ
export interface FAQItem {
  question: string;
  answer: string;
}
