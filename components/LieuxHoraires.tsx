// components/LieuxHorairesAligned.tsx
import Image from "next/image";
import Link from "next/link";

export default function LieuxHorairesAligned() {
  return (
    <section id="carousel_212e" className="py-16 bg-gray-900 text-white">
      {/* Map + landmarks (kept aligned via percentage positioning) */}
      <div className="mx-auto max-w-5xl px-6">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Lieux &amp; Horaires
        </h3>

        {/* Map container with fixed aspect ratio (matches ~700x467 from your HTML) */}
        <div className="relative w-full aspect-[700/467] rounded-xl overflow-hidden shadow-lg">
          {/* Map background */}
          <Image
            src="/base-59df304b0407d.png"
            alt="Plan de Paris"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black/25" />

          {/* LANDMARK ICONS — positioned in % so they stay aligned as the map scales */}
          {/* Eiffel Tower */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: "28%", top: "66%" }} // tune these percentages to match your map
            aria-label="Tour Eiffel"
            title="Tour Eiffel"
          >
            <Image
              src="/pictotoureiffel2.png"
              alt="Tour Eiffel"
              width={68}
              height={68}
              className="opacity-90"
            />
          </div>

          {/* Notre-Dame */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: "55%", top: "60%" }} // tune as needed
            aria-label="Notre-Dame"
            title="Notre-Dame"
          >
            <Image
              src="/pictonotredame3.png"
              alt="Notre-Dame"
              width={68}
              height={68}
              className="opacity-90"
            />
          </div>

          {/* Sacré-Cœur (optional) */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: "60%", top: "25%" }} // tune as needed
            aria-label="Sacré-Cœur"
            title="Sacré-Cœur"
          >
            <Image
              src="/pictosacrecoeur2.png"
              alt="Sacré-Cœur"
              width={64}
              height={64}
              className="opacity-80"
            />
          </div>
        </div>

        {/* Content card with links/times (like your Nicepage block) */}
        <div className="mt-8 rounded-2xl bg-white/95 text-gray-900 shadow-lg p-6 md:p-8">
          <p>Les entraînements se déroulent en soirée et week-end sur 3 lieux à Paris :</p>
          <ul className="mt-4 space-y-3">
            <li>
              <span className="font-semibold">Mercredi 20h–22h</span> —{" "}
              <Link
                href="https://www.google.com/maps/place/Espace+Jean+Dame/@48.8665737,2.3452261,15z/"
                target="_blank"
                className="text-tertiary-700 hover:underline font-medium"
              >
                Espace Jean Dame
              </Link>{" "}
              (2ème arr. / M° Sentier)
            </li>
            <li>
              <span className="font-semibold">Vendredi 21h–22h30</span> —{" "}
              <Link
                href="https://www.google.com/maps/place/Gymnase+Suzanne+Berlioux/"
                target="_blank"
                className="text-tertiary-700 hover:underline font-medium"
              >
                Gymnase Berlioux
              </Link>{" "}
              (1er arr. / M° Châtelet)
            </li>
            <li>
              <span className="font-semibold">Samedi 20h–22h</span> —{" "}
              <Link
                href="https://www.google.com/maps/place/Centre+d'animation+Paris+Anim'+Nouvelle+Athènes/"
                target="_blank"
                className="text-tertiary-700 hover:underline font-medium"
              >
                Nouvelle Athènes
              </Link>{" "}
              (9ème arr. / M° Trinité)
            </li>
            <li>
              <span className="font-semibold">Dimanche 16h–18h</span> —{" "}
              <Link
                href="https://www.google.com/maps/place/Espace+Jean+Dame/@48.8655652,2.3417303,17z/"
                target="_blank"
                className="text-tertiary-700 hover:underline font-medium"
              >
                Espace Jean Dame
              </Link>{" "}
              (2ème arr. / M° Sentier)
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Des cours d’essai sont proposés, merci de prendre contact au préalable.
          </p>
        </div>
      </div>
    </section>
  );
}
