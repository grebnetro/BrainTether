/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          bg: {
            dark: '#0f141c',
            light: '#f4f6f9',
          },
          surface: {
            dark: '#171e29',
            light: '#ffffff',
          },
          border: {
            dark: '#273244',
            light: '#e2e8f0',
          },
          card: {
            dark: '#1d2636',
            light: '#f8fafc',
          },
          accent: {
            teal: '#14b8a6',
            emerald: '#10b981',
            violet: '#8b5cf6',
            amber: '#f59e0b',
            rose: '#f43f5e',
            sky: '#0284c7',
          }
        },
        stress: {
          low: '#10b981',     // 1-3 Calm Green
          mid: '#f59e0b',     // 4-6 Caution Yellow/Amber
          high: '#ef4444',    // 7-8 High Avoidance Red
          severe: '#dc2626',  // 9-10 Intense Avoidance Crimson
        }
      },
      boxShadow: {
        'zen-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.25)',
        'zen-md': '0 4px 16px -4px rgba(0, 0, 0, 0.35)',
        'stress-glow-low': '0 0 12px -2px rgba(16, 185, 129, 0.3)',
        'stress-glow-mid': '0 0 12px -2px rgba(245, 158, 11, 0.35)',
        'stress-glow-high': '0 0 16px -1px rgba(239, 68, 68, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
}
