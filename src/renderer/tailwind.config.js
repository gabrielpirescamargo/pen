const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
      colors: {
        pen: {
          50: '#e9f0f1',
          100: '#dde9e9',
          200: '#bad1d2',
          300: '#1f6a6f',
          400: '#1c5f64',
          500: '#195559',
          600: '#175053',
          700: '#134043',
          800: '#0e3032',
          900: '#0b2527',
        },
      },
      keyframes: {
        slideIn: {
          from: { width: 0 },
          to: { width: 'var(--radix-collapsible-content-width)' },
        },
        slideOut: {
          from: { width: 'var(--radix-collapsible-content-width)' },
          to: { width: 0 },
        },
      },
      animation: {
        slideIn: 'slideIn 0.25s',
        slideOut: 'slideOut 0.25s',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.region-drag': {
          '-webkit-app-region': 'drag',
        },
        '.region-no-drag': {
          '-webkit-app-region': 'no-drag',
        },
      });
    }),
  ],
};
