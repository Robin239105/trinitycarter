/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base Trinity Palette
        primary: "#725c00",
        'on-primary': "#ffffff",
        'primary-container': "#b8960c",
        'on-primary-container': "#3d3000",
        'primary-fixed': "#ffe082",
        'primary-fixed-dim': "#e9c340",
        
        secondary: "#994251",
        'on-secondary': "#ffffff",
        'secondary-container': "#fd91a0",
        'on-secondary-container': "#772737",
        'secondary-fixed': "#ffd9dc",
        'secondary-fixed-dim': "#ffb2bb",
        
        tertiary: "#4258af",
        'on-tertiary': "#ffffff",
        'tertiary-container': "#7f94ef",
        'on-tertiary-container': "#0b287f",
        
        surface: "#fcf9f4",
        'on-surface': "#1c1c19",
        'surface-variant': "#e5e2dd",
        'on-surface-variant': "#4d4635",
        'surface-dim': "#dcdad5",
        'surface-bright': "#fcf9f4",
        'surface-container-low': "#f6f3ee",
        'surface-container': "#f0ede9",
        'surface-container-high': "#ebe8e3",
        'surface-container-highest': "#e5e2dd",
        'surface-container-lowest': "#ffffff",
        
        background: "#fcf9f4",
        'on-background': "#1c1c19",
        outline: "#7e7662",
        'outline-variant': "#d0c6af",
        error: "#ba1a1a",
        'on-error': "#ffffff",
        'error-container': "#ffdad6",
        'on-error-container': "#93000a",
      },
      fontFamily: {
        headline: ['Noto Serif', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        label: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-3deg)' },
        }
      },
      animation: {
        'bounce-slow': 'bounce-slow 3.2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
