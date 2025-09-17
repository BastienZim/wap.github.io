// components/ui/Lightbox.tsx
"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  isOpen: boolean;
  index: number;                    // current index (controlled)
  items: LightboxItem[];
  onClose: () => void;
  onIndexChange: (nextIndex: number) => void;
  ariaLabel?: string;
};

export default function Lightbox({
  isOpen,
  index,
  items,
  onClose,
  onIndexChange,
  ariaLabel = "Visionneuse de photos",
}: LightboxProps) {
  const count = items.length;
  const safeIndex = count ? ((index % count) + count) % count : 0;

  const next = useCallback(() => {
    if (count) onIndexChange((safeIndex + 1) % count);
  }, [count, safeIndex, onIndexChange]);

  const prev = useCallback(() => {
    if (count) onIndexChange((safeIndex - 1 + count) % count);
  }, [count, safeIndex, onIndexChange]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, next, prev]);

  // Scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen || count === 0) return null;

  const current = items[safeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur"
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <Button
        onClick={onClose}
        aria-label="Fermer (Échap)"
        className="absolute right-4 top-4"
        variant="solid"
        tone="light"
        shape="pill"
        size="sm"
      >
        Fermer
      </Button>

      <Button
        onClick={prev}
        aria-label="Précédente (←)"
        className="absolute left-2 top-1/2 -translate-y-1/2"
        variant="solid"
        tone="light"
        shape="circle"
        size="md"
      >
        &#10094;
      </Button>

      <figure className="max-h-[90vh] w-full max-w-5xl">
        <div className="relative mx-auto h-[75vh] max-h-[75vh] w-auto">
          <Image
            key={current.src + safeIndex}
            src={current.src}
            alt={current.alt}
            fill
            sizes="90vw"
            className="object-contain rounded-xl shadow-xl"
            priority
          />
        </div>
        {current.caption && (
          <figcaption className="mx-auto mt-3 max-w-3xl text-center text-white/90">
            {current.caption}
          </figcaption>
        )}

        {/* Preload neighbors for snappier nav */}
        {count > 1 && (
          <div className="sr-only" aria-hidden>
            <Image
              src={items[(safeIndex + 1) % count].src}
              alt=""
              width={10}
              height={10}
              priority
            />
            <Image
              src={items[(safeIndex - 1 + count) % count].src}
              alt=""
              width={10}
              height={10}
              priority
            />
          </div>
        )}
      </figure>

      <Button
        onClick={next}
        aria-label="Suivante (→)"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        variant="solid"
        tone="light"
        shape="circle"
        size="md"
      >
        &#10095;
      </Button>
    </div>
  );
}
