/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#2c2c2c",
        "black-200": "rgb(0,0,0,0.2)",
        divider: "rgb(218,225,231)",
        success: "rgb(40, 199, 111)",
        danger: "rgb(234, 84, 85)",
      },
      spacing: {
        260: "260px",
        "10px": "10px",
      },
      backgroundImage: {
        login: "url('./assets/images/background.jpg')",
      },
    },
  },
  plugins: [],
};
