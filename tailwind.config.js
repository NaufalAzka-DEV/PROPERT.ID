/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold:        "#C9A96E",
        "gold-dark": "#A07840",
        navy:        "#0D1B2E",
        "navy-mid":  "#1E3A5F",
        cream:       "#FAF7F2",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        sans:     ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};