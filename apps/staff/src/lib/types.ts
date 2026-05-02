// ---- RBAC ----
export type StaffRole = 'ceo' | 'coo' | 'ops' | 'finance' | 'legal' | 'devrel' | 'support' | 'compliance';

export interface StaffUser {
  id: string;
  fullName: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  lastActiveAt: string;
  createdAt: string;
}

// ---- Properties ----
export type PropertyType = 'rental' | 'build_sell' | 'land';
export type PropertyStatus = 'draft' | 'under_review' | 'active' | 'paused' | 'fully_funded' | 'completed';
export type PropertyPhase =
  | 'funding'        // All types: investors buying units
  | 'construction'   // rental & build_sell: being built
  | 'vacant'         // rental only: built but no tenant yet
  | 'renting'        // rental only: tenanted, generating income
  | 'selling'        // build_sell & land: listed for sale
  | 'sold'           // build_sell & land: sold, distributing profit
  | 'holding'        // land only: appreciating, waiting to sell
  | 'completed';     // all types: cycle finished, all investors paid out

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  phase: PropertyPhase;
  location: { state: string; city: string; area: string };
  developerId: string;
  developerName: string;
  totalValue: number;
  unitPrice: number;
  totalUnits: number;
  unitsSold: number;
  investorCount: number;
  yield: string;
  description: string;
  platformFeePercent: number;
  managementFeePercent: number;
  paystackSubaccountCode: string;
  dvaAccountNumber: string;
  dvaBank: string;
  documents: { name: string; url: string; type: string }[];
  images: string[];
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  constructionProgress?: number; // 0-100
  expectedCompletionDate?: string;
  firstRentDate?: string;
}

// ---- Investors ----
export type KYCTier = 1 | 2 | 3;
export type KYCStatus = 'pending' | 'verified' | 'rejected';

export interface Investor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  kycTier: KYCTier;
  kycStatus: KYCStatus;
  totalInvested: number;
  currentValue: number;
  propertiesCount: number;
  isFrozen: boolean;
  isFlagged: boolean;
  bankAccounts: { bankName: string; accountNumber: string; accountName: string; isPrimary: boolean }[];
  createdAt: string;
  lastLoginAt: string;
}

// ---- KYC Records ----
export type KYCMethod = 'bank_account' | 'bvn' | 'nin';
export type KYCMatchResult = 'match' | 'mismatch' | 'partial';
export type KYCRecordStatus = 'pending' | 'approved' | 'rejected';

export interface KYCRecord {
  id: string;
  investorId: string;
  investorName: string;
  investorEmail: string;
  tier: KYCTier;
  method: KYCMethod;
  submittedData: Record<string, string>;
  apiData: Record<string, string>;
  matchResult: KYCMatchResult;
  status: KYCRecordStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  createdAt: string;
}

// ---- Transactions ----
export type TransactionType = 'investment' | 'payout' | 'p2p_buy' | 'p2p_sell' | 'fee';
export type TransactionStatus = 'pending' | 'success' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  userId: string;
  userName: string;
  propertyId: string;
  propertyName: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: TransactionStatus;
  reference: string;
  createdAt: string;
}

// ---- Payouts ----
export type PayoutStatus = 'calculating' | 'pending_approval' | 'approved' | 'processing' | 'completed' | 'partial';

export interface InvestorPayout {
  investorId: string;
  investorName: string;
  units: number;
  share: number;
  amount: number;
  status: 'pending' | 'sent' | 'failed';
  bankName: string;
  accountNumber: string;
}

export interface Payout {
  id: string;
  propertyId: string;
  propertyName: string;
  quarter: string;
  totalRentReceived: number;
  managementFee: number;
  platformShare: number;
  distributableAmount: number;
  investorPayouts: InvestorPayout[];
  status: PayoutStatus;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

// ---- P2P Trades ----
export type TradeStatus = 'active' | 'sold' | 'cancelled';

export interface P2PTrade {
  id: string;
  sellerId: string;
  sellerName: string;
  buyerId?: string;
  buyerName?: string;
  propertyId: string;
  propertyName: string;
  units: number;
  pricePerUnit: number;
  totalAmount: number;
  tradingFee: number;
  status: TradeStatus;
  isFlagged: boolean;
  flagReason?: string;
  createdAt: string;
  soldAt?: string;
}

// ---- Developer Partners ----
export type DeveloperStatus = 'active' | 'inactive' | 'pending';

export interface DeveloperPartner {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  bio: string;
  propertiesCount: number;
  totalRaised: number;
  totalInvestors: number;
  followerCount: number;
  status: DeveloperStatus;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  createdAt: string;
}

// ---- Audit Logs ----
export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: StaffRole;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

// ---- Announcements ----
export type AnnouncementType = 'broadcast' | 'targeted';
export type AnnouncementStatus = 'draft' | 'sent';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: AnnouncementType;
  targetFilter?: string;
  status: AnnouncementStatus;
  sentBy?: string;
  sentAt?: string;
  recipientCount?: number;
  createdAt: string;
}

// ---- Support Tickets ----
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  messageCount: number;
  createdAt: string;
  resolvedAt?: string;
}

// ---- DataTable ----
export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}
