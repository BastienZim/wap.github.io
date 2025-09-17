// pages/a-propos.tsx
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { schedule } from "../data/schedule";

// ——— small helper ———
const cleanClub = (club: string) => club.replace(/[>]+$/g, "");

export default function APropos() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Hero />
      <About />
      <Carousel id="carousel_d922" />
      <ScheduleSection />
      <Contact />
    </main>
  );
}

// ——— Hero ———
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Replace with your banner image */}
        <Image
          src="/hero-wado.jpg"
          alt="Wado Academy Paris"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-40">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">
          Wado Academy Paris
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
          Karaté Wado-Ryu & Ju-Jutsu — esprit, technique, harmonie.
        </p>
        <a
          href="#carousel_d922"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold shadow hover:shadow-md transition"
        >
          Voir la galerie
        </a>
      </div>
    </section>
  );
}

// ——— À propos ———
function About() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16" id="a-propos">
      <h2 className="text-3xl md:text-4xl font-bold">À propos</h2>
      <p className="mt-6 text-lg leading-8 text-gray-700">
        Le dojo Wado Academy Paris propose un enseignement du Wado-Ryu fidèle à la
        tradition, axé sur la progression technique, l’étiquette et le développement
        personnel. Séances adaptées aux niveaux débutant à avancé, encadrement par des
        instructeurs diplômés.
      </p>
      <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Esprit budo", text: "Respect, efficacité, harmonie du corps et de l’esprit." },
          { title: "Technique", text: "Kihon, Kata, Kumite — progression structurée." },
          { title: "Communauté", text: "Un cadre bienveillant et exigeant pour tous." },
        ].map((b, i) => (
          <li key={i} className="p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-lg">{b.title}</h3>
            <p className="mt-2 text-gray-600">{b.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ——— Carousel (anchor id matches your link) ———
function Carousel({ id }: { id: string }) {
  const slides = [
    { src: "/gallery/1.jpg", alt: "Entraînement Wado-Ryu" },
    { src: "/gallery/2.jpg", alt: "Kata" },
    { src: "/gallery/3.jpg", alt: "Kumite" },
    { src: "/gallery/4.jpg", alt: "Stage" },
  ];
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // auto-rotate
  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [slides.length]);

  return (
    <section id={id} className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Galerie</h2>
        <div className="mt-8 relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow">
          {slides.map((s, i) => (
            <div
              key={s.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== index}
            >
              <Image src={s.src} alt={s.alt} fill className="object-cover" />
            </div>
          ))}

          {/* controls */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Aller à la diapo ${i + 1}`}
                className={`h-2 w-2 rounded-full ring-1 ring-white/50 ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold shadow hover:bg-white"
            aria-label="Précédent"
          >
            ‹
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold shadow hover:bg-white"
            aria-label="Suivant"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

// ——— Schedule (uses your data) ———
function ScheduleSection() {
  // Group by day to mimic a “lieux & horaires” block
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold">Lieux & horaires</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.map((s, i) => (
          <article key={i} className="rounded-xl border border-gray-200 p-5 shadow-sm">
            <header className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">{s.day}</h3>
              <span className="text-sm rounded-full bg-gray-100 px-2 py-1">
                {cleanClub(s.club)}
              </span>
            </header>
            <p className="mt-3 font-medium">{s.time}</p>
            <p className="text-gray-600">{s.venue}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500">
        * Les créneaux sont susceptibles d’évoluer selon la saison / les gymnases.
      </p>
    </section>
  );
}

// ——— Contact / CTA ———
function Contact() {
  return (
    <section className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Nous rejoindre</h2>
        <p className="mt-4 text-white/80 max-w-2xl">
          Intéressé·e par un cours d’essai&nbsp;? Écrivez-nous et passez nous voir !
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="mailto:contact@wadoacademyparis.org"
            className="inline-flex items-center rounded-lg bg-white text-gray-900 px-5 py-3 font-semibold shadow hover:shadow-md"
          >
            Contact
          </a>
          <a
            href="#carousel_d922"
            className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-semibold hover:bg-white/10"
          >
            Voir la galerie
          </a>
        </div>
      </div>
    </section>
  );
}
