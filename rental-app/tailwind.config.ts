import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#04BBAF",
        secondary: "#00D9E1",
        accent: "#00FFEE",
        success: "#006962",
        background: "#E1FFFD",
        warning: "#88FAF2",
        dark: "#011311",
      },
    },
  },
  plugins: [],
};
export default config;
