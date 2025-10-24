

"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HeroFadeIn — composant client pour afficher une image avec un fade-in doux
 *
 * Avantages :
 * - Animation discrète (opacity + y + scale) respectant prefers-reduced-motion
 * - Compatible avec import statique Next/Image (blur natif) OU src string
 * - Reste un leaf client component pour préserver les pages en Server Component
 */
export type HeroFadeInProps = {
  /** Image source (de préférence import statique pour le blur natif) */
  src: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  /** Met l'image en priorité de chargement (utile dans un hero) */
  priority?: boolean;
  /** Durée de l'animation en secondes */
  duration?: number;
  /** Délai de l'animation en secondes */
  delay?: number;
};

export default function HeroFadeIn({
  src,
  alt,
  width = 1280,
  height = 900,
  sizes,
  className,
  priority,
  duration = 0.5,
  delay = 0,
}: HeroFadeInProps) {
  const reduce = useReducedMotion();

  // placeholder="blur" n'est valide que pour les imports statiques ou les objets avec blurDataURL
  const canBlur = typeof src !== "string";

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        {...(canBlur ? { placeholder: "blur" as const } : {})}
        priority={priority}
      />
    </motion.div>
  );
}