"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useId } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

type Item = { href: string; label: string };

export default function MobileMenu({
  id,
  open,
  onClose,
  items,
}: {
  id?: string;
  open: boolean;
  onClose: () => void;
  items: Item[];
}) {
  const pathname = usePathname();

  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Evite tout accès au DOM côté serveur
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fermer au changement de route
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ESC + lock scroll pendant l’ouverture + gestion focus trap et inert
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    if (open) {
      // mémorise l'élément ayant le focus avant ouverture
      prevFocusRef.current = (document.activeElement as HTMLElement) ?? null;

      // bloque le scroll du document
      document.documentElement.style.overflow = "hidden";

      // rend le fond inerte
      document.getElementById("__next")?.setAttribute("inert", "");

      // focus premier élément focusable du panneau
      const firstFocusable =
        panelRef.current?.querySelector<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])');
      firstFocusable?.focus();

      // focus trap (Tab/Shift+Tab)
      const onTrap = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !panelRef.current) return;
        const els = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])')
        ).filter(el => !el.hasAttribute("disabled"));
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      };

      window.addEventListener("keydown", onKey);
      window.addEventListener("keydown", onTrap);

      return () => {
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("keydown", onTrap);
      };
    } else {
      // restauration
      document.documentElement.style.overflow = "";
      document.getElementById("__next")?.removeAttribute("inert");
      // rend le focus à l'élément d'origine
      prevFocusRef.current?.focus?.();
    }

    // clean au démontage
    return () => {
      document.documentElement.style.overflow = "";
      document.getElementById("__next")?.removeAttribute("inert");
    };
  }, [open, onClose]);

  // Ne rend rien côté serveur / avant montage pour éviter "document is not defined"
  if (!mounted) return null;
  const portalTarget = typeof window !== "undefined" ? document.body : null;
  if (!portalTarget) return null;

  // -------- PORTAL dans <body> pour sortir de tous les stacking contexts -----
  return createPortal(
    <div
      aria-hidden={!open}
      className={[
        // Wrapper plein écran FIXED avec z-index très haut
        "fixed inset-0 md:hidden z-[1000]",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      {/* Overlay sombre */}
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={onClose}
        className={[
          "fixed inset-0 z-[1000] bg-black/60 backdrop-blur-[2px] transition-opacity",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Panneau glissant au-dessus de tout */}
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
        ref={panelRef}
        aria-labelledby={titleId}
        tabIndex={-1}
        className={[
          "fixed inset-y-0 right-0 w-[88%] max-w-[420px] z-[1001]",
          "bg-[#0b2545] text-white shadow-2xl border-l border-white/10",
          "transition-transform duration-300 will-change-transform",
          open ? "translate-x-0" : "translate-x-full",
          "flex flex-col overflow-y-auto",
        ].join(" ")}
      >
        <h2 id={titleId} className="sr-only">Menu principal</h2>
        {/* En-tête (safe-area iOS) */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-white/10"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        >
          <span className="text-sm font-medium text-white/85">Menu</span>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-white/85 hover:bg-white/10 active:bg-white/15 transition"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Liens */}
        <nav className="px-2 py-2">
          <ul className="space-y-1">
            {items.map((it) => {
              const active =
                pathname === it.href ||
                (it.href !== "/" && pathname.startsWith(it.href));
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className={[
                      "block rounded-lg px-3 py-3 text-[15px] font-medium",
                      active
                        ? "text-white"
                        : "text-white/90 hover:bg-white/10",
                    ].join(" ")}
                    style={active ? { backgroundColor: "rgba(255,255,255,0.12)" } : undefined}
                  >
                    {it.href === "/partenaires" ? "Pourquoi devenir partenaire" : it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA bas (safe-area) */}
        <div
          className="mt-auto p-4 border-t border-white/10"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
        >
          <Link
            href="/extranet"
            className="inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-4 py-3 text-white font-medium hover:bg-orange-700 transition"
          >
            Accès Extranet
          </Link>
        </div>
      </div>
    </div>,
    portalTarget
  );
}