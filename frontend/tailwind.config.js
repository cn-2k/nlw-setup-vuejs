module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090A',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};
