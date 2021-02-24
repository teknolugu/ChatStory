const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-gray': colors.blueGray,
        primary: '#3B82F6',
        'light-blue': colors.lightBlue,
        orang: colors.orange,
        cyan: colors.cyan,
        rose: colors.rose,
        orange: colors.orange,
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
