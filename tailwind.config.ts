import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'phone': "url('./img/stable.svg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white:"#ffffff",
        slate:"#252736",
        tropicalRainForest:"#158167"
      },
    },
  },
  plugins: [],
};
export default config;
