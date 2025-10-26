

import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import AnimatedInView from "../../components/AnimatedInView";

export const metadata: Metadata = {
  title: "Mentions légales | Dispharma",
  description: "Mentions légales de Dispharma — informations juridiques, hébergement et propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-dvh bg-app text-app scroll-smooth">
      <section className="border-b border-app bg-app">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">
              Mentions légales
            </h1>
            <div className="space-y-6 text-app-muted leading-relaxed">
              <p>
                Le présent site est édité par <strong>Dispharma</strong>, société spécialisée dans la
                distribution et la logistique pharmaceutique en Côte d’Ivoire.
              </p>

              <p>
                <strong>Éditeur :</strong> Dispharma SARL — Abidjan, Côte d’Ivoire.
              </p>

              <p>
                <strong>Directeur de la publication :</strong> Le responsable communication Dispharma.
              </p>

              <p>
                <strong>Hébergement :</strong> Le site est hébergé sur les serveurs sécurisés de Vercel, Inc.
                (340 S Lemon Ave #4133, Walnut, CA 91789, USA).
              </p>

              <p>
                <strong>Propriété intellectuelle :</strong> L’ensemble des contenus, textes, images, logos,
                éléments graphiques et bases de données présents sur ce site sont la propriété exclusive de
                Dispharma, sauf mention contraire. Toute reproduction, représentation ou diffusion, même
                partielle, est interdite sans autorisation écrite préalable.
              </p>

              <p>
                <strong>Responsabilité :</strong> Dispharma s’efforce d’assurer l’exactitude des informations
                diffusées, mais ne saurait être tenue responsable d’erreurs, omissions ou d’une interruption
                de disponibilité.
              </p>

              <p>
                <strong>Contact :</strong> Pour toute question relative aux mentions légales, vous pouvez nous
                écrire à <a href="mailto:contact@dispharma-ci.com" className="underline">contact@dispharma-ci.com</a>.
              </p>
            </div>

            <div className="mt-10">
              <Link href="/contact">
                <Button className="bg-orange-600 hover:bg-orange-500 text-white">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </AnimatedInView>
        </div>
      </section>
    </main>
  );
}