"use client";

import * as React from "react";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

// Base commune à tous les boutons
const base =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform-gpu";

// Variants cohérents avec la charte Dispharma (bleu/orange)
const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  // Bouton principal (rempli orange)
  default:
    "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500/60",

  // Bouton secondaire (outline, adaptatif clair/sombre)
  outline:
    "text-app border-app dark:border-app hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-orange-600 dark:hover:text-orange-300 hover:border-orange-500/70 dark:hover:border-orange-400/60 hover:-translate-y-[1px] active:translate-y-0 active:scale-[.99] transition-colors focus-visible:ring-[#0b6dff]/40 dark:focus-visible:ring-[#0958cc]/40",

  // Bouton texte (ghost) – pour actions discrètes
  ghost:
    "px-0 text-orange-600 dark:text-orange-300 hover:text-orange-700 dark:hover:text-orange-200 hover:bg-orange-50/40 dark:hover:bg-card/40 focus-visible:ring-transparent",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(base, variants[variant], className)}
      {...props}
    />
  )
);

Button.displayName = "Button";

export default Button;