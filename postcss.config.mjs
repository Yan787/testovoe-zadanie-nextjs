const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#ff2d92",
          lime: "#a6ff00",
          cyan: "#00e5ff",
          purple: "#9b5cff",
          orange: "#ff6a00",
          blue: "#1e6eff",
          red: "#ff1744",
          green: "#00c853",
          yellow: "#ffd600",
          black: "#0a0a0a",
          white: "#f8f8f8",
        },
        gray: {
          300: "#d9dae8",
          500: "#999AA5",
          600: "#66676E",
          700: "#39393f",
          800: "#242529",
          900: "#191B1F",
          950: "#101215",
        },
      },
    },
  },
};
export default config;
