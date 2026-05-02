export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  rental: 'Rental',
  build_sell: 'Build & Sell',
  land: 'Land',
  other: 'Other',
};

export const PROPERTY_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  under_review: 'Under Review',
  active: 'Active',
  paused: 'Paused',
  fully_funded: 'Fully Funded',
  completed: 'Completed',
};

export const PROPERTY_PHASE_LABELS: Record<string, string> = {
  funding: 'Funding',
  construction: 'Construction',
  vacant: 'Awaiting Tenant',
  renting: 'Renting',
  selling: 'Selling',
  sold: 'Sold',
  holding: 'Holding',
  completed: 'Completed',
};

export const PAYOUT_FREQUENCY_LABELS: Record<string, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  biannually: 'Bi-annually',
  annually: 'Annually',
  custom: 'Custom',
};

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];
