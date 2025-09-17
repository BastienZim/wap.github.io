"use client";

import Carousel from "@/components/carousel/carousel";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Carousel intervalMs={5000} showThumbnails />
    </main>
  );
}
