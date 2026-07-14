/**
 * theme.ts
 * Central source of truth for design tokens used outside of Tailwind/NativeWind.
 * Use for StyleSheet, Animated values, or third-party components.
 */

export const Colors = {
  // --- Core Brand ---
  primary: '#2D4A3E',
  primaryLight: 'rgba(45,74,62,0.05)',
  primaryBorder: 'rgba(45,74,62,0.4)',
  primaryMuted: 'rgba(45,74,62,0.2)',
  primaryForeground: '#FAF9F5',

  // --- Backgrounds ---
  background: '#FAF8F5',
  backgroundOverlay: 'rgba(250,248,245,0.95)',
  backgroundBlur: 'rgba(250,248,245,0.8)',

  // --- Surfaces ---
  card: '#FFFFFF',

  // --- Foreground / Text ---
  foreground: '#1A2E26',
  mutedForeground: '#6B7D6F',

  // --- Secondary ---
  secondary: '#EDF1EB',

  // --- Borders ---
  border: '#DDE3DA',
  borderMuted: 'rgba(221,227,218,0.6)',

  // --- Status ---
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#38BDF8',

  // --- Badge / Difficulty ---
  badgeEasy: '#22C55E',
  badgeModerate: '#F59E0B',
  badgeHard: '#EF4444',
} as const;

export const FontFamily = {
  heading: 'Lora_700Bold',
  subheading: 'Lora_600SemiBold',
  body: 'DMSans_400Regular',
  caption: 'DMSans_300Light',
  label: 'DMSans_500Medium',
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  '2xl': 28,
  '3xl': 34,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadow = {
  card: {
    shadowColor: '#1A2E26',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cta: {
    shadowColor: '#2D4A3E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 8,
  },
  modal: {
    shadowColor: '#1A2E26',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const Gradient = {
  // Welcome screen hero overlay
  heroOverlay: [
    'transparent',
    'rgba(26,46,38,0.15)',
    'rgba(26,46,38,0.85)',
  ],
  // Personalise screen image fade
  imageFade: ['transparent', Colors.background],
} as const;