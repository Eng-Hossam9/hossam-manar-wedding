"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getWeddingDateLabel, WEDDING_MAP_EMBED_URL } from "@/lib/wedding";

export function EventDetailsSection() {
  const { t, language } = useLanguage();
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#0c0a0b] px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <motion.h2
        className="mb-8 text-center font-serif text-3xl font-medium text-stone-100 sm:mb-12 sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t.eventDetails.title}
      </motion.h2>
      <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
        <motion.div
          className="rounded-xl border border-stone-700/50 bg-stone-900/50 p-6 sm:rounded-2xl sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-rose-400 sm:text-sm">
            {t.eventDetails.date}
          </p>
          <p className="mt-2 font-serif text-xl text-stone-100 sm:text-2xl">
            {getWeddingDateLabel(language)}
          </p>
        </motion.div>
        <motion.div
          className="overflow-hidden rounded-xl border border-stone-700/50 sm:rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <iframe
            src={WEDDING_MAP_EMBED_URL}
            width="100%"
            height="280"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding venue location"
            className="block sm:h-[320px] md:h-[400px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
