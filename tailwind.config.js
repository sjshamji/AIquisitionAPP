/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8a63d2',
          50: '#f4f1fb',
          100: '#e9e3f6',
          200: '#d4c7ed',
          300: '#bdabe3',
          400: '#a68ad8',
          500: '#8a63d2',
          600: '#7a4fc2',
          700: '#6a3bab',
          800: '#56308c',
          900: '#462973',
        },
        secondary: {
          DEFAULT: '#5b91e5',
          50: '#f0f5fe',
          100: '#e1eafc',
          200: '#c3d5f9',
          300: '#a4c0f6',
          400: '#86abf2',
          500: '#5b91e5',
          600: '#4173d4',
          700: '#305bb7',
          800: '#264894',
          900: '#1f3b79',
        },
      },
    },
  },
  plugins: [],
}; 