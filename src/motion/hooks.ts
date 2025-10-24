

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * useIsomorphicLayoutEffect
 * — Evite l’avertissement sur le SSR en remplaçant useLayoutEffect par useEffect côté serveur
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * usePrefersReducedMotion
 * — Respecte la préférence système (accessibilité)
 */
export function usePrefersReducedMotion(defaultValue = false) {
  const [reduced, setReduced] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    onChange();
    try {
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    } catch {
      // Safari < 14 fallback
      m.addListener(onChange);
      return () => m.removeListener(onChange);
    }
  }, []);

  return reduced;
}

/**
 * useInViewOnce
 * — Observe un élément et retourne `true` dès qu’il est visible au moins une fois
 *   (puis stoppe l’observation pour économiser les ressources)
 */
export function useInViewOnce<T extends Element>(
  options: IntersectionObserverInit = { root: null, rootMargin: "-10% 0px -10% 0px", threshold: 0.2 }
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return; // déjà visible → ne rien faire
    const node = ref.current;
    if (!node || typeof window === "undefined") return;

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          observer.unobserve(e.target);
        }
      });
    }, options);

    obs.observe(node);
    return () => obs.disconnect();
  }, [inView, options]);

  return [ref, inView];
}

/**
 * useScrollProgress
 * — Progression globale du scroll de la page (0 → 1)
 *   Utile pour une barre de progression discrète ou pour déclencher des effets légers.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const calc = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop || 0;
      const max = (h.scrollHeight || 1) - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      setProgress(p);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(calc);
      }
    };

    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

/**
 * useStagger
 * — Calcule un délai progressif (index * step + base) pour enchaîner proprement les animations
 */
export function useStagger(index: number, step = 0.06, base = 0) {
  return base + index * step;
}

/**
 * useDelayedMount
 * — Monte un état à `true` après N ms (évite le flash des loaders ultra-courts)
 */
export function useDelayedMount(delayMs = 150) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return ready;
}