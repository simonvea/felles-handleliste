module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/**/*.svelte', './public/*.html'],
  theme: {
    extend: {
      scale: {
        '200': '2',
      },
    },
  },
  variants: {},
  plugins: [],
};
