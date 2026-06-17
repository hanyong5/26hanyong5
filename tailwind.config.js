/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#010102',
        surface: {
          1: '#1a1b1e',
          2: '#222327',
          3: '#2a2b30',
          4: '#333438',
        },
        primary: {
          DEFAULT: '#5e6ad2',
          hover: '#828fff',
          focus: '#5e69d1',
        },
        hairline: {
          DEFAULT: '#23252a',
          strong: '#2e3035',
          tertiary: '#1e2024',
        },
        ink: {
          DEFAULT: '#f7f8f8',
          muted: '#d0d6e0',
          subtle: '#8a8f98',
          tertiary: '#62666d',
        },
        success: '#27a644',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        'display-xl': '-3px',
        'display-lg': '-1.8px',
        'display-md': '-1px',
        'headline': '-0.6px',
        'card-title': '-0.4px',
        'subhead': '-0.2px',
        'body-lg': '-0.1px',
        'body': '-0.05px',
        'eyebrow': '0.4px',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
}
