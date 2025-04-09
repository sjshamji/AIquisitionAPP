/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
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
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'network-float': 'network-float 15s ease-in-out infinite',
        'connection-pulse': 'connection-pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'scroll-slow': 'scroll 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-10%, 10%)' },
          '50%': { transform: 'translate(10%, -10%)' },
          '75%': { transform: 'translate(-10%, -10%)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
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
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [],
}; 