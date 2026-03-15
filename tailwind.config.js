/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        mobile: "480px",
        landscape: "628px",
        tablet: "768px",
        desktop: "1024px",
        wide: "1200px",
      },
      colors: {
        background: "#000000",
        surface: "#27272a",
        primary: "#3b82f6",
        secondary: "#94a3b8",
        accent: "#facc15",
        border: "#1f2937",
        text: "#e5e7eb",
        "text-muted": "#94a3b8",
      },
    },
  },
  plugins: [],
};
