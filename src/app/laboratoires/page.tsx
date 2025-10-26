import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedInView from "@/components/AnimatedInView";
import { Button } from "@/components/ui/button";
import CtaBanner from "@/components/CtaBanner";
import HeroFadeIn from "@/components/HeroFadeIn";
import heroImg from "@/../public/laboratoires/hero.webp";
import approachImg from "@/../public/laboratoires/approche.webp";

export const metadata: Metadata = {
  title: "Laboratoires — Solutions commerciales & logistiques | Dispharma",
  description:
    "Dispharma accompagne les laboratoires pour la mise sur le marché, le stockage sous températures contrôlées et la distribution en Côte d’Ivoire et dans toute l’Afrique, avec traçabilité et accompagnement dédié.",
};

export default function LaboratoiresPage() {
  return (
    <main className="min-h-dvh bg-app text-app scroll-smooth">
      {/* HERO */}
      <section className="border-b border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Solutions Dispharma pour laboratoires
            </h1>
            <p className="mt-4 text-app max-w-prose">
              Accélérez votre présence en Afrique avec une mise sur le marché <em>clé en main</em> :
              enregistrement, stockage sous températures contrôlées (2–8°C / 15–25°C),
              distribution dans toute l’Afrique et suivi des ventes.
            </p>

            {/* Actions — prioriser les services, proposer le processus en secondaire */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#services" prefetch aria-label="Découvrir nos solutions">
                <Button className="h-11 bg-orange-600 hover:bg-orange-700 text-white">
                  Découvrir nos solutions
                </Button>
              </Link>
              <Link href="#comment-ca-marche" prefetch aria-label="Voir comment ça fonctionne">
                <Button variant="outline" className="h-11">
                  Voir comment ça fonctionne
                </Button>
              </Link>
            </div>
          </div>

          <HeroFadeIn
            src={heroImg}
            alt="Chaîne pharmaceutique — solutions Dispharma pour laboratoires"
            width={1280}
            height={900}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full h-72 md:h-96 object-cover rounded-2xl border border-app shadow-sm"
            priority
          />
        </div>
      </section>

      {/* CONFORMITÉ — bloc discret sous le hero */}
      <section id="conformite" className="border-t border-b border-app bg-app backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5">
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">Conformité&nbsp;:</span>
            <span className="inline-flex items-center justify-center rounded-full border border-app bg-white/70 dark:bg-neutral-900/40 px-4 py-2">
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

      {/* SERVICES */}
      <section id="services" className="border-b bg-app border-app scroll-mt-24 md:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Nos deux solutions complémentaires</h2>
            <p className="mt-2 text-app-muted max-w-prose">
              Deux leviers complémentaires&nbsp;: <strong>distribuer en Afrique</strong> (via notre réseau de grossistes)
              et <strong>accéder au marché ivoirien</strong> sans complexité administrative.
            </p>
          </AnimatedInView>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {/* Distribution nationale */}
            <div className="relative rounded-2xl border border-neutral-200/70 dark:border-app bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md leading-relaxed md:leading-loose text-[15px]">
              <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-8 h-16 bg-gradient-to-b from-orange-50/20 to-transparent dark:hidden" />
              <div className="flex items-center gap-3">
                <Image src="/icons/map-ci.svg" alt="" width={28} height={28} aria-hidden />
                <div className="text-lg font-semibold">Distribution dans toute l’Afrique</div>
              </div>
              <ul className="mt-3 space-y-2.5 text-sm text-app leading-relaxed md:leading-loose list-disc list-inside">
                <li>Couverture logistique CI & Afrique</li>
                <li>Suivi des ventes, stocks et retours</li>
                <li>À votre écoute — accompagnement réactif</li>
              </ul>
            </div>

            {/* Import & mise sur le marché */}
            <div className="relative rounded-2xl border border-neutral-200/70 dark:border-app bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md leading-relaxed md:leading-loose text-[15px]">
              <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-8 h-16 bg-gradient-to-b from-orange-50/20 to-transparent dark:hidden" />
              <div className="flex items-center gap-3">
                <Image src="/icons/globe.svg" alt="" width={28} height={28} aria-hidden />
                <div className="text-lg font-semibold">Import & mise sur le marché</div>
              </div>
              <ul className="mt-3 space-y-2.5 text-sm text-app leading-relaxed md:leading-loose list-disc list-inside">
                <li>Import conforme & gestion douanière</li>
                <li>Stockage sous température dirigée</li>
                <li>Traçabilité complète (lots, DLU, documentation)</li>
                <li className="text-app-muted">Documentation & conformité intégrées au flux.</li>
              </ul>
            </div>
          </div>

          {/* Bouton unique pour les deux cartes */}
          <div className="mt-10 text-center">
            <Link href="/contact" prefetch>
              <Button className="h-11 bg-orange-600 hover:bg-orange-700 text-white text-base px-8">
                Parler à un conseiller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* APPROCHE — image .webp à gauche, contenus à droite */}
      <section id="approche" className="border-b border-app scroll-mt-24 md:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Notre approche</h2>
          </AnimatedInView>

          <div className="mt-6 grid md:grid-cols-2 items-center gap-8">
            {/* Image à gauche (ratio stable) */}
            <div className="order-1 md:order-none">
              <div className="relative w-full h-56 md:h-[360px] rounded-2xl border overflow-hidden border-app">
                <Image
                  src={approachImg}
                  alt="Méthodologie Dispharma — qualité, traçabilité et accompagnement"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                  priority={false}
                />
              </div>
            </div>

            {/* 3 axes clés à droite */}
            <div className="grid sm:grid-cols-3 md:grid-cols-1 gap-6">
              <div className="rounded-2xl border border-app bg-card p-5 text-center">
                <div className="text-lg font-semibold">Confiance & conformité</div>
                <div className="text-sm text-app mt-1">
                  Référentiels qualité alignés.
                </div>
              </div>

              <div className="rounded-2xl border border-app bg-card p-5 text-center">
                <div className="text-lg font-semibold">Traçabilité & transparence</div>
                <div className="text-sm text-app mt-1">
                  Données en temps réel via extranet partenaire.
                </div>
              </div>

              <div className="rounded-2xl border border-app bg-card p-5 text-center">
                <div className="text-lg font-semibold">Accompagnement personnalisé</div>
                <div className="text-sm text-app mt-1">
                  Équipe dédiée à vos opérations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÉTAPES SIMPLIFIÉES avec titres en orange */}
      <section id="comment-ca-marche" className="border-b bg-app border-app scroll-mt-24 md:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Un processus simple et encadré</h2>
          </AnimatedInView>

          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              { n: 1, t: "Étude & cadrage", d: "Analyse des produits et exigences réglementaires." },
              { n: 2, t: "Accords & intégration", d: "Signature des conventions et création d’accès extranet." },
              { n: 3, t: "Flux opérationnels", d: "Distribution ou importation selon votre modèle." },
              {
                n: 4,
                t: "Suivi & reporting",
                d: "Tableaux de bord qualité et performance ventes partagés (extranet).",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-app bg-card p-5"
              >
                <div className="text-xs text-app-muted">Étape {s.n}</div>
                <div className="mt-1 font-semibold text-blue-600/90 dark:text-orange-400">{s.t}</div>
                <p className="mt-1 text-sm text-app">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section>
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <CtaBanner
            title="Développez votre présence avec Dispharma"
            text="Distribution, import, traçabilité, accompagnement : nos équipes vous aident à bâtir une stratégie claire pour le marché ivoirien."
            primary={{ label: "Parler à un conseiller", href: "/contact" }}
          />
        </div>
      </section>
    </main>
  );
}