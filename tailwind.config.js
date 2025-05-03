/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      pastel: {
        ...require("daisyui/src/theming/themes")["pastel"],
        "color-scheme": "light",
        "primary": "#d1c1d7",   // Light Lavender
        "secondary": "#f6cbd1", // Soft Pink
        "accent": "#b4e9d6",    // Mint Green
        "neutral": "#2E8B57",   // Muted Blue
        "base-100": "#ffffff",  // Pure White
        "base-200": "#f9fafb",  // Off White / Light Gray
        "base-300": "#d1d5db",
        "--rounded-btn": "0rem",
        "--color-btn":'#000000'
      },

      dracula: {
        ...require("daisyui/src/theming/themes")["dracula"],
        "primary": "#ffffff",      // Forest Green
        "secondary": "#2E8B57",    // Sea Green
        "accent": "#A2C579",       // Soft Green
        "neutral": "#2E8B57",      // Dark Green
        // "base-100": "#f1f5f9",     // Light Background
        "info": "#7FDBFF",         // Sky Blue
        "success": "#3CB371",      // Medium Sea Green
        "warning": "#F4A261",      // Sandy Orange
        "error": "#E63946",        // Soft Red
        "--rounded-btn": "0",
        "--color-btn":'#000000'
      },
    },
    ]
  },
  plugins: [
    require('daisyui'),
  ],
}


