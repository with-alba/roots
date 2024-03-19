import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        inverted: "var(--text-inverted)",
        placeholder: "var(--text-placeholder)",
      },
      backgroundColor: {
        button: {
          primary: "var(--bg-button-primary)",
          "primary-hover": "var(--bg-button-primary-hover)",
          secondary: "var(--bg-button-secondary)",
          special: "var(--bg-button-special)",
        },
        "form-element": {
          DEFAULT: "var(--bg-form-element)",
          hover: "var(--bg-form-element-hover)",
          active: "var(--bg-form-element-active)",
        },
        overlay: "var(--bg-overlay)",
      },
      boxShadow: {
        "button-secondary": "var(--effect-button-secondary)",
        "button-secondary-hover": "var(--effect-button-secondary-hover)",
        "button-special": "var(--effect-button-special)",
        checkbox: "var(--effect-checkbox)",
      },
      keyframes: {
        changeColor: {
          "0%": {},
          "50%": { backgroundColor: "#A1A1AA" },
          "100%": {},
        },
        loader: {
          "93.75%,100%": { r: "3px" },
          "46.875%": { r: ".2px" },
        },
      },
      animation: {
        loading: "changeColor 500ms infinite",
        loader: "loader .8s linear infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
