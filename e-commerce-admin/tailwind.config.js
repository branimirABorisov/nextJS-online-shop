/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'admin-main': '#1A55E3',
      'secondary-admin': '#FF0854',
      'admin-green': '#00D284',
      'admin-sky-blue': '#0DCAF0',
      'admin-purple': '#5E6EED'
    },
    extend: {
   
    },
  },
  plugins: [],
}
