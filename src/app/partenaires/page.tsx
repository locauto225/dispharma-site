"use client";

const SPLIT_BY_PROFILE = true; // éviter la recréation à chaque rendu

import Link from "next/link";
import Image from "next/image";
import AnimatedInView from "@/components/AnimatedInView";
import heroImg from "@/../public/partenaires/hero.webp";
import entrepotImg from "@/../public/partenaires/entrepot.webp";
import { Button } from "@/components/ui/button";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";

/** Compteur animé, compatible prefers-reduced-motion */
function AnimatedNumber({
  to,
  duration = 2,
  decimals = 0,
  triggerOnView = true,
}: {
  to: number;
  duration?: number;
  decimals?: number;
  triggerOnView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => Number(latest).toFixed(decimals));
  const reduceMotion = useReducedMotion();

  const start = () => {
    if (reduceMotion) {
      mv.set(to);
      return;
    }
    animate(mv, to, { duration, ease: "easeOut" });
  };

  useEffect(() => {
    if (!triggerOnView) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, triggerOnView, reduceMotion]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = Number(v).toLocaleString("fr-FR");
    });
    return unsub;
  }, [rounded]);

  if (triggerOnView) {
    return (
      <motion.span
        ref={ref}
        onViewportEnter={start}
        viewport={{ once: true }}
        aria-live="polite"
        role="status"
      />
    );
  }
  return <span ref={ref} aria-live="polite" role="status" />;
}

