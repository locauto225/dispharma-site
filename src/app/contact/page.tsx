// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import LeadForm from "@/components/LeadForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact — Dispharma",
  description:
    "Contactez Dispharma : partenariat, solutions de distribution, questions logistiques. Ouverts 8h–17h, réponse sous 48h.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* HERO */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeader
              as="h1"
              title="Contact"
              subtitle="Parlez-nous de votre besoin : partenariat, solutions, logistique. Notre équipe vous répond sous 48h (horaire : 8h–17h)."
            />

            {/* Accès rapides */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="tel:+225000000000">
                <Button className="bg-orange-600 hover:bg-orange-700">Appeler</Button>
              </Link>
              <Link href="mailto:contact@dispharma.ci">
                <Button variant="outline" className="dark:border-neutral-700 dark:hover:bg-neutral-900">
                  Envoyer un email
                </Button>
              </Link>
              <Link
                href="https://maps.google.com/?q=Dispharma"
                className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 dark:border-neutral-700"
                rel="noopener noreferrer"
                target="_blank"
              >
                Itinéraire Google Maps
              </Link>
            </div>

            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
              <span className="font-medium">Horaires</span> : 8h–17h (du lundi au vendredi)
            </p>
          </div>

          {/* Visuel statique (sans animation) — cohérent avec /partenaires */}
          <div className="md:justify-self-end">
            <Image
              src="/contact/hero.webp"
              alt="Équipe support Dispharma"
              width={1280}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-72 md:h-96 object-cover rounded-2xl border bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800 shadow-sm"
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* COORDONNÉES */}
      <section className="border-b bg-neutral-50/60 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <SectionHeader
            title="Coordonnées"
            subtitle="Choisissez le canal qui vous convient, notre équipe vous oriente rapidement."
          />

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Téléphone */}
            <div className="rounded-2xl border bg-white p-5 dark:bg-neutral-900 dark:border-neutral-800">
              <div className="text-sm font-semibold">Téléphone</div>
              <div className="mt-1 text-neutral-600 dark:text-neutral-300">
                <Link className="hover:underline" href="tel:+225000000000">
                  +225 00 00 00 00 00
                </Link>
              </div>
              <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                Ouverts 8h–17h (lun–ven)
              </div>
            </div>

            {/* Email */}
            <div className="rounded-2xl border bg-white p-5 dark:bg-neutral-900 dark:border-neutral-800">
              <div className="text-sm font-semibold">Email</div>
              <div className="mt-1 text-neutral-600 dark:text-neutral-300">
                <Link className="hover:underline" href="mailto:contact@dispharma.ci">
                  contact@dispharma.ci
                </Link>
              </div>
              <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                Réponse sous 48h
              </div>
            </div>

            {/* Adresse / Itinéraire */}
            <div className="rounded-2xl border bg-white p-5 dark:bg-neutral-900 dark:border-neutral-800">
              <div className="text-sm font-semibold">Adresse</div>
              <div className="mt-1 text-neutral-600 dark:text-neutral-300">
                Abidjan, Côte d’Ivoire {/* remplace par l’adresse exacte si tu veux */}
              </div>
              <div className="mt-3">
                <Link
                  href="https://maps.google.com/?q=Dispharma"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center text-sm font-medium text-orange-700 hover:underline"
                >
                  Ouvrir dans Google Maps →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="border-b dark:border-neutral-800 scroll-mt-24" id="formulaire">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <SectionHeader
              title="Envoyez-nous un message"
              subtitle="Indiquez votre motif, nous revenons vers vous sous 48h. Plus vous êtes précis, plus notre réponse sera utile."
            />
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              <li>• Partenariat & solutions Dispharma</li>
              <li>• Catalogue (gammes / références)</li>
              <li>• Import, stockage, traçabilité</li>
            </ul>
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
              Données traitées pour répondre à votre demande. Pas de communication à des tiers.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-white p-5 md:p-6 dark:bg-neutral-900 dark:border-neutral-800">
              {/* Par défaut, on oriente vers “Découvrir nos solutions” */}
              <LeadForm defaultMotif="Découvrir nos solutions" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section>
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <div className="rounded-2xl border bg-white p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:bg-neutral-900 dark:border-neutral-800">
            <div>
              <div className="text-xl md:text-2xl font-semibold">Besoin d’un échange direct ?</div>
              <p className="text-neutral-600 text-sm md:text-base mt-1 dark:text-neutral-300">
                Un conseiller Dispharma vous répond. Ouverts 8h–17h (lun–ven).
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="tel:+225000000000">
                <Button className="h-11 w-full md:w-auto bg-orange-600 hover:bg-orange-700">
                  Appeler
                </Button>
              </Link>
              <Link href="/partenaires">
                <Button variant="outline" className="h-11 w-full md:w-auto dark:border-neutral-700 dark:hover:bg-neutral-900">
                  Découvrir nos solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}