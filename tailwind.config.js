/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').postcss} */

const t = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {},
    colors: {
      mg:{
        50: '#F2F2F2',
        100: '#E6F5F0',
        200: '#C0E8D9',
        300: '#9ADBC2',
        400: '#02c3bd',
        500: '#00B9AE',
        600: '#02C3BD',
        700: '#009F93',
        800: '#037171',
        900: '#03312E',
      },
      mr:{
        100: '#fc9ca2',
        200: '#fb747d',
        300: '#fa4c58',
        400: '#f92432',
        500: '#e30613',
        600: '#c70512',
        700: '#9f040e',
        800: '#77030b',
        900: '#500207',
      },
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      chrome: {
        bg: '#222222',
      },
      ...t,
      green: {
        50: '#ECFDF5',
        100: '#D8F3DC',
        200: '#B7E4C7',
        300: '#95D5B2',
        400: '#74C69D',
        500: '#52B788',
        600: '#40916C',
        700: '#2D6A4F',
        800: '#1B4332',
        900: '#081C15',
        950: '#081C15',
      }
    }
  },
  plugins: [],
}

