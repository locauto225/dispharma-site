import * as React from "react";

// utilitaire pour concaténer des classes conditionnelles
const cx = (...cls: Array<string | false | undefined>) => cls.filter(Boolean).join(" ");

export type SectionHeaderProps = {
  /** Titre : texte ou JSX (badge, icône, etc.) */
  title: React.ReactNode;
  /** Sous‑titre : texte ou JSX */
  subtitle?: React.ReactNode;
  /** Sur‑titre (eyebrow / overline) au-dessus du titre */
  eyebrow?: React.ReactNode;
  /** Centre le bloc */
  center?: boolean;
  /** Classes supplémentaires sur le wrapper */
  className?: string;
  /** Balise ou composant pour le titre (h1/h2/h3… ou un composant) */
  as?: React.ElementType;
  /** Classes additionnelles ciblées */
  titleClassName?: string;
  subtitleClassName?: string;
  eyebrowClassName?: string;
  /** id du titre (utile pour cible d’ancre); si présent, le sous‑titre est relié via aria-describedby */
  id?: string;
  /** Affiche un liseré marque au-dessus du titre */
  accent?: boolean;
  /** Affiche un fin séparateur sous l’en‑tête */
  divider?: boolean;
};

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  center = false,
  className,
  as: As = "h2",
  titleClassName,
  subtitleClassName,
  eyebrowClassName,
  id,
  accent = false,
  divider = false,
}: SectionHeaderProps) {
  const autoId = React.useId();
  const baseId = id ?? `section-${autoId}`;
  const describedId = subtitle ? `${baseId}__desc` : undefined;

  return (
    <header
      className={cx(
        "relative max-w-3xl",
        center && "mx-auto text-center",
        className
      )}
      {...(describedId ? { "aria-describedby": describedId } : {})}
    >
      {accent && (
        <span
          aria-hidden
          className={cx(
            "mb-2 inline-block h-[3px] w-12 rounded-full",
            "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600",
            center && "mx-auto"
          )}
        />
      )}

      {eyebrow ? (
        <div
          className={cx(
            "text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-1",
            center && "justify-center",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </div>
      ) : null}

      {React.createElement(
        As,
        { className: cx("text-2xl md:text-3xl font-semibold leading-tight", titleClassName), id: baseId },
        title
      )}

      {subtitle ? (
        <p
          id={describedId}
          className={cx("mt-2 text-neutral-600 dark:text-neutral-300", subtitleClassName)}
        >
          {subtitle}
        </p>
      ) : null}

      {divider && (
        <div
          aria-hidden
          className={cx(
            "mt-5 h-px w-full",
            "bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800",
            center && "mx-auto"
          )}
        />
      )}
    </header>
  );
}