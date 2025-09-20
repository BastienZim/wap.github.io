// components/carousel/carousel.tsx
"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import BaseImage from "@/components/ui/BaseImage";
import Link from "next/link";
import type { Slide } from "./types";
import defaultSlides from "../../data/slides.json";

/* ---------- helpers ---------- */

// Ensure "images/foo.jpg" → "images/foo.jpg" (root-relative for public/*/*)
function normalizeSrc(src: string) {
  if (!src) return src;
  if (src.startsWith("http") || src.startsWith("data:")) return src;
  const cleaned = src.replace(/^(\.\/)+/, "");
  return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
}

// (Removed unused shimmer/placeholder helpers previously defined here to satisfy linter.)

type Props = {
  slides?: Slide[];
  /** Autoplay interval in ms (set to 0 to disable) */
  intervalMs?: number;
  /** Show clickable thumbnails below the carousel */
  showThumbnails?: boolean;
};

export default function Carousel({
  slides = defaultSlides,
  intervalMs = 5000,
  showThumbnails = true,
}: Props) {
  // Normalize once so all paths are safe on GH Pages
  const normalized = useMemo<Slide[]>(
    () =>
      slides.map((s) => ({
        ...s,
        imgSrc: normalizeSrc(s.imgSrc),
      })),
    [slides]
  );

  const [index, setIndex] = useState(0);
  const [errored, setErrored] = useState<Record<string, boolean>>({});
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (i: number) => setIndex(((i % normalized.length) + normalized.length) % normalized.length),
    [normalized.length]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const start = useCallback(() => {
    if (intervalMs <= 0 || normalized.length <= 1) return;
    stop();
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % normalized.length);
    }, intervalMs);
  }, [intervalMs, normalized.length, stop]);

  // autoplay lifecycle
  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  // keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        next();
        start();
      } else if (e.key === "ArrowLeft") {
        prev();
        start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, start]);

  // respect prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) stop();
  }, [stop]);

  // Render only current + neighbors for smoother perf
  const prevIndex = (index - 1 + normalized.length) % normalized.length;
  const nextIndex = (index + 1) % normalized.length;

  return (
    <section id="carousel" className="relative overflow-hidden">
      <div
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-label="Wado slides"
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {normalized.map((s, i) => {
          const isActive = i === index;
          const isNeighbor = i === prevIndex || i === nextIndex;
          // Only mount DOM for active + neighbors (others unmounted)
          if (!isActive && !isNeighbor) return null;

          return (
            <article
              key={s.id}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${i + 1} sur ${normalized.length}`}
              className={[
                "grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch transition-opacity duration-500",
                isActive
                  ? "opacity-100 relative"
                  : "opacity-0 pointer-events-none absolute inset-0",
              ].join(" ")}
            >
              <div className="relative h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-smooth">
                {!errored[s.id] ? (
                  <BaseImage
                        src={s.imgSrc}
                        alt={s.imgAlt}
                        className="object-cover w-full h-full"
                        style={{ objectFit: "cover" }}
                        onError={() => setErrored((e) => ({ ...e, [s.id]: true }))}
                        loading={isActive ? "eager" : "lazy"}
                      />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300">
                    <span className="text-sm">Image indisponible</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="font-display text-3xl md:text-5xl leading-tight tracking-widest">
                  {s.title}
                </h2>
                <p className="mt-6 text-secondary-700 dark:text-secondary-300 text-justify">{s.text}</p>
                <div className="mt-8">
                  <Link
                    href={s.href}
                    className="rounded-xl border border-brand-500 px-5 py-3 text-brand-600 font-semibold hover:bg-brand-50"
                  >
                    lire la suite
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

        {/* Controls */}
        <div className="pointer-events-none absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between px-4">
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => {
              prev();
              start();
            }}
            className="pointer-events-auto grid place-items-center rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
          >
            <svg viewBox="0 0 129 129" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-brand-400">
              <path d="m64.5,122.6c32,0 58.1-26 58.1-58.1s-26-58-58.1-58-58,26-58,58 26,58.1 58,58.1zm0-108c27.5,0 49.9,22.4 49.9,49.9s-22.4,49.9-49.9,49.9-49.9-22.4-49.9-49.9 22.4-49.9 49.9-49.9z" />
              <path d="m70,93.5c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8l-23.5-23.5 23.5-23.5c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-26.4,26.4c-0.8,0.8-1.2,1.8-1.2,2.9s0.4,2.1 1.2,2.9l26.4,26.4z" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Suivant"
            onClick={() => {
              next();
              start();
            }}
            className="pointer-events-auto grid place-items-center rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
          >
            <svg viewBox="0 0 129 129" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-brand-400">
              <path d="M64.5,122.6c32,0,58.1-26,58.1-58.1S96.5,6.4,64.5,6.4S6.4,32.5,6.4,64.5S32.5,122.6,64.5,122.6z M64.5,14.6c27.5,0,49.9,22.4,49.9,49.9S92,114.4,64.5,114.4S14.6,92,14.6,64.5S37,14.6,64.5,14.6z" />
              <path d="m51.1,93.5c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l26.4-26.4c0.8-0.8 1.2-1.8 1.2-2.9 0-1.1-0.4-2.1-1.2-2.9l-26.4-26.4c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l23.5,23.5-23.5,23.5c-1.6,1.6-1.6,4.2 0,5.8z" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <ol className="absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-2">
          {normalized.map((_, i) => (
            <li key={i}>
              <button
                aria-label={`Aller à la diapositive ${i + 1}`}
                aria-current={i === index}
                onClick={() => {
                  goTo(i);
                  start();
                }}
                className={[
                  "h-2 w-6 rounded bg-secondary-400/70 transition-opacity",
                  i === index ? "bg-secondary-900 dark:bg-secondary-200" : "opacity-60 hover:opacity-90",
                ].join(" ")}
              />
            </li>
          ))}
        </ol>
      </div>

      {/* Optional thumbnail selector */}
      {showThumbnails && normalized.length > 1 && (
        <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-6">
          {normalized.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                goTo(i);
                start();
              }}
              aria-label={`Aller à ${s.title}`}
              className={[
                "group relative rounded-lg overflow-hidden border",
                i === index ? "border-brand-500" : "border-transparent",
              ].join(" ")}
            >
              <div className="relative h-16 w-full">
                {!errored[`thumb-${s.id}`] ? (
                  <BaseImage
                    src={s.imgSrc}
                    alt={s.imgAlt}
                    className="object-cover w-full h-full"
                    style={{ objectFit: "cover" }}
                    onError={() => setErrored((e) => ({ ...e, [s.id]: true }))}
                    // loading={isActive ? "eager" : "lazy"}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-secondary-100 dark:bg-secondary-700 text-secondary-500 dark:text-secondary-400 text-[11px]">
                    N/A
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-black/40 px-1 py-0.5 text-[11px] text-white line-clamp-1">
                {s.title}
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
