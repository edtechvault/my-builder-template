/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx,html}'],
  theme: { extend: {} },
  plugins: [require('daisyui')],
  daisyui: { themes: ['light', 'dark'] }, // built-in themes only
};
