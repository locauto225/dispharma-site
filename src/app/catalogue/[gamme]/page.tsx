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

type Params = { params: Promise<{ gamme: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { gamme } = await params;
  const { gammes } = await fetchCatalogue();
  const g = gammes.find((x) => x.slug === gamme);
  return {
    title: g ? `${g.titre} — Catalogue | Dispharma` : "Catalogue | Dispharma",
    description: g?.resume ?? "Catalogue des produits par gamme.",
  };
}

export default async function GammePage({ params }: Params) {
  const { gamme } = await params;
  const data = await fetchCatalogue();
  const gammeData = data.gammes.find((g) => g.slug === gamme);
  if (!gammeData) return notFound();

  const items = data.produits[gammeData.slug] ?? [];

  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* FIL D’ARIANE + TITRE */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
          <nav className="text-sm mb-2 text-neutral-500 dark:text-neutral-400">
            <Link href="/catalogue" className="hover:underline">Catalogue</Link>
            <span aria-hidden> / </span>
            <span>{gammeData.titre}</span>
          </nav>
          <SectionHeader title={gammeData.titre} subtitle={gammeData.resume} />
        </div>
      </section>

      {/* LISTE PRODUITS */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          {items.length === 0 ? (
            <p className="text-neutral-600 dark:text-neutral-300">
              Aucun produit listé pour cette gamme pour le moment.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <article
                  key={p.slug}
                  className="group rounded-2xl overflow-hidden border bg-white dark:bg-neutral-900 dark:border-neutral-800 transition hover:shadow-md"
                >
                  <Link
                    href={`/produits/${p.slug}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <div className="relative w-full h-44">
                      <img
                        src={p.image}
                        alt={p.nom}
                        className="object-cover w-full h-full bg-neutral-50 dark:bg-neutral-900"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold">{p.nom}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                        {p.forme} — {p.conditionnement}
                      </p>
                      <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                        Température : {p.temp === "2-8" ? "2–8°C" : "15–25°C"}
                      </div>
                      <div className="mt-3">
                        <Button variant="ghost" className="px-0 text-orange-600 hover:text-orange-700">
                          Voir la fiche produit →
                        </Button>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* CTA bas de page */}
          <div className="mt-10 flex justify-center">
            <Link href="/contact" aria-label="Parler à un conseiller Dispharma">
              <Button className="h-11 bg-orange-600 hover:bg-orange-700">Parler à un conseiller</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}