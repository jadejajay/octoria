const colors = require('./src/ui/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        varela: ['VarelaRound-Regular'],
        kalam: ['Kalam-Regular'],
        aquire: ['Aquire'],
        gobold: ['Gobold-Regular'],
        monumentextended: ['MonumentExtended-Regular'],
        poppins: ['Poppins-Regular'],
      },
      colors,
    },
  },
  plugins: [],
};
