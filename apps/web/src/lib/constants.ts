export const brand = {
  midnight: '#081E34',
  midnightLight: '#12334F',
  emerald: '#00E6B5',
  emeraldDark: '#00C49A',
  royal: '#6C63FF',
  royalLight: '#8B83FF',
} as const;

export const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Properties', href: '#featured-properties' },
  { label: 'Returns', href: '#returns-calculator' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const socialLinks = {
  twitter: 'https://twitter.com/propvest',
  instagram: 'https://instagram.com/propvest',
  linkedin: 'https://linkedin.com/company/propvest',
} as const;

export const platformStats = {
  totalManaged: 450_000_000,
  totalInvestors: 1200,
  propertiesListed: 12,
  averageYield: '8-12%',
} as const;
