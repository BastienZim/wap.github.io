// components/CTA.tsx
import Link from "next/link";

export default function CTA() {
  return (
    <section className="my-20">
      <div className="relative overflow-hidden rounded-2xl bg-[#FEB454] text-gray-900 shadow-lg">
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-[url('/pictotoureiffel2.png')] bg-cover bg-center opacity-10" />

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
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[#FEB454] shadow hover:bg-gray-100 transition"
            >
              Cours d’essai
            </Link>
            <Link
              href="/planning"
              className="rounded-xl border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Voir le planning
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
