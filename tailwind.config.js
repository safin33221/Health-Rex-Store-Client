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
        "neutral": "#006775f2",   // Muted Blue
        "base-100": "#ffffff",  // Pure White
        "base-200": "#f9fafb" ,  // Off White / Light Gray
        "base-300": "#d1d5db",
        "--rounded-btn": "1.9rem",
      },
      forest: {
        ...require("daisyui/src/theming/themes")["forest"],
        "primary": "#ffffff",      // Forest Green
        "secondary": "#2E8B57",    // Sea Green
        "accent": "#A2C579",       // Soft Green
        "neutral": "#006775f2",      // Dark Green
        // "base-100": "#f1f5f9",     // Light Background
        "info": "#7FDBFF",         // Sky Blue
        "success": "#3CB371",      // Medium Sea Green
        "warning": "#F4A261",      // Sandy Orange
        "error": "#E63946",        // Soft Red
      },
    },
    ]
  },
  plugins: [
    require('daisyui'),
  ],
}


