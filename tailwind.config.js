/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#B301F2',
        secondary: '#8B4FC94F',
      },
      animation: {
        'slow-spin': 'spin 10s linear infinite',
      },
    },
  },
  plugins: [],
};
