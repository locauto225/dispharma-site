import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-app bg-orange-50/10 dark:bg-app text-app relative shadow-inner">
      <div aria-hidden className="h-[2px] w-full bg-gradient-to-r from-orange-400/70 via-orange-500 to-orange-600/70" />
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10 grid md:grid-cols-4 gap-6">
        <div>
          <div className="font-semibold text-lg">Dispharma</div>
          <div className="mt-2 h-[2px] w-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
          <p className="mt-2 text-sm text-app-muted">
            Distribution pharmaceutique — qualité, traçabilité et logistique moderne.
          </p>
        </div>

        <nav aria-labelledby="footer-nav-heading">
          <h2 id="footer-nav-heading" className="font-medium text-base">Navigation</h2>
          <ul className="mt-2 space-y-0.5 text-sm text-app">
            <li><Link href="/partenaires" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">Pourquoi devenir partenaire</Link></li>
            <li><Link href="/laboratoires" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">Laboratoires</Link></li>
            <li><Link href="/grossistes" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">Grossistes</Link></li>
            <li><Link href="/a-propos" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">À propos</Link></li>
            <li><Link href="/actualites" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">Actualités</Link></li>
            <li><Link href="/contact" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal-heading">
          <h2 id="footer-legal-heading" className="font-medium text-base">Légal</h2>
          <ul className="mt-2 space-y-0.5 text-sm text-app">
            <li><Link href="/mentions-legales" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">Confidentialité</Link></li>
          </ul>
        </nav>

        <div>
          <div className="font-medium">Contact</div>
          <ul className="mt-2 space-y-0.5 text-sm text-app">
            <li>Abidjan, Côte d’Ivoire</li>
            <li><a href="tel:+2250700000000" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">+225 07 00 00 00</a></li>
            <li><a href="mailto:contact@dispharma-ci.com" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">contact@dispharma-ci.com</a></li>
            <li>
              <span className="rounded border border-app bg-card px-2 py-0.5 text-[12px]">Lun–Ven · 08h00–17h00</span>
            </li>
          </ul>
          <div className="mt-3 text-sm text-app">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">LinkedIn</a>
            <span className="mx-2">•</span>
            <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">WhatsApp</a>
            <span className="mx-2">•</span>
            <a href="mailto:contact@dispharma-ci.com" className="hover:underline transition-colors hover:text-orange-600 dark:hover:text-orange-400">Email</a>
          </div>
        </div>
        <div aria-hidden className="col-span-full h-px mt-4 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </div>

      <div className="border-t border-app text-xs text-app-muted py-3 text-center">
        © {new Date().getFullYear()} Dispharma — Tous droits réservés.
      </div>
    </footer>
  );
}