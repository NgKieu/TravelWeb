module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html", // Css có hiệu lực ở những file này
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "Sans-serif"],
    },
  },
  plugins: [],
};
