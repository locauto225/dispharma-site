// src/app/a-propos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedInView from "@/components/AnimatedInView";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import StatsRow from "@/components/StatsRow";

export const metadata: Metadata = {
  title: "À propos — Dispharma",
  description:
    "Découvrez l’histoire, la mission et les valeurs de Dispharma. Entreprise pharmaceutique ivoirienne dédiée à la qualité, la proximité et l’innovation.",
};

export default function AProposPage() {
  return (
    <main className="min-h-dvh bg-app text-app">
      {/* HERO */}
      <section className="border-b border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <AnimatedInView>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              À propos de Dispharma
            </h1>
            <p className="mt-3 text-app max-w-prose">
              Dispharma est un acteur clé de la distribution pharmaceutique en Côte d’Ivoire,
              connecté à un réseau de partenaires à travers l’Afrique. Grâce à une logistique
              moderne et certifiée, nous assurons la disponibilité et la traçabilité des produits
              de santé, tant sur le territoire ivoirien qu’à l’export.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Nous contacter
                </Button>
              </Link>
              <Link href="/partenaires">
                <Button variant="outline" className="h-11">
                  Devenir partenaire
                </Button>
              </Link>
            </div>
          </AnimatedInView>

          <AnimatedInView
            delay={0.12}
            className="md:justify-self-end relative rounded-2xl overflow-hidden border bg-card border-app"
          >
            <Image
              src="/a-propos/hero.webp"
              alt="Équipe Dispharma et réseau logistique"
              width={1280}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-72 md:h-96 object-cover shadow-sm"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-50/30 to-transparent dark:from-black/20 dark:to-transparent" />
          </AnimatedInView>
        </div>
      </section>

      {/* HISTOIRE & MISSION */}
      <section className="border-b border-app bg-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
          <AnimatedInView>
            <SectionHeader
              title="Notre histoire"
              subtitle="Fondée pour rapprocher les acteurs du secteur pharmaceutique ivoirien, Dispharma s’est imposée comme un maillon central de la chaîne du médicament en Côte d’Ivoire, tout en étendant progressivement son expertise à plusieurs pays africains."
            />
          </AnimatedInView>

          <div className="rounded-2xl overflow-hidden border bg-card border-app">
            <Image
              src="/a-propos/histoire.webp"
              alt="Histoire et mission Dispharma"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-64 md:h-80 object-cover"
              loading="eager"
              decoding="sync"
            />
          </div>
        </div>
      </section>

      {/* VALEURS & VISION */}
      <section className="border-b border-app bg-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <SectionHeader
              title="Nos valeurs & vision"
              subtitle="Dispharma repose sur trois piliers : la rigueur, la transparence et la proximité. Notre vision : devenir la référence ouest-africaine en matière de distribution pharmaceutique responsable et innovante."
            />
          </AnimatedInView>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Qualité & conformité", d: "Alignée sur les normes GDP et DGI, auditée régulièrement." },
              { t: "Innovation", d: "Digitalisation, Extranet et intégrations EDI pour une traçabilité totale." },
              { t: "Proximité", d: "Présence nationale et accompagnement personnalisé." },
            ].map((v, i) => (
              <AnimatedInView
                key={v.t}
                delay={0.06 * i}
                className="rounded-2xl border border-app bg-card p-5"
              >
                <div className="text-sm font-semibold text-blue-600/90 dark:text-orange-400">{v.t}</div>
                <div className="mt-1 text-sm text-app">{v.d}</div>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE & LOCAUX */}
      <section className="border-b border-app bg-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
          <AnimatedInView>
            <SectionHeader
              title="Notre équipe & locaux"
              subtitle="Dispharma regroupe des professionnels expérimentés du secteur santé, répartis entre notre siège administratif et nos entrepôts régionaux en Côte d’Ivoire. Une équipe unie autour d’une même exigence : servir la santé publique et accompagner la croissance du réseau africain."
            />
          </AnimatedInView>

          <div className="rounded-2xl overflow-hidden border border-app bg-card">
            <Image
              src="/a-propos/equipe.webp"
              alt="Équipe et locaux Dispharma"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-64 md:h-80 object-cover"
              loading="eager"
              decoding="sync"
            />
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="border-b border-app bg-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <SectionHeader
              title="Chiffres clés"
              subtitle="Des indicateurs qui traduisent notre fiabilité et notre expertise."
            />
          </AnimatedInView>
          <div className="mt-8">
            <StatsRow
              stats={[
                { n: "6+", k: "années d’expérience" },
                { n: "99,5 %", k: "livraisons conformes" },
                { n: "2–8°C / 15–25°C", k: "chaîne du froid" },
                { n: "7+", k: "pays couverts" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* PARTENAIRES INSTITUTIONNELS */}
      <section className="border-b border-app bg-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <SectionHeader
              title="Partenaires institutionnels & affiliations"
              subtitle="Dispharma collabore avec des organismes nationaux, régionaux et internationaux pour garantir la conformité et la sécurité de la chaîne pharmaceutique."
            />
          </AnimatedInView>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            {["/logos/ministere-sante.svg", "/logos/chambre-commerce.svg", "/logos/ordre-pharmaciens.svg"].map(
              (logo) => (
                <div
                  key={logo}
                  className="rounded-xl border border-app bg-card px-4 py-3"
                >
                  <Image
                    src={logo}
                    alt="Partenaire institutionnel"
                    width={100}
                    height={40}
                    loading="eager"
                    decoding="sync"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}