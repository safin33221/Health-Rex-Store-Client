/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#070707',
        'background': '#fafcfa',
        'primary': '#5cb75d',
        'secondary': '#99e29a',
        'accent': '#55e557',
      }
    },
  },
  daisyui: {
    themes: ['light']
  },
  plugins: [
    require('daisyui'),
  ],
}


