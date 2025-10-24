import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

type Produit = {
  slug: string;
  nom: string;
  forme: string;
  conditionnement: string;
  temp: "2-8" | "15-25";
  image: string;
};
type Gamme = { slug: string; titre: string; resume: string; image: string };
type Catalogue = { gammes: Gamme[]; produits: Record<string, Produit[]> };

async function fetchCatalogue(): Promise<Catalogue> {
  const mod = await import("@/data/catalogue.json");
  return mod.default as Catalogue;
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchCatalogue();
  const { produit } = findProduct(data, slug) ?? {};
  return {
    title: produit ? `${produit.nom} — Fiche produit | Dispharma` : "Fiche produit | Dispharma",
    description: produit
      ? `${produit.forme} — ${produit.conditionnement}. Température ${produit.temp === "2-8" ? "2–8°C" : "15–25°C"}.`
      : "Fiche produit du catalogue Dispharma.",
  };
}

function findProduct(data: Catalogue, slug: string) {
  for (const g of data.gammes) {
    const items = data.produits[g.slug] ?? [];
    const produit = items.find((p) => p.slug === slug);
    if (produit) return { produit, gamme: g };
  }
  return null;
}

export default async function ProduitPage({ params }: Params) {
  const { slug } = await params;
  const data = await fetchCatalogue();
  const res = findProduct(data, slug);
  if (!res) return notFound();

  const { produit, gamme } = res;

  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* FIL D'ARIANE */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
          <nav className="text-sm mb-2 text-neutral-500 dark:text-neutral-400">
            <Link href="/catalogue" className="hover:underline">Catalogue</Link>
            <span aria-hidden> / </span>
            <Link href={`/catalogue/${gamme.slug}`} className="hover:underline">{gamme.titre}</Link>
            <span aria-hidden> / </span>
            <span>{produit.nom}</span>
          </nav>

          {/* Titre + Badge température */}
          <SectionHeader
            title={
              <span className="inline-flex items-center gap-2">
                {produit.nom}
                <span className="text-xs rounded-full px-2 py-0.5 border bg-white dark:bg-neutral-900 dark:border-neutral-700">
                  {produit.temp === "2-8" ? "2–8°C" : "15–25°C"}
                </span>
              </span>
            }
            subtitle={`${produit.forme} — ${produit.conditionnement}`}
          />
        </div>
      </section>

      {/* FICHE PRODUIT */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border bg-white dark:bg-neutral-900 dark:border-neutral-800">
            <div className="relative w-full h-80 md:h-[28rem]">
              <img
                src={produit.image}
                alt={produit.nom}
                className="object-cover w-full h-full bg-neutral-50 dark:bg-neutral-900"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <div className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6">
              <h2 className="text-lg font-semibold">Informations clés</h2>
              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-neutral-500 dark:text-neutral-400">Gamme</dt>
                  <dd className="font-medium">{gamme.titre}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500 dark:text-neutral-400">Forme</dt>
                  <dd className="font-medium">{produit.forme}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500 dark:text-neutral-400">Conditionnement</dt>
                  <dd className="font-medium">{produit.conditionnement}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500 dark:text-neutral-400">Température</dt>
                  <dd className="font-medium">{produit.temp === "2-8" ? "2–8°C" : "15–25°C"}</dd>
                </div>
              </dl>

              <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-300">
                Disponible selon marchés d’Afrique de l’Ouest. Contactez-nous pour la fiche technique et les modalités.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/contact?ref=${encodeURIComponent(`${produit.nom} (${produit.forme}, ${produit.conditionnement})`)}`}
                >
                  <Button className="h-11 bg-orange-600 hover:bg-orange-700">
                    Demander plus d’informations
                  </Button>
                </Link>
                <Link href={`/catalogue/${gamme.slug}`}>
                  <Button variant="outline" className="h-11">← Retour à la gamme</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="scroll-mt-24 bg-neutral-50/60 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 text-center">
          <h3 className="text-xl font-semibold">Un besoin précis ?</h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            Nos équipes vous accompagnent pour construire une réponse adaptée à votre marché.
          </p>
          <div className="mt-5">
            <Link href="/contact">
              <Button className="h-11 bg-orange-600 hover:bg-orange-700">Parler à un conseiller</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}