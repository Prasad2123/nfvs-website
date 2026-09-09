import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(220, 100%, 95%)',
          100: 'hsl(220, 100%, 90%)',
          200: 'hsl(220, 100%, 80%)',
          300: 'hsl(220, 100%, 70%)',
          400: 'hsl(220, 100%, 60%)',
          500: 'hsl(220, 100%, 50%)',
          600: 'hsl(220, 100%, 40%)',
          700: 'hsl(220, 100%, 30%)',
          800: 'hsl(220, 100%, 20%)',
          900: 'hsl(220, 100%, 10%)',
          950: 'hsl(220, 100%, 5%)',
        },
        sidebar: {
          bg: '#0f172a',
        },
      },
      borderRadius: {
        card: '0.75rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
