/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Instrument Sans', 'sans-serif'],
      },
      colors: {
        sand: '#F7F5F1',
        charcoal: '#1C1917',
        ink: '#57514B',
        muted: '#78716C',
        terra: '#C25A35',
        'terra-hover': '#A84929',
        'terra-light': '#F5EDE8',
        border: '#E7E2DC',
      },
    },
  },
  plugins: [],
}
