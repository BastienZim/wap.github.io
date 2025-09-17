"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import type { Photo, FilterKey } from "./types";
import { Button } from "@/components/ui/Button";
import Lightbox from "@/components/ui/Lightbox";

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





// Optional: human labels for known folders. Anything not listed falls back to Title Case.
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

// --- Fancy loading helpers ---
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

const shimmerDataURL = (w: number, h: number, tone?: string) =>
  `data:image/svg+xml;base64,${toBase64(shimmerSVG(w, h, tone))}`;

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
      { rootMargin: "120px 0px" }
    );
    if (cardRef.current) io.observe(cardRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      ref={cardRef}
      style={{ ["--stagger" as any]: `${staggerMs}ms` }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-sm",
        // on-scroll reveal (respect reduced motion)
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
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            placeholder="blur"
            // If your Photo type doesn't include blurDataURL, this still compiles (we fall back to shimmer)
            // @ts-ignore - optional field in many setups
            blurDataURL={p.blurDataURL ?? shimmerDataURL(700, 400)}
            onLoadingComplete={() => setLoaded(true)}
            className={cn(
              "object-cover object-[50%_20%]", // adjust crop focus
              "transition-transform duration-500 group-hover:scale-[1.05]",
              "motion-safe:transition-opacity motion-safe:duration-700",
              loaded ? "opacity-100" : "opacity-0"
            )}
            priority={priority}
          />

          {/* Shimmer overlay while loading */}
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
        </div>

        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {p.caption ?? p.alt}
        </figcaption>
      </Button>
    </figure>
  );
}

export default function GalleryClient({ photos = [] }: { photos?: Photo[] }) {
  const allPhotos = photos ?? [];

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
                selected={isSelected} // <-- use Button's selected styling (brand)
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
                  key={`${p.src}-${i}`}
                  p={p}
                  globalIndex={globalIndex}
                  open={open}
                  priority={i < 4}
                  staggerMs={delayMs}
                />
              );
            })}
          </div>
        )}
        <p className="mt-6 text-sm text-gray-500">
          * Merci de demander l’autorisation avant toute réutilisation des
          photos.
        </p>
      </section>

      <Lightbox
        isOpen={isOpen}
        index={index}
        items={filtered} // Photo[] is compatible if it has src/alt/caption
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
