/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,html}",
    "./components/**/*.{ts,tsx,js,jsx,html}",
  ],
  plugins: [require("daisyui")],
  daisyui: { themes: ["light", "dark"] },
};
