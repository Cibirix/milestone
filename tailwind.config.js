/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-sora)'],
      },
      colors: {
        brand: {
          50: '#f3f6fa',
          100: '#e5ecf6',
          200: '#c8d6eb',
          300: '#9ab3d8',
          400: '#6d8fc1',
          500: '#4369a8',
          600: '#264887',
          700: '#1b3468',
          800: '#132547',
          900: '#0f1d36',
        },
        tan: {
          50: '#fcf8f3',
          100: '#f5ede0',
          200: '#e8d8c0',
          300: '#d8bc96',
          400: '#c79d6f',
          500: '#af8052',
          600: '#91613b',
        },
        charcoal: {
          50: '#f6f7f8',
          100: '#e6e9ec',
          200: '#cfd5dc',
          300: '#adb7c2',
          400: '#8693a1',
          500: '#667383',
          600: '#4f5a67',
          700: '#3f4752',
          800: '#2c323a',
          900: '#1d2127',
          950: '#121519',
        },
        rust: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
    },
  },
  plugins: [],
}
