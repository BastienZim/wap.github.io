// components/WaDoRyu.tsx
import Image from "@/components/ui/BaseImage";
import wadoRyuData from "../data/wado-ryu.json";

type Card = {
  image: string;
  alt: string;
  titleBold: string;
  titleRest: string;
  text: string;
};

function InfoCard({ image, alt, titleBold, titleRest, text }: Card) {
  return (
    <div className="p-6 rounded-lg bg-white shadow text-center">
      <div className="relative mx-auto mb-4 h-32 w-32 rounded-full border-2 border-gray-300 overflow-hidden">
        <Image src={image} alt={alt} className="object-cover" />
      </div>
      <h3 className="text-xl font-bold text-tertiary-700">
        <span className="font-extrabold">{titleBold}</span> {titleRest}
      </h3>
      <div className="my-3 h-[2px] w-full bg-tertiary-700" />
      <p className="text-gray-800 leading-relaxed text-sm">{text}</p>
    </div>
  );
}

export default function WaDoRyu() {
  return (
    <section
      id="carousel_c978"
      className="relative py-16 bg-gradient-to-t from-[#FEB454] to-[#F9E79B] text-center"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {wadoRyuData.cards.map((card, idx) => (
            <InfoCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
