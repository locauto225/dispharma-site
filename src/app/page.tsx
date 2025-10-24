"use client";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate, useSpring, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedInView from "@/components/AnimatedInView";
import LottiePlayer from "@/components/LottiePlayer";
import SectionHeader from "@/components/SectionHeader";
import CtaBanner from "@/components/CtaBanner";

// Compteur
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
  const reduce = useReducedMotion();

  const start = () => {
    if (reduce) {
      // Respecte prefers-reduced-motion : pas d'animation, valeur finale directe
      mv.set(to);
      return;
    }
    animate(mv, to, { duration, ease: "easeOut" });
  };

  useEffect(() => {
    if (!triggerOnView) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, triggerOnView, reduce]);

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

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 h-[3px] z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(251,146,60,1) 0%, rgba(234,88,12,1) 50%, rgba(124,45,18,1) 100%)",
        boxShadow: "0 0 8px rgba(234,88,12,0.35)",
        transform: "translateZ(0)",
      }}
      aria-hidden
    />
  );
}

// Icônes inline
function Icon({
  name,
  className = "w-4 h-4",
}: {
  name: "lab" | "truck" | "thermo" | "doc" | "chart" | "shield";
  className?: string;
}) {
  const common = { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true as const };
  switch (name) {
    case "lab":
      return (
        <svg {...common}>
          <path d="M9 2h2v7.59l5.7 8.55A2 2 0 0 1 14.98 22H6.02a2 2 0 0 1-1.72-3.05L10 9.59V2zM8.1 20h4.8l-2.4-3.6L8.1 20z" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M3 6h11v7h2l3 3v2h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V6zm13 7V8h2l3 5h-5z" />
        </svg>
      );
    case "thermo":
      return (
        <svg {...common}>
          <path d="M11 5a3 3 0 1 1 6 0v7.09A5 5 0 1 1 11 19V5zm2 0a1 1 0 1 1 2 0v8.17a3 3 0 1 1-2 0V5z" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8 10h8v2H8v-2zm0 4h8v2H8v-2zM13 3.5L18.5 9H13V3.5z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3h2v18H3V3zm4 10h2v8H7v-8zm4-6h2v14h-2V7zm4 4h2v10h-2V11zm4-6h2v16h-2V5z" />
        </svg>
      );
    case "shield":
    default:
      return (
        <svg {...common}>
          <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
        </svg>
      );
  }
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.32, 0.2]);

  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <ScrollProgressBar />

      {/* HERO */}
      <section id="hero" className="relative">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              La distribution pharmaceutique,{" "}
              <span className="text-orange-600">maîtrisée de bout en bout</span>
            </h1>

            <AnimatedInView delay={0.1}>
              <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-300">
                <strong>Dispharma</strong> relie <strong>laboratoires</strong> et <strong>grossistes/pharmacies</strong> avec une mise sur le marché
                <em> clé en main</em> : enregistrement, stockage sous températures contrôlées (2–8°C / 15–25°C),
                distribution dans toute l’Afrique et suivi des ventes en temps réel.
                <span className="hidden md:inline"> Nous opérons. Vous développez la marque.</span>
              </p>

              <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-200">
                <strong>Laboratoires&nbsp;:</strong> accès rapide au marché ivoirien <em>et</em> déploiement en Afrique, pilotage opérationnel &amp; commercial, visibilité de la performance.
                <br className="hidden md:block" />
                <strong>Grossistes / Pharmacies&nbsp;:</strong> disponibilité produits, traçabilité de bout-en-bout, couverture Afrique et accompagnement dédié.
              </p>
            </AnimatedInView>

            <AnimatedInView delay={0.2}>
              <div className="mt-6 flex flex-wrap gap-3">
                {/* CTA principal : ancre vers Solutions */}
                <Link href="#solutions">
                  <Button className="bg-orange-600 hover:bg-orange-700 transition-transform hover:scale-[1.02]">
                    Découvrir nos solutions
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">
                    Parler à un conseiller
                  </Button>
                </Link>
              </div>
            </AnimatedInView>
          </div>

          <AnimatedInView delay={0.35}>
            <div className="relative h-72 md:h-[22rem] flex items-center justify-center isolate overflow-visible">
              <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ y, scale, opacity }}>
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%]"
                  style={{ background: "radial-gradient(120% 120% at 50% 50%, rgba(255,126,0,0.32) 0%, rgba(255,126,0,0.18) 40%, transparent 70%)" }}
                />
              </motion.div>

              <Suspense>
                <LottiePlayer
                  src="/animations/chain.json"
                  loop
                  speed={0.8}
                  playOnView={false}
                  ariaLabel="Animation de chaîne logistique pharmaceutique"
                  posterSrc="/animations/chain-poster.webp"
                  posterAlt="Illustration statique de la chaîne logistique"
                  className="relative z-10 max-h-[65%] md:max-h-[80%] w-auto"
                />
              </Suspense>
            </div>
          </AnimatedInView>
        </div>

      </section>

      {/* CONFORMITÉ — bloc discret sous le hero */}
      <section
        id="conformite"
        className="border-t dark:border-neutral-800/60 bg-white/40 dark:bg-neutral-950/30 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5">
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">Conformité&nbsp;:</span>
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


      {/* SOLUTIONS — listes de services (NON CLIQUABLES) avec fond bleu + icônes */}
      <section id="solutions" className="border-t bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <SectionHeader
              title="Nos services par profil"
              subtitle="Découvrez concrètement ce que Dispharma fait pour vous."
            />
          </AnimatedInView>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {/* Laboratoires */}
            <AnimatedInView className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-blue-100/40 dark:from-blue-900/25 dark:to-blue-900/10 dark:border-blue-800 p-6 cursor-default shadow-none">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-200">
                  <Icon name="lab" className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Laboratoires</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200">
                Implantation CI & export : conformité, opérations et pilotage commercial.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="doc" /></span>
                  <span>Import conforme & gestion DGI (documents, autorisations)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="doc" /></span>
                  <span>Conformité <strong>AIRP</strong> validée (dossier, procédures & suivi)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="truck" /></span>
                  <span>Mise sur le marché CI & distribution dans toute l’Afrique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="thermo" /></span>
                  <span>Stockage 2–8°C / 15–25°C, traçabilité lots & DLU</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="chart" /></span>
                  <span>Reporting ventes & performance, extranet partenaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="truck" /></span>
                  <span>Export maîtrisé</span>
                </li>
              </ul>
            </AnimatedInView>

            {/* Grossistes & Pharmacies — sans extranet */}
            <AnimatedInView className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-blue-100/40 dark:from-blue-900/25 dark:to-blue-900/10 dark:border-blue-800 p-6 cursor-default shadow-none">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-200">
                  <Icon name="truck" className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Grossistes & Pharmacies</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200">
                Approvisionnement fiable en Côte d’Ivoire et dans toute l’Afrique.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="truck" /></span>
                  <span>Logistique réactive et sécurisée sur l’ensemble du territoire</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="doc" /></span>
                  <span>Export : documents, certificats d’origine, Incoterms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="thermo" /></span>
                  <span>Chaîne du froid garantie & traçabilité bout-en-bout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="doc" /></span>
                  <span>Suivi commandes par <strong>notifications SMS/Email</strong> & BL/Factures fournies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-blue-700 dark:text-blue-300"><Icon name="shield" /></span>
                  <span>Interlocuteur commercial dédié</span>
                </li>
              </ul>
            </AnimatedInView>
          </div>

          {/* CTA centralisé après les services */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="#parcours">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Choisir mon profil
              </Button>
            </Link>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
              Besoin d’un aperçu global ?{" "}
              <Link href="/partenaires" className="underline underline-offset-4 hover:text-orange-700">Pourquoi devenir partenaire</Link>
            </p>
          </div>
        </div>
      </section>

      {/* IDENTIFICATION — clic par profil + entrepôt au centre */}
      <section id="parcours" className="border-t dark:border-neutral-800 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <SectionHeader
              title="Choisissez votre profil"
              subtitle="Cliquez sur votre profil pour entrer : l’Entrepôt Dispharma relie et sécurise les flux entre les deux."
            />
          </AnimatedInView>


          <div id="profils-grid" className="mt-10 grid gap-6 md:grid-cols-[1fr_auto_1fr] items-stretch">
            {/* LABORATOIRES */}
            <AnimatedInView>
              <Link
                href="/laboratoires"
                aria-label="Profil Laboratoires"
                className="group block h-full rounded-2xl border p-6 hover:shadow-lg transition dark:border-neutral-800"
              >
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-50/20 to-transparent z-[1] pointer-events-none" />
                  <Image
                    src="/roles/labo.webp"
                    alt="Laboratoires — production et contrôle qualité"
                    width={900}
                    height={600}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-3 font-semibold group-hover:text-orange-700 transition-colors">Laboratoires</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  Mise sur le marché CI, conformité & reporting (extranet partenaires).
                </p>
              </Link>
            </AnimatedInView>

            {/* ENTREPÔT (non cliquable) */}
            <div className="relative flex md:flex-col items-center justify-center gap-4 md:gap-3">
              <svg className="w-7 h-7 text-orange-600 md:rotate-0 rotate-90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13 5l-1.4 1.4L16.2 11H3v2h13.2l-4.6 4.6L13 19l7-7-7-7z" />
              </svg>

              <div
                aria-label="Entrepôt Dispharma — maillon central"
                className="relative overflow-hidden rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 px-0 py-0 w-[230px] md:w-[260px] shadow-sm"
              >
                <div className="relative h-36 md:h-40 w-full">
                  <Image
                    src="/roles/entrepot.webp"
                    alt="Entrepôt Dispharma"
                    fill
                    sizes="(min-width: 768px) 260px, 230px"
                    className="object-cover"
                    priority={false}
                  />
                  <span className="absolute top-2 left-2 inline-flex items-center rounded-md bg-white/85 dark:bg-neutral-900/85 px-2 py-0.5 text-[11px] font-medium border dark:border-neutral-800">
                    Maillon central
                  </span>
                </div>
                <div className="p-4 text-center">
                  <div className="text-sm font-semibold">Entrepôt Dispharma</div>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
                    Réception • Contrôle • Traçabilité • Températures 2–8°C / 15–25°C
                  </p>
                </div>
              </div>

              <svg className="w-7 h-7 text-orange-600 md:rotate-180 rotate-270" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M13 5l-1.4 1.4L16.2 11H3v2h13.2l-4.6 4.6L13 19l7-7-7-7z" />
              </svg>
            </div>

            {/* GROSSISTES */}
            <AnimatedInView>
              <Link
                href="/grossistes"
                aria-label="Profil Grossistes / Pharmacies"
                className="group block h-full rounded-2xl border p-6 hover:shadow-lg transition dark:border-neutral-800"
              >
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-50/20 to-transparent z-[1] pointer-events-none" />
                  <Image
                    src="/roles/pharmacie.webp"
                    alt="Grossistes / Pharmacies — disponibilité et service"
                    width={900}
                    height={600}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-3 font-semibold group-hover:text-orange-700 transition-colors">Grossistes / Pharmacies</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  Disponibilité & délais maîtrisés (notifications SMS/Email, documents fournis).
                </p>
              </Link>
            </AnimatedInView>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Flux : <span className="font-medium">Laboratoire</span> → <span className="font-medium">Entrepôt Dispharma</span> →{" "}
            <span className="font-medium">Grossiste / Pharmacie</span>
          </p>
        </div>
      </section>

      {/* CTA PARTENARIAT */}
      <section className="border-t bg-orange-50/40 dark:bg-orange-500/10 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <CtaBanner
            title="Programme Partenaires"
            text="Pour laboratoires, grossistes & pharmacies : traçabilité, disponibilité, chaîne du froid et accompagnement dédié."
            primary={{ label: "Découvrir nos solutions", href: "#solutions" }}
            secondary={{ label: "Parler à un conseiller", href: "/contact" }}
          />
        </div>
      </section>

      {/* CHIFFRES CLES */}
      <section id="chiffres" className="border-t bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <SectionHeader title="Nos atouts en chiffres" subtitle="Des indicateurs concrets qui témoignent de notre fiabilité." />
          </AnimatedInView>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 6, suffix: "+", label: "années d’expérience" },
              { value: 120, suffix: "+", label: "partenaires" },
              { value: 10000, suffix: "", label: "livraisons/an" },
              { value: 100, suffix: "%", label: "conformité DGI" },
            ].map((s) => (
              <AnimatedInView key={s.label} className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600">
                  <AnimatedNumber to={s.value} triggerOnView />
                  {s.suffix}
                </div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{s.label}</div>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRANET — réservé aux LABORATOIRES partenaires */}
      <section id="extranet" className="border-t dark:border-neutral-800 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <AnimatedInView>
            <SectionHeader
              title="Notre Extranet Pro"
              subtitle="Réservé aux laboratoires partenaires : suivez documents (AIRP, DGI), ventes et alertes en temps réel."
            />
            <div className="mt-6 flex gap-3">
              <Link href="/extranet">
                <Button className="bg-orange-600 hover:bg-orange-700">Demander un accès</Button>
              </Link>
              <Link href="/extranet">
                <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">En savoir plus</Button>
              </Link>
            </div>
          </AnimatedInView>

          <div className="md:justify-self-end relative rounded-2xl overflow-hidden border bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
            <Image
              src="/extranet/entrepot-login.webp"
              alt="Extranet Dispharma (laboratoires partenaires)"
              width={1280}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-80 object-cover object-[70%_28%] md:object-[70%_32%]"
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* ACTUALITES */}
      <section id="actus" className="border-t bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <div className="flex items-end justify-between">
              <div>
                <SectionHeader title="Actualités / Communiqués" subtitle="Restez informés de nos annonces clés." />
              </div>
              <Link href="/actualites">
                <Button variant="ghost" className="text-orange-600 hover:text-orange-700 px-0">
                  Voir tout →
                </Button>
              </Link>
            </div>
          </AnimatedInView>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <AnimatedInView key={i} className="rounded-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-4">
                <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800" />
                <h3 className="mt-3 font-semibold">Titre d’actualité {i}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">
                  Court résumé. Tu brancheras plus tard sur ton CMS ou tes fichiers markdown.
                </p>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t dark:border-neutral-800 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
          <AnimatedInView>
            <h2 className="text-2xl md:text-3xl font-semibold">Contactez-nous</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-prose">
              Retrouvez-nous facilement à notre entrepôt central. Nos équipes sont disponibles pour vous accompagner.
            </p>

            <div className="mt-6 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <div>
                <strong>Adresse :</strong>{" "}
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Dispharma%2C%20Abidjan%2C%20C%C3%B4te%20d%E2%80%99Ivoire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-orange-700"
                >
                  Dispharma, Abidjan, Côte d’Ivoire
                </a>
              </div>
              <div>
                <strong>Téléphone :</strong>{" "}
                <a href="tel:+2250700000000" className="underline underline-offset-2 hover:text-orange-700">
                  +225 07 00 00 00
                </a>
              </div>
              <div>
                <strong>Email :</strong>{" "}
                <a href="mailto:contact@dispharma-ci.com" className="underline underline-offset-2 hover:text-orange-700">
                  contact@dispharma-ci.com
                </a>
              </div>
              <div>
                <strong>Horaires :</strong>{" "}
                <span className="inline-flex items-center gap-2">
                  <span>Lun–Ven</span>
                  <span className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[12px]">
                    08h00 – 17h00
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Dispharma%2C%20Abidjan%2C%20C%C3%B4te%20d%E2%80%99Ivoire"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-orange-600 hover:bg-orange-700">Itinéraire</Button>
              </a>
              <a href="tel:+2250700000000">
                <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">Appeler</Button>
              </a>
              <a href="mailto:contact@dispharma-ci.com">
                <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">Email</Button>
              </a>
            </div>
          </AnimatedInView>

          <div className="rounded-2xl overflow-hidden border bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800 group">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Dispharma%2C%20Abidjan%2C%20C%C3%B4te%20d%E2%80%99Ivoire"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir l’itinéraire vers Dispharma sur Google Maps"
              className="block relative"
            >
              <Image
                src="/contact/localisation.webp"
                alt="Façade / localisation de Dispharma"
                width={1280}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-50/30 to-transparent" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}