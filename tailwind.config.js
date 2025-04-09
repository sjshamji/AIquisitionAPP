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
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'blob': 'blob 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'network-float': 'network-float 15s ease-in-out infinite',
        'connection-pulse': 'connection-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-10%, 10%)' },
          '50%': { transform: 'translate(10%, -10%)' },
          '75%': { transform: 'translate(-10%, -10%)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10%, 10%) scale(1.2)' },
          '50%': { transform: 'translate(-10%, 10%) scale(0.8)' },
          '75%': { transform: 'translate(-10%, -10%) scale(1.1)' },
        },
        'network-float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(2%, 2%) rotate(5deg)' },
          '50%': { transform: 'translate(-2%, -1%) rotate(-5deg)' },
          '75%': { transform: 'translate(-1%, 2%) rotate(3deg)' },
        },
        'connection-pulse': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}; 