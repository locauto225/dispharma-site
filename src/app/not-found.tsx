import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center">
      <section className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="rounded-2xl border bg-white p-8 md:p-12 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
            404 • Page introuvable
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold">
            Oups, cette page n’existe pas (ou plus)
          </h1>
          <p className="mt-2 text-neutral-600 max-w-prose">
            Le lien peut être erroné ou la page a été déplacée. Utilisez les
            raccourcis ci-dessous pour revenir sur la bonne voie.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/"><Button className="bg-orange-600 hover:bg-orange-700">Retour à l’accueil</Button></Link>
            <Link href="/contact"><Button variant="outline">Contacter l’équipe</Button></Link>
          </div>
        </div>
      </section>
    </main>
  );
}