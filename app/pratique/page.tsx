// app/pratique/page.tsx
import Image from "next/image";
import Link from "next/link";
import { schedule } from "@/data/schedule";

export const metadata = {
  title: "Pratique – Wado Academy Paris",
  description:
    "Infos pratiques : lieux d’entraînement, horaires, tenue, niveaux et contact pour Wado Academy Paris.",
};

const cleanClub = (club: string) => club.replace(/[>]+$/g, "");

export default function PratiquePage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/OtsukaCalifornia_.jpg"
            alt="Paris"
            fill
            priority
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>
        <div className="relative container mx-auto px-6 py-24 text-white">
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Pratique
          </h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Tout ce qu’il faut pour venir s’entraîner : lieux, horaires, tenue et
            conseils.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-brand-500 px-5 py-3 text-white font-semibold shadow-smooth hover:brightness-110"
            >
              Cours d’essai
            </Link>
            <Link
              href="/Planning"
              className="rounded-xl border border-white/60 px-5 py-3 font-semibold hover:bg-white/10"
            >
              Voir le planning
            </Link>
          </div>
        </div>
      </section>

      {/* Lieux & horaires (uses your data/schedule.ts) */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Lieux & horaires</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((s, i) => (
            <article
              key={`${s.day}-${i}`}
              className="rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <header className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{s.day}</h3>
                <span className="text-xs rounded-full bg-gray-100 px-2 py-1">
                  {cleanClub(s.club)}
                </span>
              </header>
              <p className="mt-3 font-medium">{s.time}</p>
              <p className="text-gray-600">{s.venue}</p>
              {/* Optional: link to Google Maps if you have addresses */}
              {/* <Link href="https://maps.google.com/?q=..." className="mt-3 inline-block text-brand-600 underline">Itinéraire</Link> */}
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          * Les créneaux peuvent évoluer selon la saison et la disponibilité des gymnases.
        </p>
      </section>

      {/* Tenue & matériel */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold">Tenue & matériel</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <ul className="space-y-3">
              <li>• Karategi (kimono) blanc, ceinture selon votre grade.</li>
              <li>• Protection buccale et gants si travail de kumite.</li>
              <li>• Bouteille d’eau, petite serviette.</li>
              <li>• Arriver en avance pour s’échauffer et respecter l’étiquette du dojo.</li>
            </ul>
            <div className="relative h-48 md:h-auto">
              <Image
                src="/logowap.png"
                alt="Logo WAP"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Niveaux & inscription */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Niveaux & inscription</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Débutants</h3>
            <p className="mt-2 text-gray-600">
              Découverte du Wado-Ryu : postures, déplacements, kihon.
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Intermédiaires</h3>
            <p className="mt-2 text-gray-600">
              Approfondissement technique, kata et applications.
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Avancés</h3>
            <p className="mt-2 text-gray-600">
              Perfectionnement, kumite, travail de précision et rythme.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Link
            href="/Tarifs"
            className="inline-block rounded-xl bg-brand-500 px-5 py-3 text-white font-semibold shadow-smooth hover:brightness-110"
          >
            Tarifs & inscription
          </Link>
        </div>
      </section>

      {/* FAQ simple (native <details>) */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold">FAQ</h2>
          <div className="mt-6 space-y-4">
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">
                Puis-je faire un cours d’essai ?
              </summary>
              <p className="mt-2 text-gray-600">
                Oui, contactez-nous et venez sur un créneau “Débutants/Intermédiaires”.
              </p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">
                Faut-il une assurance/licence ?
              </summary>
              <p className="mt-2 text-gray-600">
                Une licence fédérale est requise après la période d’essai. Détails sur la page Tarifs.
              </p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">
                À partir de quel âge ?
              </summary>
              <p className="mt-2 text-gray-600">
                Nous accueillons les adultes et ados (selon créneau). Contactez-nous pour les plus jeunes.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="container mx-auto px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            Envie d’essayer ? Rejoignez <span className="font-bold">WAP</span> !
          </h2>
          <p className="mt-2 text-white/90">
            Écrivez-nous pour un premier cours et des conseils personnalisés.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-gray-900 hover:brightness-95"
            >
              Contact
            </Link>
            <Link
              href="/Planning"
              className="rounded-xl border border-white/70 px-5 py-3 font-semibold hover:bg-white/10"
            >
              Planning
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
