"use client";

import * as React from "react";
import { WapCardsSection } from "@/components/WapCardsSection";
import wapCards from "@/data/wap-cards.json";
import wadoHistory from "@/data/wado_history.json";
import Carousel from "@/components/carousel/carousel";
import ThemeGradientBackground from "@/components/ThemeGradientBackground";

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

  // Track scroll progress (0 = top, 1 = bottom)
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      setScroll(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Interpolate between primary-100 and brand-100 based on scroll
  const background = React.useMemo(() => {
    // You can adjust these colors to match your palette exactly
    const colorA = [243, 244, 246]; // fallback for var(--color-primary-100)
    const colorB = [243, 165, 75];  // fallback for var(--color-brand-100)
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    const rgb = colorA.map((a, i) => lerp(a, colorB[i], scroll));
    return `linear-gradient(to bottom, rgb(${rgb.join(",")}) 0%, rgb(${colorB.join(",")}) 100%)`;
  }, [scroll]);

  return (
    <>
      <ThemeGradientBackground />
      <main
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24 text-neutral-900"
        style={{
          minHeight: "100vh",
        }}
      >
        <Carousel intervalMs={5000} showThumbnails />
        {/* Section A */}
        <WapCardsSection data={sectionA} />

        {/* Optional separator */}
        <hr className="border-primary-200 dark:border-secondary-700" />

        {/* Section B */}
        <WapCardsSection data={sectionB} textColor="light" />
      </main>
    </>
  );
}