export default function PartenairesPage() {
  const reduce = useReducedMotion();

  return (
    <main className="min-h-dvh bg-app text-app scroll-smooth">
      {/* HERO */}
      <section className="border-b border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Devenir partenaire Dispharma
            </h1>
            <p className="mt-4 text-app max-w-2xl">
              Dispharma accompagne les <strong>laboratoires</strong> et les <strong>professionnels de la distribution pharmaceutique</strong> avec une logistique certifiée, une <strong>chaîne du froid</strong> maîtrisée et une <strong>traçabilité</strong> claire.
            </p>

            <div className="mt-8 flex justify-center md:justify-start flex-wrap gap-4">
              <Link href="#profils" aria-label="Choisir mon profil partenaire">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Choisir mon profil
                </Button>
              </Link>
              <Link href="/contact" aria-label="Nous contacter">
                <Button variant="outline">
                  Nous contacter
                </Button>
              </Link>
            </div>
            <p className="mt-2 text-xs text-app-muted text-center md:text-left">
              Je suis : <span className="font-medium">Laboratoire</span> • <span className="font-medium">Grossiste/Pharmacie</span>
            </p>
          </div>

          <motion.div
            className="md:justify-self-end"
            initial={reduce ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={heroImg}
              alt="Partenariats Dispharma"
              width={1280}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-2xl border border-app object-cover w-full h-72 md:h-96 shadow-sm"
              placeholder="blur"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* PARTENARIATS — chiffres animés */}
      <section className="border-b border-app bg-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Nos partenariats</h2>
            <p className="mt-2 text-app-muted max-w-prose">Des collaborations actives et durables.</p>
          </AnimatedInView>

          {!SPLIT_BY_PROFILE ? (
            <div className="mt-6 rounded-2xl border border-app bg-card p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl font-semibold text-orange-600 leading-none">
                <AnimatedNumber to={120} triggerOnView />+
              </div>
              <div className="mt-2 text-sm text-app">Partenariats actifs (Laboratoires & Grossistes)</div>
              <p className="mt-2 text-[11px] text-app-muted">Chiffre indicatif mis à jour trimestriellement.</p>
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-app bg-card p-6 text-center">
                  <div className="text-4xl md:text-5xl font-semibold text-orange-600 leading-none">
                    <AnimatedNumber to={48} triggerOnView />+
                  </div>
                  <div className="mt-2 text-sm text-app">Laboratoires partenaires</div>
                </div>
                <div className="rounded-2xl border border-app bg-card p-6 text-center">
                  <div className="text-4xl md:text-5xl font-semibold text-orange-600 leading-none">
                    <AnimatedNumber to={72} triggerOnView />+
                  </div>
                  <div className="mt-2 text-sm text-app">Grossistes partenaires</div>
                </div>
                <div className="rounded-2xl border border-app bg-card p-6 text-center col-span-2 md:col-span-1">
                  <div className="text-4xl md:text-5xl font-semibold text-orange-600 leading-none">
                    <AnimatedNumber to={7} triggerOnView />+
                  </div>
                  <div className="mt-2 text-sm text-app">Pays couverts</div>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-app-muted text-center">Chiffres indicatifs mis à jour trimestriellement.</p>
            </>
          )}
        </div>
      </section>

      {/* ATOUTS — Photo entrepôt + 4 cartes */}
      <section id="atouts" className="border-b border-app bg-app scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <AnimatedInView delay={0.1}>
            <motion.div
              className="relative"
              initial={reduce ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src={entrepotImg}
                alt="Entrepôt Dispharma — stockage et logistique"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="rounded-2xl border border-app object-cover w-full h-72 md:h-[460px] shadow-sm"
                placeholder="blur"
              />
              <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 border px-2.5 py-1 text-xs text-neutral-800">
                Entrepôt certifié
              </span>
            </motion.div>
          </AnimatedInView>

          <div>
            <AnimatedInView>
              <h2 className="text-2xl md:text-3xl font-semibold">Nos atouts pour nos partenaires</h2>
              <p className="mt-2 text-app-muted max-w-prose">Ce qui rend la collaboration simple, sûre et efficace.</p>
            </AnimatedInView>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              {[
                { icon: "/icons/truck.svg", t: "Fiabilité logistique", d: "Approvisionnement fiable en Côte d’Ivoire et en Afrique." },
                { icon: "/icons/thermo.svg", t: "Chaîne du froid", d: "2–8°C / 15–25°C, conditionnements adaptés." },
                { icon: "/icons/data.svg", t: "Traçabilité produits", d: "Suivi lots & DLU + ventes (via extranet laboratoire)." },
                { icon: "/icons/handshake.svg", t: "Support dédié", d: "Équipe partenaire, réponse rapide." }
              ].map((p) => (
                <AnimatedInView key={p.t} className="rounded-2xl border border-app bg-card hover-card">
                  <div className="p-5 flex items-start gap-3">
                    <Image src={p.icon} alt={p.t} width={24} height={24} />
                    <div>
                      <h3 className="font-semibold">{p.t}</h3>
                      <p className="text-sm mt-1 text-app">{p.d}</p>
                    </div>
                  </div>
                </AnimatedInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS — texte court */}
      <section id="engagements" className="border-b border-app scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 text-center">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Nos engagements</h2>
            <p className="mt-4 max-w-2xl mx-auto leading-relaxed text-app">
              Chez <strong>Dispharma</strong>, nous croyons qu’un vrai partenariat repose sur la confiance et la performance.
              Nous nous engageons à vous offrir une <strong>logistique fiable</strong>, une <strong>traçabilité complète</strong> et un
              <strong> accompagnement humain constant</strong> pour faire grandir votre activité, jour après jour.
            </p>
          </AnimatedInView>
        </div>
      </section>

      {/* PROFILS — cartes cliquables */}
      <section id="profils" className="border-b border-app bg-app scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Qui peut devenir partenaire ?</h2>
            <p className="mt-2 max-w-prose text-app-muted">Prêt à collaborer ? Choisissez votre profil partenaire pour aller plus loin.</p>
          </AnimatedInView>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Link
              href="/laboratoires"
              aria-label="Voir la page Laboratoires"
              className="group block rounded-2xl border border-app bg-card overflow-hidden hover-card"
            >
              <AnimatedInView>
                <div className="relative w-full h-44 md:h-48">
                  <Image
                    src="/partenaires/case.webp"
                    alt="Laboratoires"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-white/90 border px-2 py-0.5 text-xs text-neutral-800">
                    Profil : Laboratoire
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">Laboratoires</h3>
                  <ul className="mt-1 text-sm text-app space-y-1.5 leading-relaxed list-disc list-inside">
                    <li>Enregistrement & conformité locale</li>
                    <li>Distribution CI & export Afrique</li>
                    <li>Accès extranet dédié (suivi des ventes, stocks & traçabilité)</li>
                  </ul>
                  <div className="mt-3">
                    <span
                      aria-hidden
                      className="inline-flex items-center text-sm font-medium text-orange-700 group-hover:underline"
                    >
                      Voir la page Laboratoires <span className="ml-1">→</span>
                    </span>
                  </div>
                </div>
              </AnimatedInView>
            </Link>

            <Link
              href="/grossistes"
              aria-label="Voir la page Grossistes"
              className="group block rounded-2xl border border-app bg-card overflow-hidden hover-card"
            >
              <AnimatedInView>
                <div className="relative w-full h-44 md:h-48">
                  <Image
                    src="/grossistes/hero.webp"
                    alt="Grossistes"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-white/90 border px-2 py-0.5 text-xs text-neutral-800">
                    Profil : Grossiste
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">Grossistes</h3>
                  <ul className="mt-1 text-sm text-app space-y-1.5 leading-relaxed list-disc list-inside">
                    <li>Catalogue validé & disponibilités actualisées</li>
                    <li>Livraison fiable en CI & export</li>
                    <li>Suivi des disponibilités & expéditions</li>
                  </ul>
                  <p className="mt-2 text-xs text-app-muted">Aucun extranet requis côté grossistes.</p>
                  <div className="mt-3">
                    <span
                      aria-hidden
                      className="inline-flex items-center text-sm font-medium text-orange-700 group-hover:underline"
                    >
                      Voir la page Grossistes <span className="ml-1">→</span>
                    </span>
                  </div>
                </div>
              </AnimatedInView>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <div className="rounded-2xl border border-app bg-card p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-xl md:text-2xl font-semibold">Parlons de votre projet</div>
              <p className="text-sm md:text-base mt-1 text-app">
                Réponse sous 48h par un conseiller Dispharma.
              </p>
            </div>
            <div>
              <Link href="/contact">
                <Button className="h-11 w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white">
                  Parler à un conseiller
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}