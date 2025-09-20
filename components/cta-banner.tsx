// components/CTA.tsx
import Link from "next/link";

export default function CTA() {
  return (
    <section className="my-20">
      <div className="relative overflow-hidden rounded-2xl bg-[#FEB454] text-secondary-900 shadow-lg">
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-[url('/images/directly_useful/pictotoureiffel2.png')] bg-cover bg-center opacity-10" />

        <div className="relative z-10 px-8 py-16 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold">
            Rejoignez <span className="font-extrabold">WAP</span> aujourd’hui
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-lg opacity-90">
            Essayez un cours gratuit cette semaine et découvrez le Wado-Ryu.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-primary-600 hover:bg-primary-100 active:bg-primary-600/90 px-6 py-3 font-semibold text-white shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEB454]"
            >
              Cours d’essai
            </Link>
            <Link
              href="/pratique"
              className="rounded-xl bg-secondary-100 hover:bg-secondary-500 active:bg-secondary-600/90 px-6 py-3 font-semibold text-white shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEB454]"
            >
              Voir le planning
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
