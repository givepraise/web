/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'screen-content': 'calc(100vh - 176px)',
      },
      colors: {
        themecolor: {
          1: '#FF33A7',
          2: '#FF0A95',
          3: '#E1007F',
          4: '#B80068',
          5: '#8F0051',
        },
        'themecolor-alt': {
          1: '#564148',
          2: '#BDA5AC',
          3: '#946F00',
          4: '#D0A200',
        },
      },
    },
    fontFamily: {
      sans: ['HelveticaNeue'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
