// app/galerie/GalerieClientPage.tsx
"use client";
import ThemeGradientBackground from "@/components/ThemeGradientBackground";
import GalleryClient from "./GalleryClient";
import type { Photo } from "./types";

export default function GalerieClientPage({ photos }: { photos: Photo[] }) {
  return (
    <>
      <ThemeGradientBackground />
      <main className="relative">
        <GalleryClient photos={photos} />
      </main>
    </>
  );
}