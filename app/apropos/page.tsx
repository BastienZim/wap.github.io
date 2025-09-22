"use client";

import * as React from "react";
import { WapCardsSection } from "@/components/WapCardsSection";
import wapCards from "@/data/wap-cards.json";
import wadoHistory from "@/data/wado_history.json";
import Carousel from "@/components/carousel/carousel";
import ThemeGradientBackground from "@/components/ThemeGradientBackground";
import { useGradientStyle } from "@/lib/GradientStyleContext";

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

export default function Page() {
  const sectionA = wapCards as WapSectionData;
  const sectionB = wadoHistory as WapSectionData;
  const { gradientStyle } = useGradientStyle();

  // (Removed unused scroll tracking state)

  return (
    <>
  {/* Using the gradient style from context */}
  <ThemeGradientBackground mode="auto" style={gradientStyle} /> 
      <main
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24"
        style={{
          minHeight: "100vh",
          color: 'rgb(var(--color-foreground))'
        }}
      >
        <Carousel intervalMs={5000} showThumbnails />
        {/* Section A */}
        <WapCardsSection data={sectionA} />

        {/* Optional separator */}
        <hr style={{ borderColor: 'rgb(var(--color-foreground) / 20%)' }} />

        {/* Section B */}
        <WapCardsSection data={sectionB} textColor="light" />
      </main>
    </>
  );
}
