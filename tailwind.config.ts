import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/commonClasses.ts",
  ],
  theme: {
    extend: {
      colors: {
        turqoise: "#8BCED1",
        "black-2": "#141414",
        "black-3": "#0A0403",
        orange: "#FF8600",
        red: "#FF4444",
        green: "#00A01A",
        grey: "#666666",
      },
      fontSize: {
        "2xs": "0.5rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        nunito: ["var(--font-nunito)"],
        permanentMarker: ["var(--font-permanentMarker)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
export default config;
