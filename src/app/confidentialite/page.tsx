import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import AnimatedInView from "../../components/AnimatedInView";

export const metadata: Metadata = {
  title: "Confidentialité & Données personnelles | Dispharma",
  description: "Politique de confidentialité et gestion des données personnelles de Dispharma — conformité RGPD et respect de la vie privée.",
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-dvh bg-app text-app scroll-smooth">
      <section className="border-b border-app bg-app">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-16">
          <AnimatedInView>
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Politique de confidentialité</h1>
            <p className="text-app-muted text-sm mb-8">
              Cette politique décrit la manière dont Dispharma collecte, utilise et protège vos données personnelles.
            </p>

            <div className="space-y-6 text-[15px] leading-relaxed">
              <div>
                <h2 className="text-lg font-semibold mb-1">1. Collecte des données</h2>
                <p>
                  Nous collectons uniquement les données nécessaires au bon fonctionnement du site et à la gestion de nos relations commerciales : 
                  formulaires de contact, demande d’accès extranet ou communication professionnelle.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-1">2. Utilisation des données</h2>
                <p>
                  Vos données sont utilisées exclusivement par Dispharma pour répondre à vos demandes,
                  assurer la gestion du partenariat et vous informer de nos actualités, sauf opposition de votre part.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-1">3. Protection et sécurité</h2>
                <p>
                  Dispharma met en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données 
                  contre tout accès non autorisé, perte ou divulgation.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-1">4. Conservation</h2>
                <p>
                  Les données sont conservées uniquement le temps nécessaire à la finalité du traitement,
                  conformément à la réglementation en vigueur.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-1">5. Vos droits</h2>
                <p>
                  Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition
                  concernant vos données personnelles. Vous pouvez exercer ces droits en écrivant à 
                  <a href="mailto:contact@dispharma-ci.com" className="underline"> contact@dispharma-ci.com</a>.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-1">6. Cookies</h2>
                <p>
                  Ce site utilise des cookies strictement nécessaires à son fonctionnement et à la mesure d’audience.
                  Vous pouvez gérer vos préférences via les paramètres de votre navigateur.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Link href="/contact">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">Contacter Dispharma</Button>
              </Link>
            </div>
          </AnimatedInView>
        </div>
      </section>
    </main>
  );
}