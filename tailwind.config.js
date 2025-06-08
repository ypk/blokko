/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bangers': ['Bangers', 'cursive'],
        'boogaloo': ['Boogaloo', 'cursive'],
        'luckiest': ['Luckiest Guy', 'cursive'],
      },
    },
  },
  plugins: [],
}
