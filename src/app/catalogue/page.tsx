import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    <main className="min-h-dvh bg-app text-app">
      {/* HERO */}
      <section className="border-b border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <SectionHeader
            title="Nos gammes de produits"
            subtitle="Parcourez les grandes familles et accédez aux fiches produits détaillées."
          />
        </div>
      </section>

      {/* GAMMES */}
      <section className="border-b border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gammes.map((g) => (
              <article
                key={g.slug}
                className="group rounded-2xl overflow-hidden border border-app bg-card transition hover:shadow-md hover:-translate-y-0.5 will-change-transform"
              >
                <Link
                  href={`/catalogue/${g.slug}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  aria-label={`Découvrir la gamme ${g.titre}`}
                >
                  <div className="relative w-full h-44">
                    <Image
                      src={g.image}
                      alt={g.titre}
                      fill
                      className="object-cover bg-app"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      priority={false}
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold">{g.titre}</h2>
                    <p className="text-sm text-app mt-1">{g.resume}</p>
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
              <Button className="h-11 bg-orange-600 hover:bg-orange-700 text-white">Parler à un conseiller</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}