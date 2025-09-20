// components/Tarifs.tsx
import Image from "@/components/ui/BaseImage";
import tarifsData from "@/data/tarifs.json";

export default function Tarifs() {
  return (
    <section
      id={tarifsData.sectionId}
      className={`relative py-16 ${tarifsData.gradient} text-center`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tarifsData.cards.map((card, index) => (
            <div key={index} className="p-6 rounded-lg bg-white shadow text-center">
              <div className="relative mx-auto mb-4 h-32 w-32 rounded-full border-2 border-secondary-300 dark:border-secondary-600 overflow-hidden">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-tertiary-700">{card.title}</h3>
              <div className="my-3 h-[2px] w-full bg-tertiary-700" />
              <div className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                {card.subtitle && (
                  <p className="mb-2 text-sm font-medium">{card.subtitle}</p>
                )}
                {card.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-1">
                    {'bold' in item && item.bold ? (
                      <p><strong>{item.label}</strong>: {item.price}</p>
                    ) : (
                      <p>{item.label}: {item.price}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}