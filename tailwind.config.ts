// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  // Si tu prévois un toggle clair/sombre plus tard, passe à: darkMode: "class"
  darkMode: "media",
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

        // Secondaire (bleu pro) pour CTA alternatifs, liens, accents
        secondary: {
          DEFAULT: "#2563eb",
          600: "#1e40af",
        },

        // Palette neutral cohérente (texte, bgs, séparateurs)
        neutral: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          400: "#a3a3a3",
          600: "#525252",
          800: "#262626",
          900: "#171717",
        },

        // Thème sombre bleu premium (fond / cartes / texte secondaire / bordures)
        app: "#0b1f3a",            // fond des sections en dark (bg-app)
        card: "#0f274a",           // fond des cartes en dark (bg-card)
        "app-muted": "#a9b7d0",    // texte secondaire en dark (text-app-muted)
        "border-app": "#13325c",   // bordures en dark (border-app)
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },

      boxShadow: {
        // Ombre douce réutilisable pour cartes (cohérente avec le style du site)
        card: "0 10px 30px -10px rgba(0,0,0,0.12)",
      },

      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;