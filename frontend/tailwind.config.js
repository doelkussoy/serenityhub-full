/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-modern": "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)", // Light blue modern gradient
        "gradient-login": "linear-gradient(135deg, #f0f9ff 0%, #cffafe 100%)",
      },
      colors: {
        "glass-border": "rgba(255, 255, 255, 0.5)",
        "glass-bg": "rgba(255, 255, 255, 0.7)",
        primary: { 
          "50": "#f0f9ff", 
          "100": "#e0f2fe", 
          "200": "#bae6fd", 
          "300": "#7dd3fc", 
          "400": "#38bdf8", 
          "500": "#0ea5e9", // Modern blue primary
          "600": "#0284c7", 
          "700": "#0369a1", 
          "800": "#075985", 
          "900": "#0c4a6e", 
          "950": "#082f49" 
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.05)',
      }
    },
  },
  plugins: [],
};
