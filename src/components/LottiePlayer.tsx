"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";

// Chargement dynamique pour alléger le bundle
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Type minimal pour les JSON Lottie (structure arbitraire)
type LottieJSON = Record<string, unknown>;

type NextData = {
  __NEXT_DATA__?: {
    assetPrefix?: string;
    nextExport?: boolean;
  };
};

// MediaQueryList compat (anciens Safari)
type MQCompat = MediaQueryList & {
  addListener?: (listener: (ev: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (ev: MediaQueryListEvent) => void) => void;
};

export type LottiePlayerProps = {
  src: string; // chemin vers /public/animations/*.json
  loop?: boolean;
  className?: string; // s'applique au conteneur (100% taille par défaut à l'intérieur)
  speed?: number; // vitesse de lecture (1 = normal)
  playOnView?: boolean; // joue uniquement quand visible (par défaut true)
  threshold?: number; // seuil de visibilité (0..1) pour déclencher la lecture
  hoverPause?: boolean; // pause au survol (par défaut false)
  ariaLabel?: string; // si non décoratif, fournir un libellé

  /** Fallback visuel : s'affiche pendant le chargement ou si prefers-reduced-motion */
  posterSrc?: string; // ex. "/animations/poster.webp"
  posterAlt?: string; // description du poster (utile si ariaLabel est fourni)
};

export default function LottiePlayer({
  src,
  loop = true,
  className,
  speed,
  playOnView = true,
  threshold = 0.25,
  hoverPause = false,
  ariaLabel,

  posterSrc,
  posterAlt,
}: LottiePlayerProps) {
  const [data, setData] = useState<LottieJSON | null>(null);
  const [reduce, setReduce] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(!playOnView); // si playOnView=false, on joue direct

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper basePath/assetPrefix safe (Next.js)
  const nextGlobal = globalThis as unknown as NextData;
  const assetPrefix = nextGlobal.__NEXT_DATA__?.assetPrefix ?? (nextGlobal.__NEXT_DATA__?.nextExport ? "" : "");

  // Accessibilité: respecter la préférence "réduire les animations"
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)") as MQCompat;
    setReduce(m.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    // compat anciens Safari
    if (m.addEventListener) m.addEventListener("change", handler);
    else m.addListener?.(handler);
    return () => {
      if (m.removeEventListener) m.removeEventListener("change", handler);
      else m.removeListener?.(handler);
    };
  }, []);

  // Chargement du JSON avec AbortController (évite les fuites si src change vite)
  useEffect(() => {
    const ctrl = new AbortController();
    setData(null);

    // Inline l'URL pour éviter de capturer une fonction et corriger les deps
    const url = src ? (src.startsWith("/") ? `${assetPrefix}${src}` : src) : undefined;
    if (!url) return () => ctrl.abort();

    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json: unknown) => setData((json as LottieJSON) ?? null))
      .catch((err: unknown) => {
        // Ignore AbortError proprement
        if (err instanceof DOMException && err.name === "AbortError") return;
        // Sinon log soft
        console.warn("LottiePlayer: échec de chargement", err);
      });
    return () => ctrl.abort();
  }, [src, assetPrefix]);

  // IntersectionObserver: play/pause selon la visibilité
  useEffect(() => {
    if (!playOnView || !containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playOnView, threshold]);

  // Appliquer la vitesse et contrôler lecture/pause
  useEffect(() => {
    const api = lottieRef.current;
    if (!api) return;

    // vitesse
    if (typeof speed === "number" && !Number.isNaN(speed)) {
      api.setSpeed(speed);
    }

    // lecture/pause selon visibilité & accessibilité
    if (reduce) {
      api.pause();
      return;
    }
    if (playOnView) {
      if (inView) api.play();
      else api.pause();
    } else {
      api.play();
    }
  }, [data, speed, inView, playOnView, reduce]);

  // Poster (fallback) si pas de data ou si prefers-reduced-motion
  const posterUrl = posterSrc ? (posterSrc.startsWith("/") ? `${assetPrefix}${posterSrc}` : posterSrc) : undefined;
  if (!data || reduce) {
    if (!posterUrl) return null;
    return (
      <div
        ref={containerRef}
        className={className ?? "w-full h-full"}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
      >
        <Image
          src={posterUrl}
          alt={posterAlt || ""}
          width={1600}
          height={900}
          sizes="100vw"
          className="w-full h-full object-contain"
          priority={false}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className ?? "w-full h-full"}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      onMouseEnter={() => {
        if (hoverPause && lottieRef.current) lottieRef.current.pause();
      }}
      onMouseLeave={() => {
        if (hoverPause && lottieRef.current && (!playOnView || inView)) lottieRef.current.play();
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={data}
        loop={loop}
        autoplay={!playOnView} // si on contrôle via inView, on laisse à false
        className="w-full h-full"
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}