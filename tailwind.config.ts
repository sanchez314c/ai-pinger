import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/renderer/**/*.{html,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        noir: {
          // ── Backgrounds ──
          'void': '#0a0b0e',
          'surface': '#111214',
          'card': '#141518',
          'card-hover': '#1a1b1f',
          'sidebar': '#0d0e10',
          'tertiary': '#18191c',
          'input': '#18191c',
          'tooltip': '#222328',

          // ── Typography ──
          'text-primary': '#e8e8ec',
          'text-secondary': '#9a9aa6',
          'text-muted': '#5c5c6a',
          'text-dim': '#44444e',
          'text-heading': '#f4f4f7',
          'text-accent': '#14b8a6',
          'text-inverse': '#0a0b0e',

          // ── Accents ──
          'accent-teal': '#14b8a6',
          'accent-teal-hover': '#0d9488',
          'accent-blue': '#06b6d4',
          'accent-purple': '#8b5cf6',
          'accent-info': '#38bdf8',

          // ── Status ──
          'success': '#10b981',
          'warning': '#f59e0b',
          'error': '#ef4444',
          'status-offline': '#52525b',

          // ── Borders ──
          'border-subtle': '#1e1e24',
          'border-light': '#2a2a30',
          'border-input': '#2a2a30',
          'border-focus': '#14b8a6',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        card: '14px',
        btn: '10px',
        input: '10px',
        lg: '14px',
        xl: '20px',
        '2xl': '28px',
        pill: '9999px',
      },
      backdropBlur: {
        glass: '10px',
        'glass-heavy': '20px',
      },
      boxShadow: {
        'noir-sm': '0 1px 3px rgba(0, 0, 0, 0.5)',
        'noir-md': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'noir-lg': '0 8px 28px rgba(0, 0, 0, 0.6)',
        'noir-xl': '0 16px 44px rgba(0, 0, 0, 0.65)',
        'noir-card': '0 2px 16px rgba(0, 0, 0, 0.4)',
        'noir-glow': '0 0 16px rgba(20, 184, 166, 0.15)',
        'noir-glow-accent': '0 0 16px rgba(6, 182, 212, 0.15)',
        'noir-inset': 'inset 0 1px 3px rgba(0, 0, 0, 0.4)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
