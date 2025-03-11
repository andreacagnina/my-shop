/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Aggiungi il percorso del tuo file HTML
    './src/**/*.{js,ts,jsx,tsx}', // Includi i tuoi file JavaScript, TypeScript, JSX, TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
