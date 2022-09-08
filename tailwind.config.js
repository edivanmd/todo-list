  /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        light: "#eee",
        dark: "#342F4E",
        darker: "#262336",
        blue: "#61DAFB",
        crimson: "#DB3052"
      },
      fontFamily: {
        'fira': ['"Fira Sans"', 'sans-serif']
      },
    },
  },
  plugins: [],
}
