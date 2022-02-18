module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif'],
    },
    extend: {
      transitionProperty: {
        note: 'border-radius, background-color, color',
        rounded: 'border-radius',
      },
    },
  },
  plugins: [],
};
