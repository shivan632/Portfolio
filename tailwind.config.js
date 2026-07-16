/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          glow: '#10b981', // Smooth Emerald-500
          accent: '#6366f1', // Smooth Indigo-500
          dark: '#0b0f19', // Deep Obsidian Black
          cardDark: '#161e2e', // Deep Navy Slate card dark
          cardLight: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow 3s infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      }
    },
  },
  plugins: [],
}
