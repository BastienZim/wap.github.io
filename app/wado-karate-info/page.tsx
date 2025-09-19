import React from "react";
import content from "@/data/wado-karate-info.json";
import "./styles.css";
import BaseImage from "@/components/ui/BaseImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wado-Ryu & Karaté Information | WAP Karaté Club",
  description: "Découvrez l'histoire et la philosophie du Wado-Ryu, un style de karaté japonais fondé par Hironori Otsuka, combinant techniques traditionnelles et principes d'harmonie.",
  keywords: "Wado-Ryu, karaté, arts martiaux japonais, Hironori Otsuka, WAP Karaté Club",
};

// Kanji characters for decorative use
const kanji = ["和", "道", "空", "手"];

const WadoKarateInfoPage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 texture-bg relative">
      {/* Decorative kanji background */}
      {kanji.map((char, i) => (
        <span
          key={i}
          className="kanji-bg"
          style={{
            top: `${20 + i * 25}%`,
            right: i % 2 === 0 ? '5%' : '75%',
            transform: `rotate(${i % 2 === 0 ? -10 : 10}deg)`,
          }}
        >
          {char}
        </span>
      ))}
      
      <h1 className="text-5xl font-bold text-center text-brand-300 dark:text-brand-700 page-title">
        {content.title}
      </h1>
      
      <div className="karate-quote fade-in">
        &quot;La voie du karaté ne consiste pas seulement à devenir fort physiquement, 
        mais aussi à cultiver un esprit juste et fort.&quot;
        <div className="text-right mt-2 text-sm">— Hironori Otsuka, Fondateur du Wado-Ryu</div>
      </div>

      <div className="image-row fade-in stagger-1 my-8">
        <div className="image-container">
          <BaseImage
            src="/images/directly_useful/OtsukaCalifornia_.jpg"
            alt="Hironori Otsuka"
            width={400}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="image-container">
          <BaseImage
            src="/images/directly_useful/OtsukaIIkakete.jpg"
            alt="Technique Wado-Ryu"
            width={400}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {content.sections.map((section, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className="divider" />}
          <section className={`karate-section bg-white/10 dark:bg-black/10 backdrop-blur-sm fade-in stagger-${index + 1}`}>
            <h2 className="text-3xl font-semibold text-primary-300 dark:text-secondary-700 mb-4">
              {section.heading}
            </h2>
            <div
              className="text-primary-100 dark:text-secondary-700 leading-relaxed section-content"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            
            {/* Special content for Wado-Ryu principles section */}
            {index === 2 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary-50 dark:bg-secondary-800/30 p-4 rounded-lg">
                  <h3 className="font-medium text-brand-500 mb-2">Tactique et Stratégie</h3>
                  <p className="text-sm">Le Wado-Ryu enseigne à utiliser le timing et le positionnement plutôt que la force brute.</p>
                </div>
                <div className="bg-primary-50 dark:bg-secondary-800/30 p-4 rounded-lg">
                  <h3 className="font-medium text-brand-500 mb-2">Corps et Esprit</h3>
                  <p className="text-sm">L&apos;harmonie entre le corps et l&apos;esprit est essentielle pour maîtriser les techniques.</p>
                </div>
              </div>
            )}
          </section>
        </React.Fragment>
      ))}
      
      {/* Bibliography Section */}
      <div className="divider" />
      <section className="karate-section bg-white/10 dark:bg-black/10 backdrop-blur-sm fade-in stagger-4">
        <h2 className="text-3xl font-semibold text-primary-300 dark:text-secondary-700 mb-4">
          Bibliographie
        </h2>
        <div className="text-primary-100 dark:text-secondary-700 leading-relaxed section-content">
          <p className="mb-2">Pour approfondir vos connaissances sur le Wado-Ryu et le Karaté :</p>
          <ul className="bibliography-list">
            <li className="mb-3">
              <a 
                href="https://fr.wikipedia.org/wiki/Wad%C5%8D-ry%C5%AB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-200 underline transition-colors"
              >
                Wadō-ryū — Wikipédia
              </a>
              <p className="text-sm mt-1 opacity-80">Une présentation complète du style Wadō-ryū, son histoire, ses principes et ses techniques.</p>
            </li>
            <li className="mb-3">
              <a 
                href="https://fr.wikipedia.org/wiki/Karate-Do" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-200 underline transition-colors"
              >
                Karate-Do — Wikipédia
              </a>
              <p className="text-sm mt-1 opacity-80">Article général sur le karaté, son histoire et ses différentes écoles.</p>
            </li>
          </ul>
        </div>
      </section>
      
    </main>
  );
};

export default WadoKarateInfoPage;