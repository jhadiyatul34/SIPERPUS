/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'library': "url('C:/Users/Public/Documents/SIPERPUS/client/public/images/perpustakaan.jpg')"
      },
      spacing: {
        '90': '350px',
      }
    },
    fontFamily: {
      'titilium': ['Titillium Web', 'sans-serif']
    }
  },
  plugins: [require("daisyui")],
}