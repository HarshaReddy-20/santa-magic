import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        forest: {
          950: "#05140c",
          900: "#092215",
          850: "#0e301f",
          800: "#14422b",
          700: "#1c5b3c",
          600: "#277a52",
        },
        crimson: {
          950: "#450a0a",
          900: "#600c0c",
          800: "#881313",
          700: "#aa1b1b",
          600: "#c72828",
          500: "#dc3535",
        },
        gold: {
          900: "#5c4106",
          800: "#805c0c",
          700: "#a97c15",
          600: "#cda02a",
          500: "#e6b83f",
          400: "#f3cd68",
          300: "#fae092",
          200: "#fdf0be",
          100: "#fff9e5",
        },
        parchment: {
          50: "#fdfbf7",
          100: "#f9f4e8",
          200: "#f3e8cc",
          300: "#ebd8ac",
          400: "#e2c589",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "'Times New Roman'", "Times", "serif"],
        festive: ["'Playfair Display'", "Georgia", "serif"],
        cinzel: ["'Cinzel'", "Georgia", "serif"],
        script: ["'Caveat'", "'Dancing Script'", "'Brush Script MT'", "cursive"],
      },
      animation: {
        "snow-fall": "snowFall 12s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2.5s ease-in-out infinite alternate",
      },
      keyframes: {
        snowFall: {
          "0%": { transform: "translateY(-10px) translateX(0)" },
          "50%": { transform: "translateY(50vh) translateX(15px)" },
          "100%": { transform: "translateY(100vh) translateX(-15px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 10px rgba(230, 184, 63, 0.3))" },
          "100%": { filter: "drop-shadow(0 0 25px rgba(230, 184, 63, 0.8))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
