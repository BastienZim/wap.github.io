// components/WaDoRyu.tsx
import Image from "next/image";

export default function WaDoRyu() {
  return (
    <section
      id="carousel_c978"
      className="relative py-16 bg-gradient-to-b from-[#F9E79B] to-[#FEB454] text-center"
    >
      <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-3">
        {/* Wa / Harmonie */}
        <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center">
          <div className="relative h-32 w-32 rounded-full border-2 border-gray-300 overflow-hidden mb-4">
            <Image
              src="/KanjiWAgris1.png" // replacfrom-[#FEB454] to-[#F9E79B]e with your image
              alt="Wa / Harmonie"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-tertiary-700">
            <span className="font-extrabold">Wa</span> / Harmonie
          </h3>
          <div className="my-3 h-[2px] w-16 bg-tertiary-700" />
          <p className="text-gray-700 text-sm leading-relaxed">
            Le Wado Ryu est une synthèse harmonieuse du karaté d’Okinawa et d’une
            ancienne école budo (Shindo Yoshin Ryu). Il est élaboré au début des
            années 1930 par Hironori Otsuka sensei.
          </p>
        </div>

        {/* Do / Voie */}
        <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center">
          <div className="relative h-32 w-32 rounded-full border-2 border-gray-300 overflow-hidden mb-4">
            <Image
              src="/KanjiDOgris.png" // replace with your image
              alt="Do / Voie"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-tertiary-700">
            <span className="font-extrabold">Do</span> / Voie
          </h3>
          <div className="my-3 h-[2px] w-16 bg-tertiary-700" />
          <p className="text-gray-700 text-sm leading-relaxed">
            La pratique repose sur des principes naturels qui respectent
            l’intégrité physique et assurent l’efficacité. Cette recherche
            constante permet d’éviter tout usage de force ou de mouvement
            superflu.
          </p>
        </div>

        {/* Ryu / Style */}
        <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center">
          <div className="relative h-32 w-32 rounded-full border-2 border-gray-300 overflow-hidden mb-4">
            <Image
              src="/KanjiRYUgris.png" // replace with your image
              alt="Ryu / Style"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-tertiary-700">
            <span className="font-extrabold">Ryu</span> / Style
          </h3>
          <div className="my-3 h-[2px] w-16 bg-tertiary-700" />
          <p className="text-gray-700 text-sm leading-relaxed">
            Le style associe des techniques de percussion pieds-poings (karaté),
            des esquives fluides et millimétrées du corps (kenjutsu), mais aussi
            des clés, déséquilibres, projections et amenées au sol (jujutsu).
          </p>
        </div>
      </div>
    </section>
  );
}
