// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui"],
        display: ['"Anton Variable"', "Impact", "sans-serif"],
      },
      boxShadow: { smooth: "0 10px 30px rgba(0,0,0,.08)" },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
    },
  },
  plugins: [],
} satisfies Config;
