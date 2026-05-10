/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "480px",
        tablet: "780px",
        laptop: "1024px",
      },
    },
  },
  plugins: [],
};
