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
      {/* HERO avec image */}
      <section className="relative border-b dark:border-neutral-800">
        <div className="absolute inset-0">
          <img
            src="/extranet/entrepot-login.webp"
            alt="Accès extranet Dispharma"
            className="object-cover w-full h-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-24 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-semibold drop-shadow-lg">Espace Extranet Dispharma</h1>
          <p className="mt-3 text-neutral-200 max-w-2xl mx-auto">
            Interface sécurisée pour nos partenaires — accès aux ventes, stocks et traçabilité.
          </p>
          <div className="mt-8 flex justify-center flex-wrap gap-4">
            <a
              href="https://dispharma.logimatiqueci.com/dispharma/connexionAdmin.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Accéder à l’extranet
              </Button>
            </a>
            <Button
              variant="outline"
              className="cursor-not-allowed opacity-70 text-white border-white/70"
              aria-disabled
              title="Bientôt disponible"
            >
              Tableau de bord (bientôt)
            </Button>
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