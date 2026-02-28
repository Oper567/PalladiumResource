/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',    // Deep Midnight
          muted: '#334155',   // Cool Gray/Slate
          accent: '#3b82f6',  // Professional Blue (used sparingly)
          bg: '#f8fafc',      // Soft off-white
        }
      }
    },
  },
  plugins: [],
}