// tailwind.config.js
export default {
  content: ["./registry/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["GeistPixel", "monospace"],
      },
    },
  },
};