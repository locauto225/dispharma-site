"use client";

import * as React from "react";
import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

const base =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-600",
  outline:
    "border border-neutral-300 text-neutral-800 hover:bg-neutral-50 focus-visible:ring-neutral-400",
  ghost: "text-orange-600 hover:text-orange-700 hover:bg-orange-50",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button ref={ref} className={clsx(base, variants[variant], className)} {...props} />
  )
);
Button.displayName = "Button";

export default Button;