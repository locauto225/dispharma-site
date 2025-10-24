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
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* HERO */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <AnimatedInView>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              À propos de Dispharma
            </h1>
            <p className="mt-3 text-neutral-600 max-w-prose dark:text-neutral-300">
              Dispharma est un acteur clé de la distribution pharmaceutique en Côte d’Ivoire,
              connectant laboratoires, distributeurs et grossistes à travers un réseau logistique
              certifié et digitalisé.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button className="bg-orange-600 hover:bg-orange-700">Nous contacter</Button>
              </Link>
              <Link href="/partenaires">
                <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">
                  Devenir partenaire
                </Button>
              </Link>
            </div>
          </AnimatedInView>

          {/* Hero image — même animation que /partenaires (constante, sans hook) */}
          <AnimatedInView delay={0.12} className="md:justify-self-end relative rounded-2xl overflow-hidden border bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
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
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
          <AnimatedInView>
            <SectionHeader
              title="Notre histoire"
              subtitle="Fondée pour rapprocher les acteurs du secteur pharmaceutique, Dispharma s’est imposée comme un maillon central de la chaîne du médicament. Sa mission : garantir la disponibilité et la qualité des produits de santé sur l’ensemble du territoire ivoirien."
            />
          </AnimatedInView>

          {/* Image statique (sans animation au scroll) */}
          <div className="rounded-2xl overflow-hidden border bg-white dark:bg-neutral-900 dark:border-neutral-800">
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
      <section className="border-b bg-neutral-50/60 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <SectionHeader
              title="Nos valeurs & vision"
              subtitle="Dispharma repose sur trois piliers : la rigueur, la transparence et la proximité. Notre vision : devenir la référence ouest-africaine de la distribution pharmaceutique responsable et innovante."
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
                className="rounded-2xl border bg-white p-5 dark:bg-neutral-900 dark:border-neutral-800"
              >
                <div className="text-sm font-semibold">{v.t}</div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{v.d}</div>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE & LOCAUX */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
          <AnimatedInView>
            <SectionHeader
              title="Notre équipe & locaux"
              subtitle="Dispharma réunit des professionnels expérimentés du secteur santé, répartis entre nos sièges administratifs et nos entrepôts régionaux. Une équipe soudée autour d’une même exigence : servir la santé publique."
            />
          </AnimatedInView>

          {/* Image statique (sans animation au scroll) */}
          <div className="rounded-2xl overflow-hidden border bg-white dark:bg-neutral-900 dark:border-neutral-800">
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
      <section className="border-b bg-neutral-50/60 dark:bg-neutral-950 dark:border-neutral-800">
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
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <SectionHeader
              title="Partenaires institutionnels & affiliations"
              subtitle="Dispharma collabore avec des organismes nationaux, régionaux et internationaux pour garantir la conformité et la sécurité de la chaîne pharmaceutique."
            />
          </AnimatedInView>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            {["/logos/ministere-sante.svg", "/logos/chambre-commerce.svg", "/logos/ordre-pharmaciens.svg"].map((logo) => (
              <div
                key={logo}
                className="rounded-xl border bg-white px-4 py-3 dark:bg-neutral-900 dark:border-neutral-800"
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}