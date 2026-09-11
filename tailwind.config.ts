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
        brand: {
          navy: "#0A1D37",
          dark: "#0F284B",
          primary: "#0284C7",
          primaryLight: "#38BDF8",
          primaryDark: "#0369A1",
          emerald: "#10B981",
          whatsapp: "#25D366",
          whatsappDark: "#128C7E",
          gold: "#D97706",
          goldLight: "#FDE68A",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          textMain: "#0F172A",
          textMuted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "'Vazirmatn'", "'Alan Sans'", "sans-serif"],
        vazirmatn: ["var(--font-vazirmatn)", "'Vazirmatn'", "'Alan Sans'", "sans-serif"],
        heading: ["var(--font-vazirmatn)", "'Vazirmatn'", "'Alan Sans'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(2, 132, 199, 0.25)",
        card: "0 10px 30px -5px rgba(10, 29, 55, 0.05)",
        cardHover: "0 20px 35px -5px rgba(10, 29, 55, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
