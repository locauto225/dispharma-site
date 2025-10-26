"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";

/**
 * Thèmes disponibles :
 *  - "pearlBar"        : header clair + fine barre d’accent (dégradé)
 *  - "elevated"        : header carte surélevée (ombre + bords arrondis)
 *  - "divider"         : double hairline contrastée (pro, discret)
 *  - "elevatedAccent"  : carte surélevée + liseré marque (combo)
 *  - "glassPremium"    : effet glace premium (blur + opacité contrôlée), lisible partout
 */
const THEME:
  | "pearlBar"
  | "elevated"
  | "divider"
  | "elevatedAccent"
  | "glassPremium" = "glassPremium";

const THEMES = {
  pearlBar: {
    atTop:
      "relative bg-neutral-50/90 text-neutral-900 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm",
    scrolled:
      "relative bg-neutral-100 text-neutral-900 shadow-sm border-b border-neutral-300",
    link: "header-link",
    underline: "after:bg-gradient-to-r after:from-orange-500 after:to-orange-700",
    logoHalo:
      "drop-shadow(0 0 0.5px rgba(0,0,0,.2)) drop-shadow(0 1px 2px rgba(0,0,0,.05))",
    accentBar:
      "absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#0a285f] via-[#0a285f] to-orange-500 opacity-90",
    containerExtra: "",
  },
  elevated: {
    atTop:
      "relative bg-white/92 text-neutral-900 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm",
    scrolled:
      "relative bg-white text-neutral-900 shadow-md border border-neutral-200/80",
    link: "header-link",
    underline: "after:bg-gradient-to-r after:from-orange-500 after:to-orange-700",
    logoHalo:
      "drop-shadow(0 0 0.5px rgba(0,0,0,.25)) drop-shadow(0 2px 4px rgba(0,0,0,.06))",
    accentBar: "",
    containerExtra:
      "md:rounded-b-2xl md:mx-2 md:mt-1 md:border md:border-neutral-200/60",
  },
  divider: {
    atTop:
      "relative bg-white/95 text-neutral-900 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm",
    scrolled: "relative bg-white text-neutral-900 shadow-sm",
    link: "header-link",
    underline: "after:bg-gradient-to-r after:from-orange-500 after:to-orange-700",
    logoHalo: "drop-shadow(0 0 0.5px rgba(0,0,0,.2))",
    accentBar:
      "absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-b from-neutral-200 to-neutral-100 after:content-[''] after:absolute after:inset-x-0 after:-bottom-[3px] after:h-[1px] after:bg-neutral-200/70",
    containerExtra: "",
  },
  elevatedAccent: {
    atTop:
      "relative bg-white/92 text-neutral-900 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm",
    scrolled:
      "relative bg-white text-neutral-900 shadow-md border border-neutral-200/80",
    link: "header-link",
    underline: "after:bg-gradient-to-r after:from-orange-500 after:to-orange-700",
    logoHalo:
      "drop-shadow(0 0 0.5px rgba(0,0,0,.25)) drop-shadow(0 2px 4px rgba(0,0,0,.06))",
    accentBar:
      "absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#0a285f] via-[#0a285f] to-orange-500 opacity-95",
    containerExtra:
      "md:rounded-b-2xl md:mx-2 md:mt-1 md:border md:border-neutral-200/60",
  },
  glassPremium: {
    // Lisible partout, ne perturbe pas les textes du body (fond semi-opaque + blur)
    atTop:
      "relative text-neutral-900/95 bg-white/60 supports-[backdrop-filter]:bg-white/45 supports-[backdrop-filter]:backdrop-blur-md border-b border-white/40 shadow-[0_2px_12px_rgba(10,40,95,.06)] dark:text-white/95 dark:bg-[#0b1f3a]/70 supports-[backdrop-filter]:dark:bg-[#0b1f3a]/55 dark:border-b dark:border-white/10",
    scrolled:
      "relative text-neutral-900 bg-white/78 supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-lg border-b border-white/50 shadow-[0_4px_18px_rgba(10,40,95,.08)] dark:text-white dark:bg-[#0b1f3a]/85 supports-[backdrop-filter]:dark:bg-[#0b1f3a]/70 dark:border-b dark:border-white/10",
    link: "header-link",
    underline: "after:bg-gradient-to-r after:from-orange-500 after:to-orange-700",
    logoHalo:
      "drop-shadow(0 0 0.5px rgba(0,0,0,.25)) drop-shadow(0 2px 4px rgba(0,0,0,.06))",
    accentBar: "",
    containerExtra:
      "md:mx-2 md:mt-1 md:rounded-b-2xl md:border md:border-white/30",
  },
} as const;

