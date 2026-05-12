/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0A1430',
          800: '#11214A',
          700: '#1A2D5C',
          line: '#2A3A66',
        },
        gold: {
          DEFAULT: '#C9A24A',
          soft: '#E2C77E',
          deep: '#A6822F',
        },
        cream: '#F4ECD8',
        muted: '#9AA3B8',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Amiri"', 'serif'],
        kufi: ['"Reem Kufi"', '"Amiri"', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.9s ease-out forwards',
        'float-y': 'floatY 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
