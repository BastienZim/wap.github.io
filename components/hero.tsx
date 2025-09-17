"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background landmark image */}
      <div className="absolute inset-0">
        <Image
          src="/OtsukaetJirodemo-2.jpg"
          alt="Paris background"
          fill
          priority
          className="object-cover object-top opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-28 text-center text-white">
        {/* Logo */}
        <div className="mx-auto mb-6 flex justify-center">
          <Image
            src="/logowap.png"
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
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl opacity-90"
        >
          Karaté Wado-Ryu & Ju-Jutsu — tradition, technique et harmonie.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/a-propos"
            className="rounded-xl bg-brand-500 px-6 py-3 text-white font-semibold shadow-smooth hover:bg-brand-600 transition"
          >
            Découvrir
          </Link>
          <Link
            href="/schedule"
            className="rounded-xl border border-white/60 px-6 py-3 font-semibold hover:bg-white/10 transition"
          >
            Voir les horaires
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
