import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10 grid md:grid-cols-4 gap-6">
        <div>
          <div className="font-semibold text-lg">Dispharma</div>
          <div className="mt-2 h-[2px] w-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
          <p className="mt-2 text-sm text-neutral-400">
            Distribution pharmaceutique — qualité, traçabilité et logistique moderne.
          </p>
        </div>

        <nav aria-label="Navigation footer">
          <div className="font-medium">Navigation</div>
          <ul className="mt-2 space-y-0.5 text-sm text-neutral-300">
            <li><Link href="/partenaires" className="hover:underline">Pourquoi devenir partenaire</Link></li>
            <li><Link href="/laboratoires" className="hover:underline">Laboratoires</Link></li>
            <li><Link href="/grossistes" className="hover:underline">Grossistes</Link></li>
            <li><Link href="/a-propos" className="hover:underline">À propos</Link></li>
            <li><Link href="/actualites" className="hover:underline">Actualités</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Liens légaux">
          <div className="font-medium">Légal</div>
          <ul className="mt-2 space-y-0.5 text-sm text-neutral-300">
            <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:underline">Confidentialité</Link></li>
          </ul>
        </nav>

        <div>
          <div className="font-medium">Contact</div>
          <ul className="mt-2 space-y-0.5 text-sm text-neutral-300">
            <li>Abidjan, Côte d’Ivoire</li>
            <li><a href="tel:+2250700000000" className="hover:underline">+225 07 00 00 00</a></li>
            <li><a href="mailto:contact@dispharma-ci.com" className="hover:underline">contact@dispharma-ci.com</a></li>
            <li>
              <span className="rounded bg-neutral-900 px-2 py-0.5 text-[12px]">Lun–Ven · 08h00–17h00</span>
            </li>
          </ul>
          <div className="mt-3 text-sm text-neutral-300">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            <span className="mx-2">•</span>
            <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
            <span className="mx-2">•</span>
            <a href="mailto:contact@dispharma-ci.com" className="hover:underline">Email</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-xs text-neutral-400 py-3 text-center">
        © {new Date().getFullYear()} Dispharma — Tous droits réservés.
      </div>
    </footer>
  );
}