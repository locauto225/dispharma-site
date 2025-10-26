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
    <main className="min-h-dvh bg-app text-app">
      {/* HERO */}
      <section className="border-b border-app">
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
                <Button className="h-11 bg-orange-600 hover:bg-orange-700 text-white">
                  Appeler
                </Button>
              </Link>
              <Link href="mailto:contact@dispharma.ci">
                <Button variant="outline" className="h-11">
                  Envoyer un email
                </Button>
              </Link>
              <Link
                href="https://maps.google.com/?q=Dispharma"
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center rounded-lg border border-app px-4 py-2 text-sm hover:bg-white/60 dark:hover:bg-white/10"
              >
                Itinéraire Google Maps
              </Link>
            </div>

            <p className="mt-3 text-sm text-app-muted">
              <span className="font-medium">Horaires</span> : 8h–17h (du lundi au vendredi)
            </p>
          </div>

          <div className="md:justify-self-end">
            <Image
              src="/contact/hero.webp"
              alt="Équipe support Dispharma"
              width={1280}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-72 md:h-96 object-cover rounded-2xl border border-app bg-card shadow-sm"
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* COORDONNÉES */}
      <section className="border-b bg-app border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <SectionHeader
            title="Coordonnées"
            subtitle="Choisissez le canal qui vous convient, notre équipe vous oriente rapidement."
          />

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Téléphone */}
            <div className="rounded-2xl border border-app bg-card p-5">
              <div className="text-sm font-semibold">Téléphone</div>
              <div className="mt-1 text-app">
                <Link className="hover:underline" href="tel:+225000000000">
                  +225 00 00 00 00 00
                </Link>
              </div>
              <div className="mt-2 text-xs text-app-muted">Ouverts 8h–17h (lun–ven)</div>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-app bg-card p-5">
              <div className="text-sm font-semibold">Email</div>
              <div className="mt-1 text-app">
                <Link className="hover:underline" href="mailto:contact@dispharma.ci">
                  contact@dispharma.ci
                </Link>
              </div>
              <div className="mt-2 text-xs text-app-muted">Réponse sous 48h</div>
            </div>

            {/* Adresse */}
            <div className="rounded-2xl border border-app bg-card p-5">
              <div className="text-sm font-semibold">Adresse</div>
              <div className="mt-1 text-app">Abidjan, Côte d’Ivoire</div>
              <div className="mt-3">
                <Link
                  href="https://maps.google.com/?q=Dispharma"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center text-sm font-medium text-orange-600 hover:underline"
                >
                  Ouvrir dans Google Maps →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="formulaire" className="border-b border-app scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <SectionHeader
              title="Envoyez-nous un message"
              subtitle="Indiquez votre motif, nous revenons vers vous sous 48h. Plus vous êtes précis, plus notre réponse sera utile."
            />
            <ul className="mt-4 space-y-2 text-sm text-app">
              <li>• Partenariat & solutions Dispharma</li>
              <li>• Catalogue (gammes / références)</li>
              <li>• Import, stockage, traçabilité</li>
            </ul>
            <p className="mt-3 text-xs text-app-muted">
              Données traitées pour répondre à votre demande. Pas de communication à des tiers.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-app bg-card p-5 md:p-6">
              <LeadForm defaultMotif="Découvrir nos solutions" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-app border-t border-app">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <div className="rounded-2xl border border-app bg-card p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-xl md:text-2xl font-semibold">Besoin d’un échange direct ?</div>
              <p className="text-app-muted text-sm md:text-base mt-1">
                Un conseiller Dispharma vous répond. Ouverts 8h–17h (lun–ven).
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="tel:+225000000000">
                <Button className="h-11 w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white">
                  Appeler
                </Button>
              </Link>
              <Link href="/partenaires">
                <Button variant="outline" className="h-11 w-full md:w-auto">
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