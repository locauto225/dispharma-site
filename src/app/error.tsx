'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-dvh flex items-center bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="rounded-2xl border bg-white p-8 md:p-12 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div
            className="inline-flex items-center gap-2 rounded-full border bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
            aria-live="polite"
          >
            500 • Une erreur est survenue
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold">
            Désolé, quelque chose s’est mal passé
          </h1>
          <p className="mt-2 text-neutral-600 max-w-prose dark:text-neutral-300">
            L’opération n’a pas pu aboutir. Vous pouvez réessayer ou revenir à l’accueil.
          </p>

          {/* Astuce dev (optionnelle) : afficher le digest en env preprod */}
          {process.env.NODE_ENV !== "production" && error?.digest && (
            <details className="mt-3 text-xs text-neutral-500">
              <summary className="cursor-pointer select-none">Détails (dev)</summary>
              <div className="mt-1">Digest: {error.digest}</div>
            </details>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => reset()} className="bg-orange-600 hover:bg-orange-700">
              Réessayer
            </Button>
            <Button
              variant="outline"
              onClick={() => history.back()}
              className="dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Page précédente
            </Button>
            <Link href="/">
              <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">Retour à l’accueil</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">Contacter l’équipe</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}