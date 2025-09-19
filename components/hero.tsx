"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "@/components/ui/BaseImage";
import { useCallback } from "react";

export default function Hero() {
  // Smooth scroll to #schedule section
  const handleScrollToSchedule = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("schedule");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[65vh] -mt-8 md:-mt-17">
      {/* Background image + overlay */}
      <div className="absolute inset-0 top-0 h-full w-full z-0">
        <Image
          src="/images/directly_useful/OtsukaetJirodemo-2.jpg"
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-28 text-center text-white">
        {/* Logo */}
        <div className="mx-auto mb-6 flex justify-center">
          <Image
            src="/images/directly_useful/logowap.png"
            alt="Wado Academy Paris logo"
            width={120}
            height={120}
            className="drop-shadow-lg"
          />
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl leading-tight drop-shadow-lg"
        >
          Wado Academy <span className="text-brand-400">Paris</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-primary-100 dark:text-primary-200 opacity-90"
        >
          Karaté Wado-Ryu &amp; Ju-Jutsu — tradition, technique et harmonie.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/pratique"
            className="rounded-xl bg-brand-500 px-6 py-3 text-white font-semibold shadow-smooth hover:bg-brand-600 transition"
          >
            Découvrir
          </Link>
          <a
            href="#schedule"
            onClick={handleScrollToSchedule}
            className="rounded-xl border border-primary-100 dark:border-secondary-700 px-6 py-3 font-semibold text-primary-100 dark:text-primary-200 hover:bg-primary-100/20 dark:hover:bg-secondary-700/20 transition cursor-pointer"
          >
            Voir les horaires
          </a>
        </motion.div>
      </div>
    </section>
  );
}
