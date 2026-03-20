/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4e73df',
          dark: '#2e59d9'
        },
        secondary: '#f8f9fc',
        accent: '#e74a3b',
        darkGray: '#5a5c69',
        success: '#1cc88a'
      }
    },
  },
  plugins: [],
}
