"use client";
import Link from "next/link";
import BaseImage from "@/components/ui/BaseImage";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/pratique", label: "Pratique" },
  { href: "/galerie", label: "Galerie" },
  { href: "/apropos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <footer className="relative mt-24 pt-12 bg-gradient-to-b from-primary-50 via-primary-100 to-primary-200 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-900 border-t border-primary-200/70 dark:border-secondary-700 text-secondary-800 dark:text-primary-200">
      {/* Decorative top accent bar */}
      <div aria-hidden className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-500 via-tertiary-500 to-primary-500 dark:from-brand-400 dark:via-tertiary-400 dark:to-primary-400" />

      {/* Soft radial glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-[0.15] [mask-image:radial-gradient(circle_at_40%_30%,black,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid gap-12 lg:gap-16 md:grid-cols-3 text-center md:text-left">
          {/* Brand / identity */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-brand-500/20 bg-white/70 dark:bg-secondary-800 shadow">
                <BaseImage
                  src="images/directly_useful/logowap.png"
                  alt="Logo WAP"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </span>
              <span className="font-display text-2xl font-bold tracking-wide text-brand-700 dark:text-brand-400">
                WAP
              </span>
            </div>
            <p className="text-sm leading-relaxed text-secondary-700 dark:text-secondary-300">
              Karaté Wado‑Ryu & Ju‑Jutsu traditionnel.
            </p>
           
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation pied de page" className="space-y-4">
            <h3 className="font-semibold text-secondary-900 dark:text-primary-100 tracking-wide text-sm uppercase">Club</h3>
            <ul className="flex flex-wrap md:flex-col gap-2 md:gap-2 justify-center md:justify-start">
              {navLinks.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-flex items-center rounded-full px-4 py-2 text-sm transition motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2
                        ${active
                          ? "bg-brand-500/20 ring-1 ring-brand-500/30 text-secondary-900 dark:text-primary-200 font-semibold"
                          : "text-brand-600 dark:text-brand-400 hover:bg-primary-100/70 dark:hover:bg-secondary-700/60 hover:text-brand-700 dark:hover:text-primary-200"}`}
                    >
                      <span className="relative">
                        {l.label}
                        <span
                          aria-hidden
                          className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 motion-safe:transition-transform motion-safe:duration-300
                            ${active ? "scale-x-100 bg-brand-600/70 dark:bg-brand-400/70" : "group-hover:scale-x-100 bg-brand-500/60"}`}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Trial / contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-secondary-900 dark:text-primary-100 tracking-wide text-sm uppercase">
              Cours d’essai
            </h3>
            <p className="text-sm text-secondary-700 dark:text-secondary-300 leading-relaxed">
              Des cours d’essai sont proposés. Merci de prendre contact au préalable.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-brand-600/90 hover:bg-brand-600 text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-50 dark:focus-visible:ring-offset-secondary-900 transition"
            >
              Demander un essai
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 mb-6 h-px w-full bg-gradient-to-r from-transparent via-primary-400/40 dark:via-secondary-600/40 to-transparent" aria-hidden />

        {/* Bottom bar */}
        <div className="pb-10 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-secondary-600 dark:text-secondary-400">
          <p>&copy; {year} Wado Academy Paris. Tous droits réservés.</p>
          <p className="flex items-center gap-2 text-[11px] text-secondary-500 dark:text-secondary-500">
            <span>Propulsé par <strong className="font-semibold">Next.js</strong> & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
