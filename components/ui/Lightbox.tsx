// components/ui/Lightbox.tsx
"use client";

import { useEffect, useCallback, useState } from "react";
import BaseImage from "@/components/ui/BaseImage";
import { Button } from "@/components/ui/Button";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

export type LightboxItem = {
  src: string | StaticImport;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  isOpen: boolean;
  index: number;
  items: LightboxItem[];
  onClose: () => void;
  onIndexChange: (nextIndex: number) => void;
  ariaLabel?: string;
};

/* ---------- helpers ---------- */

// 1) make string paths root-relative (so Next can prepend basePath on Pages)
// 2) URL-encode spaces/diacritics safely (encodeURI preserves slashes and %)
function normalizeSrc(src: string | StaticImport) {
  if (typeof src !== "string") return src;
  if (src.startsWith("http") || src.startsWith("data:")) return src;
  const cleaned = src.replace(/^(\.\/)+/, "");
  const rooted = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return encodeURI(rooted);
}

// (Removed shimmer/blur helpers previously unused)

/* ---------- component ---------- */

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

  const [errored, setErrored] = useState(false);

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
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen || count === 0) return null;

  const current = items[safeIndex];
  const currentSrc = normalizeSrc(current.src);
  const preloadNext = normalizeSrc(items[(safeIndex + 1) % count]?.src);
  const preloadPrev = normalizeSrc(items[(safeIndex - 1 + count) % count]?.src);

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
        {/* Wrapper must be relative with explicit height for fill layout */}
        <div className="relative mx-auto h-[75vh] max-h-[75vh] w-full">
          {!errored ? (
            <BaseImage
              key={(typeof currentSrc === "string" ? currentSrc : "imp") + safeIndex}
              src={typeof currentSrc === "string" ? currentSrc : ""}
              alt={current.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain rounded-xl shadow-xl"
              style={{ objectFit: "contain" }}
              loading="eager"
              onError={() => {
                setErrored(true);
                if (typeof currentSrc === "string") {
                  console.error("[Lightbox] Failed to load:", currentSrc);
                }
              }}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center rounded-xl bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300">
              <span className="px-2 text-sm">Image indisponible</span>
            </div>
          )}
        </div>

        {current.caption && (
          <figcaption className="mx-auto mt-3 max-w-3xl text-center text-white/90">
            {current.caption}
          </figcaption>
        )}

        {/* Preload neighbors */}
        {count > 1 && (
          <div className="sr-only" aria-hidden>
            <BaseImage src={typeof preloadNext === "string" ? preloadNext : ""} alt="" width={10} height={10} />
            <BaseImage src={typeof preloadPrev === "string" ? preloadPrev : ""} alt="" width={10} height={10} />
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
