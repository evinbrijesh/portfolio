/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#0E0E0E',
        'surface-low': '#131313',
        'surface-mid': '#191A1A',
        'surface-high': '#252626',
        'surface-bright': '#2C2C2C',
        'text-primary': '#C6C7C5',
        'text-muted': '#767676',
        'text-dim': '#484848',
        'accent-green': '#76AA83',
        'amber': '#FFB000',
        'bezel-charcoal': '#1A1A1A',
        'screen-bg': '#0A0A08',
      },
      fontFamily: {
        'headline': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'DEFAULT': '0.125rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        '2xl': '1rem',
        '3xl': '2rem',
        'bezel': '3rem',
      },
    },
  },
  plugins: [],
}