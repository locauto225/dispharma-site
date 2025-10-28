// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  // Passe à "class" si tu veux un toggle clair/sombre plus tard
  darkMode: "media",

  // IMPORTANT : chemins à scanner par Tailwind
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        // Variables CSS mappées (utilisables via bg-background, text-foreground…)
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        // Couleur de marque Dispharma (orange)
        brand: {
          DEFAULT: "#ea580c",
          500: "#ea580c",
          600: "#dc4b0d",
          700: "#c2410c",
        },

        // Secondaire (bleu pro)
        secondary: {
          DEFAULT: "#2563eb",
          600: "#1e40af",
        },

        // ⚠️ Garde ta palette neutral custom (tu l’utilises dans page.tsx)
        neutral: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          400: "#a3a3a3",
          600: "#525252",
          800: "#262626",
          900: "#171717",
        },

        // Thème sombre bleu premium
        app: "#0b1f3a",          // fond sections en dark (bg-app)
        card: "#0f274a",         // fond cartes en dark (bg-card)
        "app-muted": "#a9b7d0",  // texte secondaire en dark
        "border-app": "#13325c", // bordures en dark
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },

      boxShadow: {
        card: "0 10px 30px -10px rgba(0,0,0,0.12)",
      },

      borderRadius: {
        xl: "1rem",
      },

      // ✅ Tokens pour éviter z-[...] et h-[22rem] dans ton code
      zIndex: {
        1: "1",
        100: "100",
      },
      height: {
        88: "22rem",
      },
    },
  },
  plugins: [],
} satisfies Config;