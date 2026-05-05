"use client";

import { motion } from "framer-motion";
import { useTypingText } from "@/hooks/useTypingText";
import { useLanguage } from "@/contexts/LanguageContext";

export function InvitationSection() {
  const { t } = useLanguage();
  const { display, done } = useTypingText(t.invitation.text, {
    speedMs: 35,
    startAfterMs: 400,
    enabled: true,
  });

  return (
    <section className="relative overflow-hidden bg-[#0c0a0b] px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div
        className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-rose-950/20"
        aria-hidden
      />
      <motion.div
        className="relative mx-auto max-w-2xl rounded-xl border border-rose-500/20 bg-rose-950/30 px-6 py-10 shadow-[0_0_60px_rgba(244,63,94,0.08)] sm:rounded-2xl sm:px-8 sm:py-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-6 text-center font-serif text-2xl font-medium text-rose-200 sm:mb-8 sm:text-3xl">
          {t.invitation.title}
        </h2>
        <p className="min-h-[8em] font-serif text-base leading-relaxed text-stone-300 sm:text-lg">
          {display}
          {!done && (
            <span className="inline-block h-5 w-0.5 animate-pulse bg-rose-400" />
          )}
        </p>
      </motion.div>
    </section>
  );
}
