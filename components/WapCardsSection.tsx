import * as React from "react";
import defaultSlides from "../data/wap-cards.json";
import BaseImage from "@/components/ui/BaseImage";

// Define the expected data shape
type WapCard = {
  title: string;
  text: string;
  image: {
    src: string;
    alt: string;
    position?: string;
    align?: string;
    width?: number;
    height?: number;
  };
};

type WapSectionData = {
  cards: WapCard[];
  sectionTitle?: string;
  sectionDescription?: string;
};

type WapCardsSectionProps = {
  data: WapSectionData;
  textColor?: "light" | "dark";
};

// Loader component (now just passes imported data)
export function WapCardsSectionLoader() {
  const data = defaultSlides as WapSectionData;
  return <WapCardsSection data={data} />;
}

// Main section component
export function WapCardsSection({
  data,
  textColor = "dark",
}: WapCardsSectionProps) {
  // Choose text color classes based on prop
  const textClass =
    textColor === "light"
      ? "text-white"
      : "text-neutral-900";
  const titleClass =
    textColor === "light"
      ? "text-white font-bold"
      : "text-neutral-900 font-bold";
  const descClass =
    textColor === "light"
      ? "text-white/90"
      : "text-neutral-900";
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {data.sectionTitle && (
        <h2 className={`text-3xl mb-4 text-center ${titleClass}`}>
          {data.sectionTitle}
        </h2>
      )}
      {data.sectionDescription && (
        <p className={`mb-10 text-lg text-center ${descClass}`}>
          {data.sectionDescription}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
        {data.cards.map((card, idx) => {
          // Alternate image position: even = top, odd = bottom
          const imageTop = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`flex flex-col h-full text-left items-stretch ${textClass}`}
            >
              {imageTop && (
                <BaseImage
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width ?? 192}
                  height={card.image.height ?? 192}
                  className="h-48 w-48 rounded-full object-cover mb-4 self-start"
                  loading="lazy"
                />
              )}
              <div className="flex-1 flex flex-col">
                <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>{card.title}</h3>
                <p className={textClass}>{card.text}</p>
              </div>
              {!imageTop && (
                <BaseImage
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width ?? 192}
                  height={card.image.height ?? 192}
                  className="h-48 w-48 rounded-full object-cover mt-4 self-start"
                  loading="lazy"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
