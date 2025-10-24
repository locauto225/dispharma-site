import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedInView from "@/components/AnimatedInView";
import HeroFadeIn from "@/components/HeroFadeIn";
import heroImg from "@/../public/grossistes/hero.webp";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Grossistes — Livraison CI & Export Afrique | Dispharma",
  description:
    "Dispharma accompagne les grossistes avec des livraisons fiables en Côte d’Ivoire et un service export maîtrisé vers l’Afrique. Chaîne du froid, conformité et suivi documentaire.",
};

const EXPORT_COUNTRIES = [
  { name: "Bénin", flag: "/flags/bj.svg" },
  { name: "Mali", flag: "/flags/ml.svg" },
  { name: "Burkina Faso", flag: "/flags/bf.svg" },
  { name: "Sénégal", flag: "/flags/sn.svg" },
  { name: "Guinée", flag: "/flags/gn.svg" },
  { name: "Congo-Brazzaville", flag: "/flags/cg.svg" },
];

export default function GrossistesPage() {
  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* HERO */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Votre partenaire logistique et pharmaceutique en Afrique
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-prose">
              Dispharma accompagne les <strong>professionnels de la distribution pharmaceutique</strong> sur toute la chaîne&nbsp;:
              de la <strong>disponibilité produit</strong> à la <strong>livraison contrôlée</strong> en Côte d’Ivoire
              et à l’<strong>export</strong> vers l’Afrique de l’Ouest.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#solutions" prefetch aria-label="Voir les solutions proposées par Dispharma">
                <Button className="h-11 bg-orange-600 hover:bg-orange-700">
                  Découvrir nos solutions
                </Button>
              </Link>
              {/* branché vers la section #catalogue */}
              <Link href="#catalogue" prefetch aria-label="Aller à la section catalogue">
                <Button
                  variant="outline"
                  className="h-11 border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  Découvrir le catalogue
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:justify-self-end">
            <HeroFadeIn
              src={heroImg}
              alt="Interface de commande et suivi Dispharma pour grossistes"
              width={1280}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-72 md:h-96 object-cover rounded-2xl border dark:border-neutral-800"
              priority
            />
          </div>
        </div>
      </section>

      {/* CONFORMITÉ */}
      <section
        id="conformite"
        className="border-t border-b border-neutral-200 dark:border-neutral-800/40 bg-white/40 dark:bg-neutral-950/30 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5">
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">Conformité :</span>
            <span className="inline-flex items-center justify-center rounded-full border border-neutral-200/70 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-900/40 px-4 py-2">
              <Image
                src="/badges/airp.webp"
                alt="Certification AIRP"
                width={32}
                height={32}
                className="object-contain"
              />
            </span>
          </div>
        </div>
      </section>

      {/* CI / EXPORT */}
      <section
        id="solutions"
        className="border-b bg-neutral-50/60 dark:bg-neutral-950 dark:border-neutral-800 scroll-mt-24 md:scroll-mt-32"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-8">
          {/* LIVRAISON CI */}
          <AnimatedInView className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-orange-500">
            <div className="flex items-center gap-3 mb-3">
              <Image src="/icons/map-ci.svg" alt="Livraison nationale Côte d’Ivoire" width={32} height={32} />
              <h2 className="text-xl font-semibold">Livraison nationale</h2>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
              Couverture du territoire ivoirien avec des délais adaptés, communiqués selon zones et volumes.
            </p>
            <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2 mb-5">
              <li>• Chaîne du froid 2–8°C / 15–25°C</li>
              <li>• Traçabilité &amp; documents à chaque étape</li>
              <li>• Assistance commerciale dédiée</li>
            </ul>
            <div className="mt-5 rounded-xl overflow-hidden border dark:border-neutral-800">
              <Image
                src="/grossistes/livraison.webp"
                alt="Livraison de médicaments en Côte d’Ivoire"
                width={800}
                height={600}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-36 md:h-44 object-cover transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </AnimatedInView>

          {/* EXPORT AFRIQUE */}
          <AnimatedInView className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-orange-500">
            <div className="flex items-center gap-3 mb-3">
              <Image src="/icons/globe.svg" alt="Export Afrique" width={32} height={32} />
              <h2 className="text-xl font-semibold">Export maîtrisé vers l’Afrique</h2>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
              Un <strong>service export clé en main</strong>, conforme et sécurisé, adapté à vos volumes et destinations.
            </p>

            {/* Liste minimaliste */}
            <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2 mb-4">
              <li>• Documents fournis : factures, certificats d’origine, autorisations</li>
              <li>• Coordination transport &amp; assurance si requis</li>
              <li>• Suivi des expéditions jusqu’au point de livraison</li>
            </ul>

            {/* PAYS EXPORT */}
            <div aria-label="Destinations déjà servies" className="mb-5">
              <div className="text-xs font-medium text-neutral-500 mb-2 tracking-wide">Destinations déjà servies</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {EXPORT_COUNTRIES.map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <Image
                      src={p.flag}
                      alt={p.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full border dark:border-neutral-700"
                    />
                    <span className="text-[12px] text-neutral-700 dark:text-neutral-300">{p.name}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                Exemples récents — liste non exhaustive. Autres destinations sur demande.
              </p>
            </div>

            {/* Détails export */}
            <details className="text-sm group mb-5">
              <summary className="cursor-pointer inline-flex items-center justify-between w-full px-3 py-2 rounded-md border bg-neutral-50 text-neutral-800 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <span className="font-medium flex items-center gap-2">
                  Détails export (documents &amp; étapes)
                  <span className="text-[11px] text-neutral-500">— cliquer pour afficher/masquer</span>
                </span>
                <span aria-hidden className="transition-transform group-open:rotate-90 text-neutral-400">›</span>
              </summary>
              <div className="mt-2 space-y-3 text-neutral-700 dark:text-neutral-300">
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Validation documentaire et formalités</li>
                  <li>Préparation, conditionnement &amp; contrôle qualité</li>
                  <li>Plan de transport (aérien/route) et assurance si requis</li>
                  <li>Suivi expédition &amp; notifications jusqu’au point de livraison</li>
                </ul>
              </div>
            </details>
          </AnimatedInView>
        </div>

        {/* CTA unique */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 -mt-6 pb-12 flex justify-center">
          <Link href="/contact" prefetch aria-label="Contacter Dispharma pour CI ou Export">
            <Button className="h-11 bg-orange-600 hover:bg-orange-700 px-6">
              Parler à un conseiller
            </Button>
          </Link>
        </div>
      </section>

      {/* PROCESSUS */}
      <section id="processus" className="border-b bg-neutral-50/60 dark:bg-neutral-950 dark:border-neutral-800 scroll-mt-24 md:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <SectionHeader title="Comment ça fonctionne" subtitle="Un parcours simple et maîtrisé, de la demande à la livraison." />
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { t: "1. Devis", d: "Produits, volumes, zones, températures." },
              { t: "2. Commande", d: "Validation & émission des documents." },
              { t: "3. Préparation", d: "Conditionnement et contrôle qualité." },
              { t: "4. Livraison", d: "En Côte d’Ivoire ou à l’export, selon votre besoin." },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-2xl border border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 p-5 shadow-sm"
              >
                <div className="text-lg font-semibold text-orange-600">{s.t}</div>
                <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGUE (teaser) */}
      <section id="catalogue" className="border-b dark:border-neutral-800 scroll-mt-24 md:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <AnimatedInView>
            <SectionHeader title="Catalogue & produits" subtitle="Médicaments, dispositifs, parapharmacie — version à jour sur demande." />
            <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>• Références, dosages, conditionnements</li>
              <li>• Fiches produits &amp; certificats associés</li>
              <li>• Disponibilités communiquées par notre équipe</li>
            </ul>
            <div className="mt-6 flex gap-4">
              <Link href="/catalogue" prefetch aria-label="Découvrir le catalogue Dispharma">
                <Button className="h-11 bg-orange-600 hover:bg-orange-700">
                  Découvrir le catalogue
                </Button>
              </Link>
              <Link href="/contact" prefetch aria-label="Contacter l’équipe Dispharma">
                <Button variant="outline" className="h-11">
                  Contacter un conseiller
                </Button>
              </Link>
            </div>
          </AnimatedInView>

          <AnimatedInView
            delay={0.12}
            className="group rounded-2xl overflow-hidden border bg-white dark:bg-neutral-900 dark:border-neutral-800 transition-shadow hover:shadow-sm"
          >
            <Image
              src="/grossistes/catalogue.webp"
              alt="Catalogue produits Dispharma"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </AnimatedInView>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contact" className="scroll-mt-24 bg-neutral-50/60 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <CtaBanner
            title="Un besoin précis ?"
            text="Nos équipes CI et export vous conseillent et construisent une réponse adaptée à votre marché."
            primary={{ label: "Demander un devis", href: "/contact" }}
            secondary={{ label: "Être rappelé", href: "/contact#callback" }}
          />
        </div>
      </section>
    </main>
  );
}