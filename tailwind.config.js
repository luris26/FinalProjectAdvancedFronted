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
        customPurple: '#4B4376',
        Kabul: '#5B443E',
        ChestnutRose: '#CD6858',
        ChestnutRoseComplement: ' #ba4a38',
        QuillGray: '#CECECD',
        Tan: '#CFA987',
        TanComplementary: '#c08f63',
        GreenOlive: '#867E32',
        GreenOliveComple: '#aba140',
        addButton:'#404aab'
      }
    },
  },
  plugins: [],
}

