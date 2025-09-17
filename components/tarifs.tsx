// components/Tarifs.tsx
import Image from "next/image";

export default function Tarifs() {
  return (
    <section
      id="carousel_7f36"
      className="relative py-16 bg-gradient-to-b from-[#FEB454] to-[#F9E79B] text-center"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Adhésion */}
          <div className="p-6 rounded-lg bg-white shadow text-center">
            <div className="relative mx-auto mb-4 h-32 w-32 rounded-full border-2 border-gray-300
 overflow-hidden">
              <Image
                src="/FFKlogogris.png"
                alt="Paris"
                fill
                priority
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-tertiary-700">Adhésion</h3>
            <div className="my-3 h-[2px] w-full bg-tertiary-700" />
            <p className="text-gray-800 leading-relaxed">
              Club (obligatoire) / 13 €<br />
              FFK (obligatoire) / 37 €<br />
              Wado Academy / 30 €
            </p>
          </div>

          {/* Cotisation */}
          <div className="p-6 rounded-lg bg-white shadow text-center">
            <div className="relative mx-auto mb-4 h-32 w-32 rounded-full border-2 border-gray-300
 overflow-hidden">
              <Image
                src="/logowap.png"
                alt="Paris"
                fill
                priority
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-tertiary-700">Cotisation</h3>
            <div className="my-3 h-[2px] w-full bg-tertiary-700" />
            <p className="text-gray-800 leading-relaxed">
              1 cours hebdo / 2 et +<br />
              <strong>Juniors</strong>: 210 € / 255 €<br />
              Adultes : 270 € / 315 €
            </p>
          </div>

          {/* À la carte */}
          <div className="p-6 rounded-lg bg-white shadow text-center">
            <div className="relative mx-auto mb-4 h-32 w-32 rounded-full border-2 border-gray-300
 overflow-hidden">
              <Image
                src="/pictoprojectiongris.png"
                alt="Paris"
                fill
                priority
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-tertiary-700">À la carte</h3>
            <div className="my-3 h-[2px] w-full bg-tertiary-700" />
            <p className="text-gray-800 leading-relaxed">
              Carte 6 séances / 50 €<br />
              Formule spéciale week-end :<br />
              6 à 9h d’entraînement / 35 €
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
