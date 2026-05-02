import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Brand Colors ──
export const brand = {
  midnight: '#081E34',
  emerald: '#00E6B5',
  emeraldDark: '#00C49A',
  royal: '#6C63FF',
  royalLight: '#8B83FF',
} as const;

// ── Light Theme ──
export const lightColors = {
  // Backgrounds
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F8FAFC',
  bgTertiary: '#F1F5F9',
  bgElevated: '#FFFFFF',

  // Text
  textPrimary: '#081E34',
  textSecondary: '#344563',
  textTertiary: '#7A8BA0',
  textInverse: '#FFFFFF',

  // Borders
  borderDefault: '#E2E8F0',
  borderSubtle: '#F1F5F9',
  borderFocus: '#00D4AA',

  // Status
  success: '#00E6B5',
  successBg: '#E6FFF8',
  warning: '#F5A623',
  warningBg: '#FFF8E6',
  error: '#FF4D4F',
  errorBg: '#FFF1F0',
  info: '#6C63FF',
  infoBg: '#F0EEFF',

  // Property badges
  rentalBg: '#E6FFF8',
  rentalText: '#00875A',
  buildSellBg: '#F0EEFF',
  buildSellText: '#5B52E0',
  landBg: '#FFF3E6',
  landText: '#D4620A',

  // Navigation
  tabActive: '#00E6B5',
  tabInactive: '#7A8BA0',

  // Cards
  cardBg: '#FFFFFF',
  cardBorder: '#E2E8F0',

  // Gradient hero
  gradientStart: '#081E34',
  gradientEnd: '#12334F',
} as const;

// ── Dark Theme ──
export const darkColors = {
  bgPrimary: '#0A0E14',
  bgSecondary: '#111827',
  bgTertiary: '#1F2937',
  bgElevated: '#1A2332',

  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  textInverse: '#0A2540',

  borderDefault: '#1F2937',
  borderSubtle: '#374151',
  borderFocus: '#00E6B5',

  success: '#00E6B5',
  successBg: 'rgba(0, 230, 181, 0.15)',
  warning: '#FBBF24',
  warningBg: 'rgba(251, 191, 36, 0.15)',
  error: '#FF6B6B',
  errorBg: 'rgba(255, 107, 107, 0.15)',
  info: '#8B83FF',
  infoBg: 'rgba(139, 131, 255, 0.15)',

  rentalBg: 'rgba(0, 230, 181, 0.15)',
  rentalText: '#3CEDC4',
  buildSellBg: 'rgba(139, 131, 255, 0.15)',
  buildSellText: '#B0AAFF',
  landBg: 'rgba(251, 146, 60, 0.15)',
  landText: '#FF9F43',

  tabActive: '#00E6B5',
  tabInactive: '#6B7280',

  cardBg: '#1A2332',
  cardBorder: '#1F2937',

  gradientStart: '#081E34',
  gradientEnd: '#0D2840',
} as const;

export type ThemeColors = { [K in keyof typeof lightColors]: string };

// ── Typography ──
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  mono: 'JetBrainsMono_500Medium',
  monoBold: 'JetBrainsMono_700Bold',
} as const;

export const fontSize = {
  display: 42,
  h1: 28,
  h2: 22,
  h3: 18,
  h4: 15,
  body: 15,
  bodySmall: 13,
  caption: 12,
  overline: 10,
  money: 15, // base, override per use
} as const;

export const lineHeight = {
  display: 50,
  h1: 34,
  h2: 28,
  h3: 24,
  h4: 20,
  body: 22,
  bodySmall: 18,
  caption: 16,
  overline: 14,
} as const;

// ── Spacing (4px base) ──
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
  '5xl': 64,
  screenPadding: 16,
} as const;

// ── Border Radius ──
export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

// ── Shadows ──
export const shadows = {
  sm: {
    shadowColor: '#081E34',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#081E34',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#081E34',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;
