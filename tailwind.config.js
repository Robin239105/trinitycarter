/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#725c00",
        'on-primary': "#ffffff",
        'primary-container': "#b8960c",
        'on-primary-container': "#3d3000",
        secondary: "#994251",
        'on-secondary': "#ffffff",
        'secondary-container': "#fd91a0",
        'on-secondary-container': "#772737",
        surface: "#fcf9f4",
        'on-surface': "#1c1c19",
        background: "#fcf9f4",
        'on-background': "#1c1c19",
        outline: "#7e7662",
      },
      fontFamily: {
        headline: ['Noto Serif', 'serif'],
        body: ['Manrope', 'sans-serif'],
        label: ['Manrope', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
