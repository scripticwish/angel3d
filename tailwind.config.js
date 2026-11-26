/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        glacial: '#F7F9FC',
        paper: '#F4F6FA',
        ink: '#0E1116',
        cobalt: '#2563EB',
        'cobalt-deep': '#1D4ED8',
        'ice-wash': '#EBF2FF',
        'slate-muted': '#5B6475',
      },
      fontFamily: {
        display: ['"Oswald"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
