export const colors = {
  // ── Backgrounds ──
  bgVoid: '#0a0b0e',
  bgSurface: '#111214',
  bgCard: '#141518',
  bgCardHover: '#1a1b1f',
  bgSidebar: '#0d0e10',
  bgTertiary: '#18191c',
  bgInput: '#18191c',
  bgModal: 'rgba(10, 11, 14, 0.94)',
  bgTooltip: '#222328',

  // ── Typography Colors ──
  textPrimary: '#e8e8ec',
  textSecondary: '#9a9aa6',
  textMuted: '#5c5c6a',
  textDim: '#44444e',
  textHeading: '#f4f4f7',
  textAccent: '#14b8a6',
  textInverse: '#0a0b0e',

  // ── Accent Colors ──
  accentTeal: '#14b8a6',
  accentTealDim: 'rgba(20, 184, 166, 0.12)',
  accentTealGlow: 'rgba(20, 184, 166, 0.25)',
  accentTealHover: '#0d9488',
  accentBlue: '#06b6d4',
  accentBlueDim: 'rgba(6, 182, 212, 0.15)',
  accentPurple: '#8b5cf6',
  accentPurpleDim: 'rgba(139, 92, 246, 0.15)',
  accentInfo: '#38bdf8',

  // ── Status Colors ──
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  statusOffline: '#52525b',
  statusOnline: '#10b981',
  statusBusy: '#ef4444',
  statusAway: '#f59e0b',

  // ── Borders ──
  borderSubtle: '#1e1e24',
  borderLight: '#2a2a30',
  borderGlow: 'rgba(20, 184, 166, 0.25)',
  borderInput: '#2a2a30',
  borderFocus: '#14b8a6',

  // ── Glass / Blur Effects ──
  glassBg: 'rgba(255, 255, 255, 0.03)',
  glassBorder: 'rgba(255, 255, 255, 0.05)',
  glassHighlight: 'rgba(255, 255, 255, 0.06)',
} as const;

export const gradients = {
  primary: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
  accent: 'linear-gradient(135deg, #14b8a6, #8b5cf6)',
  card: 'linear-gradient(145deg, #141518, #18191c)',
  sidebar: 'linear-gradient(180deg, #0d0e10, #0a0b0e)',
  bg: 'linear-gradient(160deg, #0a0b0e, #0f1012)',
  button: 'linear-gradient(135deg, #14b8a6, #0d9488)',
  header: 'linear-gradient(90deg, #14b8a6, #06b6d4)',
} as const;

export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.5)',
  md: '0 4px 12px rgba(0, 0, 0, 0.5)',
  lg: '0 8px 28px rgba(0, 0, 0, 0.6)',
  xl: '0 16px 44px rgba(0, 0, 0, 0.65)',
  card: '0 2px 16px rgba(0, 0, 0, 0.4)',
  glow: '0 0 16px rgba(20, 184, 166, 0.15)',
  glowAccent: '0 0 16px rgba(6, 182, 212, 0.15)',
  inset: 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

export const radius = {
  xs: '4px',
  sm: '6px',
  md: '10px',
  card: '14px',
  button: '10px',
  input: '10px',
  lg: '14px',
  xl: '20px',
  '2xl': '28px',
  full: '9999px',
} as const;

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', Roboto, sans-serif",
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
  },
} as const;

export const transitions = {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '400ms ease',
} as const;

export const blur = {
  glass: '10px',
  glassHeavy: '20px',
} as const;
