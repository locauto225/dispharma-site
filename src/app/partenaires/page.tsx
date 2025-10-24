// use client
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
  }, [to, triggerOnView, reduceMotion, start]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = Number(v).toLocaleString("fr-FR");
    });
    return unsub;
  }, [rounded]);

  if (triggerOnView) {
    return <motion.span ref={ref} onViewportEnter={start} viewport={{ once: true }} />;
  }
  return <span ref={ref} />;
}

export default function PartenairesPage() {
  return (
    <main className="min-h-dvh bg-white text-neutral-900 scroll-smooth dark:bg-neutral-950 dark:text-neutral-100">
      {/* HERO */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Devenir partenaire Dispharma
            </h1>
            <p className="mt-4 text-neutral-600 max-w-2xl dark:text-neutral-300">
              Dispharma accompagne les <strong>laboratoires</strong> et les <strong>professionnels de la distribution pharmaceutique</strong> avec une logistique certifiée, une <strong>chaîne du froid</strong> maîtrisée et une <strong>traçabilité</strong> claire.
            </p>

            <div className="mt-8 flex justify-center md:justify-start flex-wrap gap-4">
              <Link href="#profils" aria-label="Choisir mon profil partenaire" prefetch>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Choisir mon profil
                </Button>
              </Link>
              <Link href="/contact" aria-label="Nous contacter" prefetch>
                <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">
                  Nous contacter
                </Button>
              </Link>
            </div>
            <p className="mt-2 text-xs text-neutral-500 text-center md:text-left dark:text-neutral-400">
              Je suis : <span className="font-medium">Laboratoire</span> • <span className="font-medium">Grossiste/Pharmacie</span>
            </p>
          </div>

          <motion.div
            className="md:justify-self-end"
            initial={useReducedMotion() ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
            animate={useReducedMotion() ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={heroImg}
              alt="Partenariats Dispharma"
              width={1280}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-2xl border object-cover w-full h-72 md:h-96 shadow-sm dark:border-neutral-800"
              placeholder="blur"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* PARTENARIATS — chiffres animés */}
      <section className="border-b bg-white dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Nos partenariats</h2>
            <p className="mt-2 text-neutral-600 max-w-prose dark:text-neutral-300">Des collaborations actives et durables.</p>
          </AnimatedInView>

          {!SPLIT_BY_PROFILE ? (
            <div className="mt-6 rounded-2xl border bg-neutral-50 p-6 md:p-8 text-center dark:bg-neutral-900 dark:border-neutral-800">
              <div className="text-4xl md:text-5xl font-semibold text-orange-600 leading-none">
                <AnimatedNumber to={120} triggerOnView />+
              </div>
              <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Partenariats actifs (Laboratoires & Grossistes)</div>
              <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">Chiffre indicatif mis à jour trimestriellement.</p>
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="rounded-2xl border bg-neutral-50 p-6 text-center dark:bg-neutral-900 dark:border-neutral-800">
                  <div className="text-4xl md:text-5xl font-semibold text-orange-600 leading-none">
                    <AnimatedNumber to={48} triggerOnView />+
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Laboratoires partenaires</div>
                </div>
                <div className="rounded-2xl border bg-neutral-50 p-6 text-center dark:bg-neutral-900 dark:border-neutral-800">
                  <div className="text-4xl md:text-5xl font-semibold text-orange-600 leading-none">
                    <AnimatedNumber to={72} triggerOnView />+
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Grossistes partenaires</div>
                </div>
                <div className="rounded-2xl border bg-neutral-50 p-6 text-center col-span-2 md:col-span-1 dark:bg-neutral-900 dark:border-neutral-800">
                  <div className="text-4xl md:text-5xl font-semibold text-orange-600 leading-none">
                    <AnimatedNumber to={7} triggerOnView />+
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Pays couverts</div>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-neutral-500 text-center dark:text-neutral-400">Chiffres indicatifs mis à jour trimestriellement.</p>
            </>
          )}
        </div>
      </section>

      {/* ATOUTS — Photo entrepôt + 4 cartes */}
      <section id="atouts" className="border-b bg-neutral-50/60 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <AnimatedInView delay={0.1}>
            <motion.div
              className="relative"
              initial={useReducedMotion() ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
              animate={useReducedMotion() ? undefined : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src={entrepotImg}
                alt="Entrepôt Dispharma — stockage et logistique"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="rounded-2xl border object-cover w-full h-72 md:h-[460px] dark:border-neutral-800"
                placeholder="blur"
              />
              <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 border px-2.5 py-1 text-xs text-neutral-800 dark:bg-neutral-100 dark:text-neutral-900">
                Entrepôt certifié
              </span>
            </motion.div>
          </AnimatedInView>

          <div>
            <AnimatedInView>
              <h2 className="text-2xl md:text-3xl font-semibold">Nos atouts pour nos partenaires</h2>
              <p className="mt-2 text-neutral-600 max-w-prose dark:text-neutral-300">Ce qui rend la collaboration simple, sûre et efficace.</p>
            </AnimatedInView>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              {[
                { icon: "/icons/truck.svg", t: "Fiabilité logistique", d: "Approvisionnement fiable en Côte d’Ivoire et en Afrique." },
                { icon: "/icons/thermo.svg", t: "Chaîne du froid", d: "2–8°C / 15–25°C, conditionnements adaptés." },
                { icon: "/icons/data.svg", t: "Traçabilité produits", d: "Suivi lots & DLU + ventes (via extranet laboratoire)." },
                { icon: "/icons/handshake.svg", t: "Support dédié", d: "Équipe partenaire, réponse rapide." }
              ].map((p) => (
                <AnimatedInView key={p.t} className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800">
                  <div className="p-5 flex items-start gap-3">
                    <Image src={p.icon} alt={p.t} width={24} height={24} />
                    <div>
                      <h3 className="font-semibold">{p.t}</h3>
                      <p className="text-sm text-neutral-700 mt-1 dark:text-neutral-300">{p.d}</p>
                    </div>
                  </div>
                </AnimatedInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS — texte court */}
      <section id="engagements" className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 text-center">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Nos engagements</h2>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Chez <strong>Dispharma</strong>, nous croyons qu’un vrai partenariat repose sur la confiance et la performance.
              Nous nous engageons à vous offrir une <strong>logistique fiable</strong>, une <strong>traçabilité complète</strong> et un 
              <strong> accompagnement humain constant</strong> pour faire grandir votre activité, jour après jour.
            </p>
          </AnimatedInView>
        </div>
      </section>

      {/* PROFILS — cartes cliquables */}
      <section id="profils" className="border-b bg-neutral-50/60 scroll-mt-24 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Qui peut devenir partenaire ?</h2>
            <p className="mt-2 text-neutral-600 max-w-prose dark:text-neutral-300">Prêt à collaborer ? Choisissez votre profil partenaire pour aller plus loin.</p>
          </AnimatedInView>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Link
              href="/laboratoires"
              aria-label="Voir la page Laboratoires"
              prefetch
              className="group block rounded-2xl border bg-white overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 transition-transform duration-300 hover:shadow-md hover:-translate-y-1 dark:bg-neutral-900 dark:border-neutral-800"
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
                  <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-white/90 border px-2 py-0.5 text-xs dark:bg-neutral-100 dark:text-neutral-900">
                    Profil : Laboratoire
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">Laboratoires</h3>
                  <ul className="mt-1 text-sm text-neutral-700 space-y-1.5 leading-relaxed list-disc list-inside dark:text-neutral-300">
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
              prefetch
              className="group block rounded-2xl border bg-white overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 transition-transform duration-300 hover:shadow-md hover:-translate-y-1 dark:bg-neutral-900 dark:border-neutral-800"
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
                  <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-white/90 border px-2 py-0.5 text-xs dark:bg-neutral-100 dark:text-neutral-900">
                    Profil : Grossiste
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">Grossistes</h3>
                  <ul className="mt-1 text-sm text-neutral-700 space-y-1.5 leading-relaxed list-disc list-inside dark:text-neutral-300">
                    <li>Catalogue validé & disponibilités actualisées</li>
                    <li>Livraison fiable en CI & export</li>
                    <li>Suivi des disponibilités & expéditions</li>
                  </ul>
                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Aucun extranet requis côté grossistes.</p>
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
          <div className="rounded-2xl border bg-white p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:bg-neutral-900 dark:border-neutral-800">
            <div>
              <div className="text-xl md:text-2xl font-semibold">Parlons de votre projet</div>
              <p className="text-neutral-600 text-sm md:text-base mt-1 dark:text-neutral-300">Réponse sous 48h par un conseiller Dispharma.</p>
            </div>
            <div>
              <Link href="/contact" prefetch>
                <Button className="h-11 w-full md:w-auto bg-orange-600 hover:bg-orange-700">
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