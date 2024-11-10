/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1a1a1a", // เพิ่มสี custom ตามต้องการ
        "dark-2": "#2a2a2a",
      },
    },
  },
  plugins: [],
};
