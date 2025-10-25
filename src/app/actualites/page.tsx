import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedInView from "@/components/AnimatedInView";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Actualités — Dispharma",
  description:
    "Communiqués, annonces et événements de Dispharma : nouveautés partenaires, extranet, logistique et conformité.",
};

type Post = {
  title: string;
  href: string;
  date: string; // ISO (YYYY-MM-DD) ou lisible
  category: "Article" | "Communiqué" | "Événement";
  excerpt: string;
  cover: string;
};

const posts: Post[] = [
  {
    title: "Nouveau partenariat laboratoire — couverture élargie",
    href: "/actualites/nouveau-partenariat",
    date: "2025-09-30",
    category: "Communiqué",
    excerpt:
      "Dispharma étend son réseau de distribution grâce à un accord stratégique avec un laboratoire du secteur santé.",
    cover: "/actualites/communique.webp",
  },
  {
    title: "Extranet : nouvelles fonctionnalités de suivi",
    href: "/actualites/extranet-nouvelles-fonctionnalites",
    date: "2025-08-12",
    category: "Article",
    excerpt:
      "Mises à jour de l’espace pro : suivi en temps réel, documents enrichis et notifications configurables.",
    cover: "/actualites/extranet.webp",
  },
  {
    title: "Salon professionnel — Abidjan Santé Logistique",
    href: "/actualites/salon-abidjan-sante-logistique",
    date: "2025-07-03",
    category: "Événement",
    excerpt:
      "Retrouvez l’équipe Dispharma pour des démonstrations extranet et des retours d’expérience terrain.",
    cover: "/actualites/salon.webp",
  },
];

export default function ActualitesPage() {
  // ---- Sélection de l’actu “à la une” : aujourd’hui sinon la plus récente
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = new Date();
  const todays = sorted.filter((p) => isSameDay(new Date(p.date), today));
  const featured = (todays.length ? todays : sorted)[0];

  // Liste sans doublon si l’actu à la une est aussi dans “Dernières publications”
  const list = posts.filter((p) => p.href !== featured.href);

  return (
    <main className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* HERO */}
      <section className="border-b dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <AnimatedInView>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Actualités & communiqués</h1>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 max-w-prose">
              Suivez les actualités liées à la disponibilité des produits de santé, à la logistique pharmaceutique et aux initiatives favorisant un meilleur accès aux médicaments en Afrique. 
              Dispharma s’engage, à son échelle, pour une chaîne d’approvisionnement fiable et responsable. 
              Pour toute question ou collaboration, contactez‑nous à
              <a href="mailto:contact@dispharma-ci.com" className="underline underline-offset-2 ml-1">contact@dispharma-ci.com</a>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/partenaires"><Button className="bg-orange-600 hover:bg-orange-700">Programme Partenaires</Button></Link>
              <Link href="/contact"><Button variant="outline">Nous contacter</Button></Link>
            </div>
          </AnimatedInView>

          {/* À la une : actu du jour sinon la plus récente */}
          <AnimatedInView delay={0.12} className="relative rounded-2xl overflow-hidden border bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
            <Link
              href={featured.href}
              aria-label={`À la une : ${featured.category} — ${featured.title}`}
              className="group block relative"
            >
              <Image
                src={featured.cover}
                alt={featured.title}
                width={1280}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Badge catégorie */}
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-neutral-700 border dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-200">
                À la une · {featured.category}
              </div>
              {/* Dégradé + titre */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow-sm">
                <h3 className="font-semibold line-clamp-2">{featured.title}</h3>
                <div className="text-xs text-white/80 mt-0.5">
                  {new Date(featured.date).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </Link>
          </AnimatedInView>
        </div>
      </section>

      {/* LISTE D'ARTICLES */}
      <section>
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <AnimatedInView>
            <SectionHeader title="Dernières publications" />
          </AnimatedInView>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((post, i) => (
              <AnimatedInView key={post.href} delay={0.06 * i} className="group rounded-2xl border bg-white overflow-hidden hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-800">
                <Link href={post.href} aria-label={`${post.category} — ${post.title}`} className="block">
                  <div className="relative h-40">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-neutral-700 border">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{new Date(post.date).toLocaleDateString("fr-FR")}</div>
                    <h3 className="mt-1 font-semibold line-clamp-2">{post.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-orange-600">
                      <span className="font-medium">Lire</span>
                      <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              </AnimatedInView>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVES / CATEGORIES (placeholder) */}
      <section className="border-t bg-neutral-50/60 dark:bg-neutral-950 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 grid md:grid-cols-3 gap-8">
          <AnimatedInView className="rounded-2xl border bg-white p-6 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="text-sm font-semibold">Catégories</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li><Link className="hover:underline" href="#">Articles</Link></li>
              <li><Link className="hover:underline" href="#">Communiqués</Link></li>
              <li><Link className="hover:underline" href="#">Événements</Link></li>
            </ul>
          </AnimatedInView>

          <AnimatedInView className="rounded-2xl border bg-white p-6 md:col-span-2 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="text-sm font-semibold">À propos de Dispharma</div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Dispharma relie laboratoires, entrepôts et grossistes à travers une logistique certifiée et une traçabilité numérique. Contact presse :
              <a href="mailto:contact@dispharma-ci.com" className="underline underline-offset-2 ml-1">contact@dispharma-ci.com</a>.
            </p>
            <div className="mt-4">
              <Link href="/partenaires"><Button variant="outline">Programme Partenaires</Button></Link>
            </div>
          </AnimatedInView>
        </div>
      </section>
    </main>
  );
}