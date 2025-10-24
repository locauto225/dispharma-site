import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Catalogue — Gammes | Dispharma",
  description:
    "Découvrez les gammes de produits Dispharma : présentation visuelle et accès aux fiches produits. Sans prix, orienté contact commercial.",
};

type Gamme = { slug: string; titre: string; resume: string; image: string };
type Catalogue = { gammes: Gamme[] };

async function fetchCatalogue(): Promise<Catalogue> {
  const mod = await import("@/data/catalogue.json");
  return mod.default as Catalogue;
}

export default async function CataloguePage() {
  const { gammes } = await fetchCatalogue();

  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* HERO */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <SectionHeader
            title="Nos gammes de produits"
            subtitle="Parcourez les grandes familles et accédez aux fiches produits détaillées."
          />
        </div>
      </section>

      {/* GAMMES */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gammes.map((g) => (
              <article
                key={g.slug}
                className="group rounded-2xl overflow-hidden border bg-white dark:bg-neutral-900 dark:border-neutral-800 transition hover:shadow-md"
              >
                <Link
                  href={`/catalogue/${g.slug}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <div className="relative w-full h-44">
                    <img
                      src={g.image}
                      alt={g.titre}
                      className="object-cover w-full h-full bg-neutral-50 dark:bg-neutral-900"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold">{g.titre}</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{g.resume}</p>
                    <div className="mt-3">
                      <Button variant="ghost" className="px-0 text-orange-600 hover:text-orange-700">
                        Découvrir cette gamme →
                      </Button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* CTA bas de page */}
          <div className="mt-10 flex justify-center">
            <Link href="/contact">
              <Button className="h-11 bg-orange-600 hover:bg-orange-700">Parler à un conseiller</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}