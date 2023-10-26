/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'dark-blue': '#12232E',
      'lighter-blue': '#007CC7',
      'lightest-blue': '#4DA8DA',
      'shadow-of-dark-blue': '#203647',
      'shadow-of-light-blue': '#EEFBFB',
      'admin-white': '#ffffff',
      'primary-btn': '#15803d',
      'alert-btn': '#b91c1c'
    },
    extend: {
   
    },
  },
  plugins: [],
}
