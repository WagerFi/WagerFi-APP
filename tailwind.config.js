/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'titillium': ['Titillium Web', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#7ac7fc',
          400: '#36aaf8',
          500: '#0c8ee9',
          600: '#016fc7',
          700: '#0159a2',
          800: '#064c85',
          900: '#0a406f',
          950: '#072949',
        },
        secondary: {
          50: '#f4f3ff',
          100: '#ebdefe',
          200: '#d9c3fd',
          300: '#c096fb',
          400: '#a865f7',
          500: '#9138f0',
          600: '#8122e4',
          700: '#701ac4',
          800: '#5e19a0',
          900: '#4c1982',
          950: '#2e0d54',
        },
        dark: {
          800: '#141b2d',
          850: '#111827',
          900: '#0f172a',
          950: '#060818',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dark-gradient': 'linear-gradient(to bottom right, rgb(14, 23, 41), rgb(10, 17, 30))',
        'card-gradient': 'linear-gradient(to bottom right, rgba(35, 47, 80, 0.7), rgba(25, 34, 60, 0.7))',
        'card-hover': 'linear-gradient(to bottom right, rgba(40, 55, 95, 0.8), rgba(30, 42, 75, 0.8))'
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(86, 95, 235, 0.15)',
        'glow-strong': '0 0 20px rgba(99, 102, 241, 0.25)'
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        }
      }
    },
  },
  plugins: [],
  safelist: [
    'shadow-glow',
    'hover:shadow-glow'
  ]
};