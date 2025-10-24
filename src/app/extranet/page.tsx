

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Extranet — Dispharma",
  description:
    "Accédez à l’extranet Dispharma pour le suivi des ventes, des stocks et des opérations.",
  robots: { index: false, follow: false },
};

export default function ExtranetPage() {
  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* HERO */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Extranet Dispharma</h1>
            <p className="mt-3 text-neutral-600 max-w-prose dark:text-neutral-300">
              Espace sécurisé réservé aux partenaires. Accédez à l’extranet pour consulter vos données
              opérationnelles (ventes, stocks, traçabilité) et échanger avec nos équipes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Lien extranet (ouvre un nouvel onglet) */}
              <a
                href="https://dispharma.logimatiqueci.com/dispharma/connexionAdmin.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-orange-600 hover:bg-orange-700">Accéder à l’extranet</Button>
              </a>

              {/* Bouton tableau de bord (placeholder désactivé) */}
              <Button
                variant="outline"
                className="cursor-not-allowed opacity-60 dark:border-neutral-700"
                aria-disabled
                title="Bientôt disponible"
              >
                Tableau de bord (bientôt)
              </Button>
            </div>

            <noscript>
              <p className="mt-4 text-sm text-neutral-500">
                JavaScript est désactivé. Utilisez ce lien direct : {" "}
                <a
                  href="https://dispharma.logimatiqueci.com/dispharma/connexionAdmin.php"
                  className="underline text-orange-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ouvrir l’extranet
                </a>
              </p>
            </noscript>
          </div>

          <div className="md:justify-self-end">
            {/* Visuel simple pour équilibrer la mise en page (optionnel) */}
            <div className="hidden md:block rounded-2xl border bg-neutral-50 h-72 w-full dark:bg-neutral-900 dark:border-neutral-800" aria-hidden />
          </div>
        </div>
      </section>

      {/* FAQ courte / aide (optionnel, discret) */}
      <section>
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <div className="rounded-2xl border bg-white p-6 dark:bg-neutral-900 dark:border-neutral-800">
            <h2 className="text-lg font-semibold">Assistance</h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Problème d’accès ? Contactez le support via {" "}
              <Link href="/contact" className="underline text-orange-700">le formulaire</Link> ou votre interlocuteur Dispharma.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}