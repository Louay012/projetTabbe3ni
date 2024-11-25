/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      inset: {
        '10p': '10%',
        '20p': '20%',
        '25p': '25%',
        '30p': '30%',
        '50p': '50%',
      },
      colors: {
        violet:"#9b72c7",
      },
    },
  },
  plugins: [],
}

