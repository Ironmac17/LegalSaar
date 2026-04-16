/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fcfcfc',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b2b2b2',
          400: '#999999',
          500: '#7f7f7f',
          600: '#666666',
          700: '#4c4c4c',
          800: '#333333',
          900: '#1c1c1c', // Primary Black
          DEFAULT: '#1c1c1c',
        },
        secondary: {
          50: '#f9f5e9',
          100: '#f4ebd4',
          200: '#ead7a8',
          300: '#e0c37d',
          400: '#d5ae52',
          500: '#c9a227', // Secondary Gold
          600: '#a1821f',
          700: '#796117',
          800: '#504110',
          900: '#282008',
          DEFAULT: '#c9a227',
        },
        background: {
          DEFAULT: '#F8F7F4', // Off-white
        },
        surface: {
          DEFAULT: '#FFFFFF', // White
        },
        text: {
          DEFAULT: '#2E2E2E', // Dark Gray
          light: '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
        card: '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        lg: '1rem', // Softer rounded corners
      },
    },
  },
  plugins: [],
}