module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          light: '#f7fafc',
          DEFAULT: '#a0aec0',
          dark: '#4a5568',
        },
        blue: {
          light: '#ebf8ff',
          DEFAULT: '#4299e1',
          dark: '#2b6cb0',
        },
        red: {
          light: '#fed7d7',
          DEFAULT: '#f56565',
          dark: '#c53030',
        },
        green: {
          light: '#f0fff4',
          DEFAULT: '#48bb78',
          dark: '#2f855a',
        },
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
