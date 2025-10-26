import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// ⚠️ À ajuster en prod : remplace l'URL par ton domaine final
const SITE_URL = new URL("https://www.dispharma.ci");

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Dispharma — Chaîne pharmaceutique intégrée",
    template: "%s — Dispharma",
  },
  description:
    "Dispharma relie laboratoires, entrepôts/distributeurs et grossistes/pharmacies : traçabilité des lots, conformité et logistique pharmaceutique.",
  keywords: [
    "dispharma",
    "distribution pharmaceutique",
    "grossiste",
    "laboratoire",
    "entrepôt",
    "traçabilité",
    "Côte d'Ivoire",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Dispharma — Chaîne pharmaceutique intégrée",
    description:
      "Dispharma relie laboratoires, entrepôts/distributeurs et grossistes/pharmacies : traçabilité des lots, conformité et logistique pharmaceutique.",
    siteName: "Dispharma",
    locale: "fr_FR",
    images: [
      {
        url: "/og/dispharma-og.jpg", // place cette image dans /public/og/
        width: 1200,
        height: 630,
        alt: "Dispharma — logistique pharmaceutique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dispharma — Chaîne pharmaceutique intégrée",
    description:
      "Traçabilité, conformité et logistique pharmaceutique : laboratoires, entrepôts/distributeurs, grossistes/pharmacies.",
    images: ["/og/dispharma-og.jpg"],
  },
  manifest: "/site.webmanifest",
  category: "business",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ea580c" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2545" }
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-app text-app`}>
        {/* Lien d'évitement pour l'accessibilité (navigations clavier/lecteurs d'écran) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
