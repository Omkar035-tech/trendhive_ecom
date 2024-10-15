/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your file structure
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 7px 29px 0px rgba(100, 100, 111, 0.2)',
        smooth: '0 10px 29px 0px rgba(0,0,0,0.07)',
      },
      screens: {
        'xxs': '460px', // min-width
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
