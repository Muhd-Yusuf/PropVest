import { Property, Testimonial, FAQItem, Step, PropertyTypeInfo } from './types';

export const properties: Property[] = [
  {
    id: '1',
    name: 'Gwarinpa Luxury Duplex',
    type: 'rental',
    location: 'Gwarinpa, Abuja',
    developer: 'Saleem Goje Properties',
    totalValue: 90_000_000,
    unitPrice: 100_000,
    totalUnits: 900,
    unitsSold: 648,
    investorCount: 648,
    yield: '8.5% pa',
    description: 'Stunning 4-bedroom duplex with modern finishes and 24-hour power supply. Fully tenanted.',
  },
  {
    id: '2',
    name: 'Kuje Estate Phase 2',
    type: 'build_sell',
    location: 'Kuje, Abuja',
    developer: 'Dan Mama Homes',
    totalValue: 250_000_000,
    unitPrice: 100_000,
    totalUnits: 2500,
    unitsSold: 1125,
    investorCount: 890,
    yield: '~40% return',
    description: '10-unit estate development. Construction 35% complete. Estimated 40% ROI over 18 months.',
  },
  {
    id: '3',
    name: 'Jabi Lake Terraces',
    type: 'rental',
    location: 'Jabi, Abuja',
    developer: 'Saleem Goje Properties',
    totalValue: 150_000_000,
    unitPrice: 100_000,
    totalUnits: 1500,
    unitsSold: 1350,
    investorCount: 1120,
    yield: '10.2% pa',
    description: 'Premium terrace apartments overlooking Jabi Lake. 98% occupancy rate.',
  },
  {
    id: '4',
    name: 'Maitama Commercial Plot',
    type: 'land',
    location: 'Maitama, Abuja',
    developer: 'Dan Mama Homes',
    totalValue: 500_000_000,
    unitPrice: 200_000,
    totalUnits: 2500,
    unitsSold: 625,
    investorCount: 420,
    yield: '~15% pa',
    description: '2.5 hectares of prime commercial land with 15% annual appreciation.',
  },
];

export const steps: Step[] = [
  {
    number: 1,
    title: 'Browse Properties',
    description: 'Explore verified properties from trusted Nigerian developers. Filter by type, location, and yield.',
    icon: 'Search',
  },
  {
    number: 2,
    title: 'Select Units',
    description: 'Choose how many units to buy starting from ₦100,000 per unit. See your total and projected returns.',
    icon: 'MousePointerClick',
  },
  {
    number: 3,
    title: 'Make Payment',
    description: 'Pay via bank transfer to a dedicated virtual account. Your money goes directly to the developer via Paystack.',
    icon: 'CreditCard',
  },
  {
    number: 4,
    title: 'Earn Returns',
    description: 'Receive quarterly payouts for rental properties, or profit when build & sell projects complete.',
    icon: 'TrendingUp',
  },
];

export const propertyTypes: PropertyTypeInfo[] = [
  {
    type: 'rental',
    title: 'Rental Income',
    description: 'Invest in tenanted properties and earn quarterly rent payouts proportional to your units. Stable, predictable income.',
    icon: 'Home',
    exampleYield: '8-12% annually',
    payoutFrequency: 'Quarterly',
  },
  {
    type: 'build_sell',
    title: 'Build & Sell',
    description: 'Fund property development and earn profit when the completed project is sold. Higher returns for patient investors.',
    icon: 'Hammer',
    exampleYield: '30-45% over 12-18mo',
    payoutFrequency: 'On sale',
  },
  {
    type: 'land',
    title: 'Land Banking',
    description: 'Invest in prime land that appreciates over time. The safest long-term play in Nigerian real estate.',
    icon: 'Map',
    exampleYield: '15-25% annually',
    payoutFrequency: 'On appreciation',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Aisha Mohammed',
    role: 'Teacher, Kano',
    quote: 'I started with ₦100,000 and now I earn quarterly rent from a property in Gwarinpa. PropVest made real estate accessible for people like me.',
    invested: 500_000,
    properties: 3,
  },
  {
    id: 't2',
    name: 'Chinedu Okafor',
    role: 'Software Developer, Lagos',
    quote: 'As a tech person, I love how transparent everything is. I can see exactly where my money goes — straight to the developer, small platform fee. No hidden charges.',
    invested: 2_000_000,
    properties: 5,
  },
  {
    id: 't3',
    name: 'Hauwa Ibrahim',
    role: 'Nurse, Abuja',
    quote: 'The secondary market is brilliant. I bought units in Jabi Lake Terraces and later sold some at 20% profit when I needed cash. Real estate has never been this liquid.',
    invested: 800_000,
    properties: 2,
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'What is PropVest?',
    answer: 'PropVest is a fractional real estate investment platform that allows you to own units in premium Nigerian properties starting from as little as ₦100,000.',
  },
  {
    question: 'How do I earn returns?',
    answer: 'For rental properties, you receive quarterly payouts proportional to your units. For build & sell properties, you earn when the property is sold. For land, you benefit from appreciation.',
  },
  {
    question: 'Is my investment safe?',
    answer: 'All properties are verified with valid C of O and Governor\'s Consent. Payments are processed through Paystack and go directly to the developer\'s bank account minus a small platform fee.',
  },
  {
    question: 'How does the money flow work?',
    answer: 'The money never touches our account. When an investor pays, Paystack splits the funds — the developer receives their share and PropVest takes a small platform fee. Full transparency.',
  },
  {
    question: 'What is the secondary market?',
    answer: 'The secondary market allows you to sell your units to other investors before maturity. You set your price, and buyers can purchase at market rates. A small capped trading fee applies.',
  },
  {
    question: 'What are the fees?',
    answer: 'PropVest charges a small platform fee on investments and payouts. There is a capped trading fee on secondary market transactions. No hidden charges. See the app for current rates.',
  },
  {
    question: 'What if I want my money back?',
    answer: 'Three ways: sell your units on the marketplace to another investor, hold and keep collecting rent, or wait for the property to be sold and receive your share.',
  },
  {
    question: 'Can I invest from outside Nigeria?',
    answer: 'Yes! PropVest supports diaspora investors. You can invest from anywhere using a Nigerian bank account for verification and payouts.',
  },
  {
    question: 'How do developers list properties?',
    answer: 'Developers apply to partner with PropVest. We verify their properties (C of O, building permits, etc.) before listing. Developers keep full control of their brand and receive the bulk of all investments.',
  },
];

export const developerBenefits = [
  {
    title: 'Unlock your audience',
    description: 'Your followers already want to invest in your properties. Give them the tool to do it.',
    icon: 'Users',
  },
  {
    title: 'Money comes faster',
    description: 'Instead of finding 10 rich buyers, get funded by 1,000 small investors in weeks.',
    icon: 'Zap',
  },
  {
    title: 'Keep your brand',
    description: 'Properties are listed under YOUR name, YOUR logo. PropVest is the engine, you\'re the driver.',
    icon: 'Shield',
  },
  {
    title: 'Full transparency',
    description: 'Funds go straight to your bank via Paystack. Real-time dashboard for all transactions.',
    icon: 'BarChart3',
  },
];
