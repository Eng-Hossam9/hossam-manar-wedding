"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { COUPLE_LABEL, getWeddingDateLabel } from "@/lib/wedding";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();

  const LINES = [
    t.hero.line1,
    t.hero.line2,
    COUPLE_LABEL,
    getWeddingDateLabel(language),
  ];

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a0b] via-rose-950/20 to-[#0c0a0b]" />

      <motion.div
        className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-6 py-16 text-center sm:py-24"
      >
        <motion.div
          className="flex max-w-2xl flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.25, delayChildren: 0.3 },
            },
            hidden: {},
          }}
        >
          {LINES.map((line, i) => (
            <motion.p
              key={i}
              className="font-serif text-2xl font-medium text-stone-100 drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
