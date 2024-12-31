/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf0fc',
          100: '#c8d2f7',
          150: '#a4b4f2',
          200: '#8095ed',
          300: '#5b77e8',
          400: '#3759e2',
          500: '#1e41d0',
          600: '#1938b1',
          700: '#152e91',
          800: '#102371',
          900: '#0c1951',
        },
        neutral: {
          100: '#ffffff',
          200: '#f5f5f5',
          300: '#ebebeb',
          400: '#e0e0e0',
          500: '#d7d7d7',
          600: '#a1a1a1',
          700: '#6b6b6b',
          800: '#363636',
          900: '#000000',
        },
        success: {
          400: '#62cc7d',
          500: '#36a652',
          600: '#26763a',
        },
        error: {
          400: '#e5758b',
          500: '#db4563',
          600: '#b72341',
        },
      },
      fontWeight: {
        regular: 300,
        medium: 400,
        semibold: 700,
        bold: 800,
      },
      fontFamily: {
        primary: ['Manrope', 'serif'],
      },
      screens: {
        // xs implicity applies when no breakpoint prefix
        sm: '480px', // Starts at 480px and above.
        md: '712px', // Starts at 712px and above.
        lg: '960px', // Starts at 960px and above.
        xl: '1200px', // Starts at 1200px and above.
        '2xl': '1536px', // Starts at 1536 and above.
      },
    },
  },
  plugins: [],
};
