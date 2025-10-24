"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";
import clsx from "clsx";

type From = { opacity?: number; y?: number; scale?: number };

type Props = PropsWithChildren<{
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  /** Active explicitement l’animation (par défaut: désactivée pour un rendu soft) */
  enabled?: boolean;
  /** État de départ visuel (défaut : { opacity:0, y:8, scale:0.99 }) */
  from?: From;
  /** Durée de l’animation en secondes (défaut : 0.5s) */
  duration?: number;
}>;

/**
 * AnimatedInView v2
 * - No-op par défaut (enabled=false) pour éviter l’hydratation inutile quand on ne souhaite pas d’animation.
 * - Quand enabled=true : applique un style initial (opacity/translate/scale) puis anime vers l’état final dès l’entrée dans le viewport.
 * - Respecte prefers-reduced-motion : désactive l’animation et supprime les transitions.
 * - SSR-safe : initial={false} évite le flash à l’hydratation.
 */
export default function AnimatedInView({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.2,
  enabled = false,
  from = { opacity: 0, y: 8, scale: 0.99 },
  duration = 0.5,
}: Props) {
  const reduce = useReducedMotion();

  // No-op si non activé (rendu soft, aucun JS d’anim appliqué)
  if (!enabled) {
    return <div className={clsx(className)}>{children}</div>;
  }

  // Style initial côté client pour rendre l’animation visible (sinon, on ne « voit » rien)
  const initialStyle = reduce
    ? undefined
    : {
        opacity: from.opacity ?? 0,
        transform: `translateY(${from.y ?? 0}px) scale(${from.scale ?? 1})`,
        willChange: "opacity, transform",
      } as React.CSSProperties;

  return (
    <motion.div
      className={clsx(className)}
      initial={false}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.001 : duration, delay: reduce ? 0 : delay, ease: "easeOut" }}
      style={initialStyle}
    >
      {children}
    </motion.div>
  );
}