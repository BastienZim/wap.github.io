// app/galerie/GalerieClientPage.tsx
"use client";
import ThemeGradientBackground from "@/components/ThemeGradientBackground";
import GalleryClient from "./GalleryClient";
import type { Photo } from "./types";
import { useGradientStyle } from "@/lib/GradientStyleContext";

export default function GalerieClientPage({ photos }: { photos: Photo[] }) {
  const { gradientStyle } = useGradientStyle();
  
  return (
    <>
      <ThemeGradientBackground style={gradientStyle} />
      <main className="relative">
        <GalleryClient photos={photos} />
      </main>
    </>
  );
}