const ShimmerStyles = () => (
  <style jsx global>{`
    @keyframes headerAccentShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .accent-shimmer {
      background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.35) 50%, rgba(255,255,255,0) 100%);
      background-size: 200% 100%;
      animation: headerAccentShimmer 6s linear infinite;
      opacity: .35;
      pointer-events: none;
    }
  `}</style>
);

const GlassStyles = () => (
  <style jsx global>{`
    .glass-edge:before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: 0 0 1rem 1rem;
      background: linear-gradient(180deg, rgba(255,255,255,.35), rgba(255,255,255,0) 28%);
    }
    @supports not (backdrop-filter: blur(1px)) {
      .glass-fallback { background-color: rgba(255,255,255,.92) !important; }
    }
  `}</style>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const T = THEMES[THEME];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // Ensure first client render matches SSR (atTop), then update
    onScroll();
    setReady(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/partenaires", label: "Pourquoi devenir partenaire" },
    { href: "/laboratoires", label: "Laboratoires" },
    { href: "/grossistes", label: "Grossistes" },
    { href: "/a-propos", label: "À propos" },
    { href: "/actualites", label: "Actualités" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300 supports-[backdrop-filter]:backdrop-saturate-150",
        (ready && scrolled) ? T.scrolled : T.atTop,
        "glass-fallback",
      ].join(" ")}
    >
      <ShimmerStyles />
      <GlassStyles />

      {/* Liseré marque (si défini par le thème) */}
      {T.accentBar ? (
        <div className="relative" aria-hidden>
          <div className={T.accentBar} />
          <div className="absolute inset-x-0 bottom-0 h-[3px] accent-shimmer" />
        </div>
      ) : null}

      <nav
        className={[
          "mx-auto max-w-7xl px-4 md:px-6 transition-all duration-300",
          scrolled ? "py-4" : "py-3",
          T.containerExtra,
          "relative glass-edge",
        ].join(" ")}
        aria-label="Navigation principale"
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-xl cursor-pointer justify-self-start"
            aria-label="Accueil Dispharma"
          >
            <Image
              src="/logos/dispharma.webp"
              alt="Dispharma"
              width={168}
              height={56}
              priority
              className="h-12 md:h-14 w-auto block select-none cursor-pointer [image-rendering:auto]"
              style={{ filter: T.logoHalo }}
            />
          </Link>

          {/* MENU DESKTOP CENTRÉ */}
          <ul className="hidden md:flex items-center justify-center gap-5 text-sm font-medium justify-self-center">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              const linkColor = T.link;
              const underline = T.underline;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "relative inline-block px-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm",
                      linkColor,
                      "after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0",
                      underline,
                      "after:transition-all after:duration-300 hover:after:w-full focus:after:w-full",
                      isActive ? "font-semibold after:w-full" : "",
                    ].join(" ")}
                    {...(isActive ? { "aria-current": "page" } : {})}
                    prefetch
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ACTIONS DROITE */}
          <div className="flex items-center gap-2 justify-self-end">
            {/* HAMBURGER MOBILE */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden inline-flex items-center justify-center rounded-md p-3 header-link hover:bg-neutral-100 dark:hover:bg-white/10 active:bg-neutral-200 dark:active:bg-white/15 transition"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* CTA DESKTOP */}
            <Link href="/extranet" prefetch className="hidden md:block">
              <Button className="header-cta shadow-sm hover:shadow transition-shadow hover:scale-[1.01] duration-150">
                Accès Extranet
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE SLIDE-IN */}
      <MobileMenu
        id="mobile-menu"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={navItems}
      />
    </header>
  );
}