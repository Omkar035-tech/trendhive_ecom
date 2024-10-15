/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 7px 29px 0px rgba(100, 100, 111, 0.2)',
        smooth: '0 10px 29px 0px rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}