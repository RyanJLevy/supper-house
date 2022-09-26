/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'supper-pink': '#EF476F',
        'supper-green': '#06D6A0',
        'supper-blue': '#30BCED',
        'supper-pink-dark': '#DD4368',
        'supper-green-dark': '#06BF8F',
        'supper-dark-gray': '#565656',
        'supper-light-gray': '#D9D9D9',
        'supper-med-gray': '#D0D0D0',
        'supper-black': '#201E1F'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      "sans": ["Signika"]
    }
  },
  plugins: [],
}
