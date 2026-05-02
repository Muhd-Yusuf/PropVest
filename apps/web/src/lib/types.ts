export type PropertyType = 'rental' | 'build_sell' | 'land';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: string;
  developer: string;
  totalValue: number;
  unitPrice: number;
  totalUnits: number;
  unitsSold: number;
  investorCount: number;
  yield: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  invested: number;
  properties: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface PropertyTypeInfo {
  type: PropertyType;
  title: string;
  description: string;
  icon: string;
  exampleYield: string;
  payoutFrequency: string;
}
