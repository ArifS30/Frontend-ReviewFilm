import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          
"primary": "#67e8f9",
          
"secondary": "#2dd4bf",
          
"accent": "#86efac",
          
"neutral": "#881337",
          
"base-100": "#ffffff",
          
"info": "#0ea5e9",
          
"success": "#00ff00",
          
"warning": "#f59e0b",
          
"error": "#f43f5e",
          },
        },
      ],
    },
}

