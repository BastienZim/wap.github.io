"use client";
import BaseImage from "@/components/ui/BaseImage";
import { useState, useEffect, useRef } from "react";
import { GalleryImage } from "./galleryUtils";
import Lightbox, { LightboxItem } from "@/components/ui/Lightbox";
import CTA from "@/components/cta-banner";
interface GalleryClientPageProps {
  images: GalleryImage[];
}

// Utility function to join class names
function cn(...classes: Array<string | boolean | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Image card component with appearing animation
function ImageCard({ 
  image, 
  index, 
  staggerMs, 
  onSelect 
}: { 
  image: GalleryImage; 
  index: number; 
  staggerMs: number;
  onSelect: (index: number) => void;
}) {
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

  const staggerStyle = { ["--stagger" as string]: `${staggerMs}ms` };

  return (
    <div
      ref={cardRef}
      style={staggerStyle}
      className={cn(
        "group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out [transition-delay:var(--stagger)]",
        visible
          ? "motion-safe:opacity-100 motion-safe:translate-y-0"
          : "motion-safe:opacity-0 motion-safe:translate-y-2"
      )}
      role="button"
      tabIndex={0}
      aria-label={`Ouvrir l'image ${index + 1}`}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(index);
        }
      }}
    >
      <div className="relative w-full aspect-square bg-white/50 overflow-hidden">
        <BaseImage
          src={image.src}
          alt={image.alt}
          fill
          objectFit="cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/20 transition-colors duration-300" />
      </div>
    </div>
  );
}

export default function GalleryClientPage({ images }: GalleryClientPageProps) {
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Extract unique folder names
  const folders = Array.from(new Set(images.map(img => img.folder)));

  // Filter images based on selected folder
  const filteredImages = selectedFolder === "all" 
    ? images 
    : images.filter(img => img.folder === selectedFolder);

  const lightboxItems: LightboxItem[] = filteredImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.folder ? `${img.folder}` : undefined,
  }));

  useEffect(() => {
    if (lightboxIndex >= filteredImages.length) {
      setLightboxIndex(0);
    }
  }, [filteredImages.length, lightboxIndex]);

  return (
    <>
      <main className="relative max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <section>
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-700 dark:text-brand-500 mb-4">
            Galerie
          </h1>
        </div>

        {/* Folder filters */}
        {folders.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <ul className="flex items-center gap-2">
              <li>
                <button
                  onClick={() => setSelectedFolder("all")}
                  aria-current={selectedFolder === "all" ? "page" : undefined}
                  className={`relative inline-flex items-center rounded-full px-3.5 py-2 transition motion-safe:duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2
                    ${selectedFolder === "all"
                      ? "bg-brand-500/20 ring-1 ring-brand-500/30 text-secondary-900 dark:text-primary-600 font-semibold"
                      : "text-brand-600 dark:text-brand-500 hover:bg-primary-100/60 dark:hover:bg-secondary-700/60 hover:text-primary-700 dark:hover:text-primary-200 font-medium"}`}
                >
                  <span className="relative">
                    Tous
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 motion-safe:transition-transform motion-safe:duration-300
                        ${selectedFolder === "all"
                          ? "scale-x-100 bg-secondary-700/80 dark:bg-success-700/80"
                          : "group-hover:scale-x-100 bg-brand-500/60"}`}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </li>
              {folders.map(folder => (
                <li key={folder}>
                  <button
                    onClick={() => setSelectedFolder(folder)}
                    aria-current={selectedFolder === folder ? "page" : undefined}
                    className={`relative inline-flex items-center rounded-full px-3.5 py-2 transition motion-safe:duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2
                      ${selectedFolder === folder
                        ? "bg-brand-500/20 ring-1 ring-brand-500/30 text-secondary-900 dark:text-primary-600 font-semibold"
                        : "text-brand-600 dark:text-brand-500 hover:bg-primary-100/60 dark:hover:bg-secondary-700/60 hover:text-primary-700 dark:hover:text-primary-200 font-medium"}`}
                  >
                    <span className="relative">
                      {folder}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 motion-safe:transition-transform motion-safe:duration-300
                          ${selectedFolder === folder
                            ? "scale-x-100 bg-secondary-700/80 dark:bg-success-700/80"
                            : "group-hover:scale-x-100 bg-brand-500/60"}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <ImageCard
                key={index}
                image={image}
                index={index}
                staggerMs={index * 100}
                onSelect={(i) => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-[color:rgb(var(--color-foreground)_/_70%)]">
            <p>Aucune image trouvée dans la galerie.</p>
            <p className="mt-2 text-sm">Veuillez vérifier que le dossier public/images contient des fichiers image.</p>
          </div>
        )}
      </section>

      <CTA/>
    </main>

    <Lightbox
      isOpen={lightboxOpen}
      index={lightboxIndex}
      items={lightboxItems}
      onClose={() => setLightboxOpen(false)}
      onIndexChange={setLightboxIndex}
      ariaLabel="Visionneuse de la galerie"
    />
    </>
  );
}