// app/galerie/GalleryClient.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BaseImage from "@/components/ui/BaseImage";
import type { Photo, FilterKey } from "./types";
import { Button } from "@/components/ui/Button";
import Lightbox from "@/components/ui/Lightbox";
import galleryConfig from "../../data/gallery.config.json";

const EXCLUDED_IMAGE_FOLDERS: string[] = galleryConfig.excludedImageFolders ?? [];

function cn(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/* =========================
   Labels / helpers
   ========================= */

const PILL_STYLE = `
  border border-brand !text-brand
  hover:!text-foreground hover:border-transparent hover:!bg-transparent dark:hover:!bg-transparent
  aria-selected:bg-[var(--pill-selected-bg)] aria-selected:text-white aria-selected:border-brand-600
  focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
`;

const LABEL_OVERRIDES: Record<string, string> = {
  kids: "Enfants",
  adults: "Adultes",
  tournament: "Compétitions",
  belt: "Passages de grades",
  stage: "Stages",
  stages: "Stages",
  club: "Club",
};

function titleFromSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\p{L}/gu, (m) => m.toUpperCase());
}

const labelFor = (key: FilterKey) =>
  key === "all" ? "Tous" : LABEL_OVERRIDES[key] ?? titleFromSlug(key);

// --- Shimmer helpers (for the loading overlay) ---
const shimmerSVG = (w: number, h: number, tone = "#f3f4f6") => `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g">
        <stop stop-color="${tone}" offset="20%"/>
        <stop stop-color="#e5e7eb" offset="50%"/>
        <stop stop-color="${tone}" offset="80%"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${tone}"/>
    <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.6s" repeatCount="indefinite"/>
  </svg>
`;
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const shimmerDataURL = (w: number, h: number, tone?: string) =>
  `data:image/svg+xml;base64,${toBase64(shimmerSVG(w, h, tone))}`;

// Ensure plain strings like "images/foo.jpg" become "/images/foo.jpg"
function normalizeSrc(src: Photo["src"]): Photo["src"] {
  if (typeof src !== "string") return src;
  if (src.startsWith("http") || src.startsWith("data:")) return src;
  return src.startsWith("/") ? src : `/${src.replace(/^(\.\/)+/, "")}`;
}

// Allow CSS custom property typing for style objects
type StyleWithVars = React.CSSProperties & { ["--stagger"]?: string };

// Thumbnail card extracted so we can safely use hooks
function ThumbnailCard({
  p,
  globalIndex,
  open,
  priority,
  staggerMs,
}: {
  p: Photo;
  globalIndex: number;
  open: (gi: number) => void;
  priority: boolean;
  staggerMs: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    if (cardRef.current) io.observe(cardRef.current);
    return () => io.disconnect();
  }, []);

  const staggerStyle: StyleWithVars = { ["--stagger"]: `${staggerMs}ms` };
  const resolvedSrc = normalizeSrc(p.src);

  return (
    <figure
      ref={cardRef}
      style={staggerStyle}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-sm",
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out [transition-delay:var(--stagger)]",
        visible
          ? "motion-safe:opacity-100 motion-safe:translate-y-0"
          : "motion-safe:opacity-0 motion-safe:translate-y-2"
      )}
    >
      <Button
        onClick={() => open(globalIndex)}
        aria-label={`Ouvrir la photo : ${p.alt}`}
        className="block w-full focus:outline-none"
        variant="ghost"
        tone="neutral"
        shape="square"
        size="md"
      >
        <div className="relative h-44 w-full">
          {/* Only render the image when in/near viewport (or prioritized) */}
          {(visible || priority) && !errored ? (
            <BaseImage
              src={resolvedSrc as string}
              alt={p.alt}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              onLoad={() => setLoaded(true)}          
              onError={() => {
                setErrored(true);
                setLoaded(true);
              }}
              draggable={false}
              className={cn(
                "h-full w-full object-cover object-[50%_20%]",
                "transition-transform duration-500 group-hover:scale-[1.05]",
                "motion-safe:transition-opacity motion-safe:duration-700",
                loaded ? "opacity-100" : "opacity-0"
              )}
            />
          ) : null}

          {/* Shimmer / fallback while loading */}
          {!loaded && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.03) 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.6s linear infinite",
              }}
            />
          )}

          {/* Error fallback block (keeps layout stable) */}
          {errored && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <span className="px-2 text-xs">Image indisponible</span>
            </div>
          )}
        </div>

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {p.caption ?? p.alt}
        </figcaption>
      </Button>
    </figure>
  );
}

export default function GalleryClient({ photos = [] }: { photos?: Photo[] }) {
  // Normalize all photo srcs once (IMPORTANT: ensures root-relative paths for basePath())
  const allPhotos = useMemo<Photo[]>(() => {
    return (photos ?? [])
      .filter((p) => {
        const src = typeof p.src === "string" ? p.src : "";
        // Exclude if src starts with any excluded folder
        return !EXCLUDED_IMAGE_FOLDERS.some(folder => src.startsWith(folder));
      })
      .map((p) => ({ ...p, src: normalizeSrc(p.src) }));
  }, [photos]);

  const [filter, setFilter] = useState<FilterKey>("all");
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const categories = useMemo<FilterKey[]>(() => {
    const uniqueCats = Array.from(new Set(allPhotos.map((p) => p.category)));
    return ["all", ...uniqueCats];
  }, [allPhotos]);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? allPhotos
        : allPhotos.filter((p) => p.category === filter),
    [filter, allPhotos]
  );

  const open = useCallback((globalIndex: number) => {
    setIndex(globalIndex);
    setIsOpen(true);
    document.documentElement.style.overflow = "hidden";
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    document.documentElement.style.overflow = "";
  }, []);
  const next = useCallback(() => {
    if (filtered.length) setIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);
  const prev = useCallback(() => {
    if (filtered.length)
      setIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, next, prev]);

  useEffect(() => {
    if (!isOpen) return;
    if (!filtered.length) {
      close();
      return;
    }
    setIndex((i) => (i >= filtered.length ? 0 : i));
  }, [filtered.length, isOpen, close]);

  return (
    <>
      {/* Filters */}
      <section className="container mx-auto px-6 pt-12">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filtres galerie"
        >
          {categories.map((key) => {
            const isSelected = filter === key;
            return (
              <Button
                key={`filter-${key}`}
                role="tab"
                aria-selected={isSelected}
                selected={isSelected}
                onClick={() => setFilter(key)}
                tone="brand"
                variant="outline"
                shape="pill"
                size="sm"
                className={PILL_STYLE}
              >
                {labelFor(key)}
              </Button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <p className="text-gray-600">
            Aucune photo pour cette catégorie, revenez bientôt.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p, i) => {
              const globalIndex = allPhotos.indexOf(p);
              const delayMs = (i % 12) * 50; // simple stagger
              return (
                <ThumbnailCard
                  key={`${typeof p.src === "string" ? p.src : "imp"}-${i}`}
                  p={p}
                  globalIndex={globalIndex}
                  open={open}
                  priority={i < 4} // prioritize first row for snappier paint
                  staggerMs={delayMs}
                />
              );
            })}
          </div>
        )}
        <p className="mt-6 text-sm text-gray-500">
          * Merci de demander l’autorisation avant toute réutilisation des photos.
        </p>
      </section>

      <Lightbox
        isOpen={isOpen}
        index={index}
        items={filtered} // already normalized srcs
        onClose={close}
        onIndexChange={setIndex}
      />

      {/* Minimal global keyframes for the shimmer overlay */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  );
}
