/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./web/**/*.html",
    "./web/js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#0E7C7B",
        "accent": "#00B894",
        "background-light": "#F4F8F8",
        "background-dark": "#112121",
        "card-light": "#FFFFFF",
        "card-dark": "#1A2E2E",
        "text-light": "#0e1b1b",
        "text-dark": "#f4f8f8",
        "subtext-light": "#4d9997",
        "subtext-dark": "#A3D4D3",
        "border-light": "#d0e7e7",
        "border-dark": "#2a4242",
        "surface": "#FFFFFF"
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
