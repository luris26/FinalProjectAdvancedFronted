/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        customGray: '#9EDF9C',
        customPurple: '#4B4376'
      }
    },
  },
  plugins: [],
}

