/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf8f4',
          100: '#f5efe0',
          200: '#ebe0c4',
          300: '#e0d0a0',
          400: '#d4af37',
          500: '#c9a227',
          600: '#a8841f',
          700: '#86681a',
          800: '#5c4714',
          900: '#3d2f0e',
        },
        accent: {
          400: '#f0d78c',
          500: '#d4af37',
          600: '#c9a227',
        },
        ink: {
          900: '#0c0b09',
          800: '#141210',
          700: '#1a1814',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
