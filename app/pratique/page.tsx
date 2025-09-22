// app/pratique/page.tsx
import Link from "next/link";
import BaseImage from "@/components/ui/BaseImage";
import Tarifs from "@/components/tarifs";
import { schedule } from "@/data/schedule";
import { gearList } from "@/data/gear";
import { faqList } from "@/data/faq";
import { levels } from "@/data/levels";
import CTA from "@/components/cta-banner";

export const metadata = {
  title: "Pratique – Wado Academy Paris",
  description:
    "Infos pratiques : lieux d’entraînement, horaires, tenue, niveaux et contact pour Wado Academy Paris.",
};

const cleanClub = (club: string) => club.replace(/[>]+$/g, "");

export default function PratiquePage() {
  return (
    <main className="relative max-w-7xl mx-auto px-4 md:px-6 py-0 md:py-12">
      {/* Removed bg-primary-50 / dark:bg-secondary-800 from here so body owns the background */}
      {/* Subtle secondary tint (optional – keep or remove) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(var(--color-primary-200,142 177 199)/0.25) 0%, transparent 65%)",
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl mb-14 min-h-[400px] md:min-h-[520px] lg:min-h-[600px] flex items-center z-10 ring-1 ring-primary-200 dark:ring-secondary-700 bg-secondary-900/60 dark:bg-secondary-900/70">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <BaseImage
              src="/images/directly_useful/OtsukaCalifornia_.jpg"
              alt=""
              aria-hidden
              decoding="async"
              fetchPriority="high"
              fill
              objectFit="cover"
              className="object-cover object-top brightness-90"
              sizes="100vw"
              priority
            />
          </div>
          {/* Brand‑tinted overlay for consistency */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-700/70 via-brand-600/50 to-brand-500/25 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 via-secondary-900/30 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-14 py-16 md:py-28 text-white max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl leading-tight drop-shadow-sm text-brand-50">
            Pratique
          </h1>
          <p className="mt-5 max-w-2xl text-brand-50/90">
            Tout ce qu’il faut pour venir s’entraîner : lieux, horaires, tenue
            et conseils.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-primary-600 hover:bg-primary-500 active:bg-primary-600/90 px-5 py-3 text-white font-semibold shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-900/40"
            >
              Cours d’essai
            </Link>
            <Link
              href="#lieux-horaires"
              className="rounded-xl border border-brand-300/60 text-brand-50/95 hover:bg-brand-300/10 px-5 py-3 font-semibold backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-900/50"
            >
              Voir le planning
            </Link>
          </div>
        </div>
      </section>

      {/* Lieux & horaires */}
      <section id="lieux-horaires" className="mb-14">
        <h2 className="text-3xl font-bold tracking-tight text-brand-300 dark:text-brand-700">
          Lieux & horaires
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((s, i) => (
            <article
              key={`${s.day}-${i}`}
              className={`group rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all ${
                s.club === "WAP"
                  ? "bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-700"
                  : "bg-secondary-50 dark:bg-secondary-800 border-secondary-200 dark:border-secondary-700"
              }`}
            >
              <header className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-secondary-600 dark:text-primary-100 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                  {s.day}
                </h3>
                <span className="text-[10px] uppercase tracking-wide rounded-full bg-primary-100 dark:bg-secondary-700 text-primary-700 dark:text-primary-200 px-2 py-1 font-medium">
                  {cleanClub(s.club)}
                </span>
              </header>
              <p className="mt-3 font-medium text-primary-800 dark:text-primary-50">
                {s.time}
              </p>
              <p className="text-primary-600 dark:text-primary-200">
                {s.mapUrl ? (
                  <Link
                    href={s.mapUrl}
                    target="_blank"
                    className="text-brand-600 hover:text-brand-700 transition-colors font-medium"
                  >
                    {s.venue}
                  </Link>
                ) : (
                  s.venue
                )}
              </p>
              <p className="text-sm text-secondary-700 dark:text-primary-300">
                {s.address}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-secondary-300 dark:text-primary-700">
          * Les créneaux peuvent évoluer selon la saison et la disponibilité des
          gymnases.
        </p>
      </section>

      {/* Tenue & matériel */}
      <section aria-labelledby="gear-title" className="mb-14">
        <div className="rounded-3xl border border-primary-200 dark:border-secondary-600 bg-white dark:bg-secondary-900 shadow-sm p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-success-50 text-success-700 ring-1 ring-success-200 dark:bg-success-400/10 dark:text-success-300 dark:ring-success-400/30 px-3 py-1 text-xs font-medium">
                Préparez votre cours
              </div>
              <h2
                id="gear-title"
                className="mt-3 text-3xl font-semibold tracking-tight text-brand-300 dark:text-brand-700"
              >
                Tenue & matériel
              </h2>
              <ul className="mt-5 space-y-3 text-secondary-700 dark:text-primary-100">
                {gearList.map((item, idx) => (
                  <li className="flex gap-3" key={idx}>
                    <span
                      aria-hidden
                      className="mt-1 text-brand-600 dark:text-brand-300"
                    >
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <BaseImage
                src="/images/directly_useful/logowap.png"
                alt="Logo du dojo"
                width={176}
                height={176}
                className="h-44 w-auto md:h-56 object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Niveaux & inscription */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold tracking-tight text-brand-300 dark:text-brand-700">
          Différentes pratiques
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {levels.map((level, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-primary-200 dark:border-secondary-600 bg-white dark:bg-secondary-900 p-6 transition-colors"
            >
              <h3 className="font-semibold text-secondary-600 dark:text-primary-100">
                {level.title}
              </h3>
              <p className="mt-2 text-primary-700 dark:text-primary-200">
                {level.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8"></div>
      </section>


      <section className="mb-14">
        <h2 className="text-3xl font-bold tracking-tight text-brand-300 dark:text-brand-700">
          Tarifs & inscription
        </h2>
        <div className="mt-8 rounded-2xl border border-primary-200 dark:border-secondary-600 bg-white dark:bg-secondary-900 p-6 shadow-sm">
          <Tarifs />
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold tracking-tight text-brand-300 dark:text-brand-700">
          FAQ
        </h2>
        <div className="mt-8 space-y-4">
          {faqList.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-xl border border-primary-200 dark:border-secondary-600 bg-white dark:bg-secondary-900 p-4 transition-colors"
            >
              <summary className="cursor-pointer font-medium text-secondary-600 dark:text-primary-100 group-open:text-brand-600 dark:group-open:text-brand-300 transition-colors">
                {faq.question}
              </summary>
              <p className="mt-2 text-primary-700 dark:text-primary-200">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <CTA />
    </main>
  );
}
