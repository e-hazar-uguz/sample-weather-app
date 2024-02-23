module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
    animation: {
      tilt: 'tilt 10s infinite linear',
    },
    keyframes: {
      tilt: {
        '0%, 50%, 100%': {
          transform: 'rotate(0deg)',
        },
        '25%': {
          transform: 'rotate(0.5deg)',
        },
        '75%': {
          transform: 'rotate(-0.5deg)',
        },
      },
    },
  },
  plugins: [],
};