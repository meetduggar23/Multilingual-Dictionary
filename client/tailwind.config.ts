/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Sora"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: 'rgb(var(--background) / <alpha-value>)',
          100: 'rgb(var(--surface) / <alpha-value>)',
          200: 'rgb(var(--surface) / <alpha-value>)',
          300: 'rgb(var(--surface-2) / <alpha-value>)',
          400: 'var(--border)',
          500: 'rgb(var(--text-muted) / <alpha-value>)',
        },
        navy: {
          DEFAULT: 'rgb(var(--text-primary) / <alpha-value>)',
          50: '#F0F2F7',
          100: '#D6DBE5',
          200: '#AAB5C9',
          300: '#7E8FAD',
          400: '#526991',
          500: '#2E4470',
          600: '#14213D',
          700: '#0E1829',
          800: '#09101A',
          900: '#05080D',
        },
        band: 'rgb(var(--band) / <alpha-value>)',
        navbar: 'rgb(var(--navbar) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surface2: 'rgb(var(--surface-2) / <alpha-value>)',
        'card-hover': 'rgb(var(--card-hover) / <alpha-value>)',
        orange: {
          DEFAULT: '#F97316',
          50: '#FFF5EB',
          100: '#FEE9D4',
          200: '#FDD0A8',
          300: '#FDB47C',
          400: '#FB9850',
          500: '#F97316',
          600: '#EA670C',
          700: '#C5560B',
          800: '#A0460A',
          900: '#7A3608',
        },
        border: 'var(--border)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--text-primary) / <alpha-value>)',
        primary: {
          DEFAULT: '#F97316',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          foreground: 'rgb(var(--text-primary) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: 'rgb(var(--surface-2) / <alpha-value>)',
          foreground: 'rgb(var(--text-muted) / <alpha-value>)',
        },
        accent: {
          DEFAULT: '#F97316',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--text-primary) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--text-primary) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgb(var(--success) / <alpha-value>)',
          foreground: '#FFFFFF',
        },
      },
      borderRadius: {
        lg: '22px',
        md: '20px',
        sm: '16px',
        xl: '24px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'slide-in': 'slide-in 0.3s ease-out forwards',
      },
      boxShadow: {
        soft: '0 2px 20px var(--shadow-soft)',
        card: '0 4px 24px var(--shadow-card)',
        elevated: '0 8px 40px var(--shadow-elevated)',
        'glow-orange': '0 0 40px rgba(249, 115, 22, 0.2)',
        hover: '0 12px 48px var(--shadow-hover)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
