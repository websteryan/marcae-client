import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: "class", // Permite alternar temas com base na classe 'dark'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Usando variáveis definidas no CSS
        foreground: "var(--foreground)",
        "muted-foreground": "var(--muted-foreground)",
        light: "var(--light)",
        card: "var(--card)",
        border: "var(--border)",
      },
    },
  },
  plugins: [nextui()], // Plugin NextUI para garantir que as classes NextUI funcionem
};

export default config;
