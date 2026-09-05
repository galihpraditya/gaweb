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
        palette: {
          bg: "#F9F9F9",
          primary: "#004F72",
          primaryHover: "#003d59",
          navy: "#092734",
          navyLight: "#0e3b4e",
        },
        brand: {
          50: "#f0f7fa",
          100: "#e0eef5",
          200: "#b8dbe9",
          300: "#8ac2da",
          400: "#499fc1",
          500: "#1b7fa7",
          600: "#004F72", // Primary Deep Ocean Blue
          700: "#00415e",
          800: "#00344b",
          900: "#002b3d",
          950: "#092734", // Midnight Navy
        },
        cyanBrand: {
          500: "#0284c7",
          600: "#004F72",
          700: "#092734",
        },
        accentAmber: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        logo: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(15, 23, 42, 0.06)",
        card: "0 10px 35px -8px rgba(15, 23, 42, 0.09)",
        natural: "0 2px 14px rgba(15, 23, 42, 0.06)",
        "glow-teal": "0 0 25px -5px rgba(13, 148, 136, 0.25)",
        "glow-amber": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
      },
      borderRadius: {
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 5s ease-in-out infinite",
        "float-delayed": "float 5s ease-in-out 2.5s infinite",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
