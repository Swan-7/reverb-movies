/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      filter: {
        'blue-overlay': 'brightness(1.2) saturate(1.3) sepia(0.3) hue-rotate(180deg)',
      },},
  },
  plugins: [],
}

