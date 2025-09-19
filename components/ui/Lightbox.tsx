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

// tiny shimmer so placeholder="blur" never spins forever
const shimmerSVG = (w: number, h: number, tone = "#f3f4f6") => `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="g">
      <stop stop-color="${tone}" offset="20%"/>
      <stop stop-color="#e5e7eb" offset="50%"/>
      <stop stop-color="${tone}" offset="80%"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" fill="${tone}"/>
    <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.6s" repeatCount="indefinite"/>
  </svg>`;
const toBase64 = (s: string) =>
  (typeof window === "undefined" ? Buffer.from(s).toString("base64") : window.btoa(s));
const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmerSVG(24, 24))}`;

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
        <div className="relative mx-auto h-[75vh] max-h-[75vh] w-auto">
          {!errored ? (
            <BaseImage
              key={(typeof currentSrc === "string" ? currentSrc : "imp") + safeIndex}
              src={typeof currentSrc === "string" ? currentSrc : ""}
              alt={current.alt}
              className="object-contain rounded-xl shadow-xl w-full h-full"
              style={{ objectFit: "contain" }}
              loading="eager"
              onError={() => {
                setErrored(true);
                if (typeof currentSrc === "string") {
                  // eslint-disable-next-line no-console
                  console.error("[Lightbox] Failed to load:", currentSrc);
                }
              }}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center rounded-xl bg-gray-100 text-gray-600">
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
