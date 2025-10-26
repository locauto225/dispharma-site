import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

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
    <main className="min-h-dvh bg-app text-app">
      {/* FIL D'ARIANE */}
      <section className="border-b border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
          <nav className="text-sm mb-2 text-app-muted">
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
                <span className="text-xs rounded-full px-2 py-0.5 border border-app bg-card">
                  {produit.temp === "2-8" ? "2–8°C" : "15–25°C"}
                </span>
              </span>
            }
            subtitle={`${produit.forme} — ${produit.conditionnement}`}
          />
        </div>
      </section>

      {/* FICHE PRODUIT */}
      <section className="border-b border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-app bg-card">
            <div className="relative w-full h-80 md:h-[28rem]">
              <Image
                src={produit.image}
                alt={produit.nom}
                fill
                className="object-cover bg-app"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={false}
              />
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-app bg-card p-6">
              <h2 className="text-lg font-semibold">Informations clés</h2>
              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-app-muted">Gamme</dt>
                  <dd className="font-medium">{gamme.titre}</dd>
                </div>
                <div>
                  <dt className="text-app-muted">Forme</dt>
                  <dd className="font-medium">{produit.forme}</dd>
                </div>
                <div>
                  <dt className="text-app-muted">Conditionnement</dt>
                  <dd className="font-medium">{produit.conditionnement}</dd>
                </div>
                <div>
                  <dt className="text-app-muted">Température</dt>
                  <dd className="font-medium">{produit.temp === "2-8" ? "2–8°C" : "15–25°C"}</dd>
                </div>
              </dl>

              <p className="mt-5 text-sm text-app">
                Disponible selon les marchés en Afrique. Contactez-nous pour la fiche technique et les modalités.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/contact?ref=${encodeURIComponent(`${produit.nom} (${produit.forme}, ${produit.conditionnement})`)}`}
                  aria-label={`Demander des informations sur ${produit.nom}`}
                >
                  <Button className="h-11 bg-orange-600 hover:bg-orange-700 text-white">
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
      <section className="scroll-mt-24 bg-app border-t border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 text-center">
          <h3 className="text-xl font-semibold">Un besoin précis ?</h3>
          <p className="mt-1 text-sm text-app">
            Nos équipes vous accompagnent pour construire une réponse adaptée à votre marché.
          </p>
          <div className="mt-5">
            <Link href="/contact">
              <Button className="h-11 bg-orange-600 hover:bg-orange-700 text-white">Parler à un conseiller</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}