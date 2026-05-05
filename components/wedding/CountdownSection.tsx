"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { useLanguage } from "@/contexts/LanguageContext";

function DigitBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        key={value}
        className="inline-block min-w-[1.2em] rounded-lg bg-rose-500/20 px-2 py-1.5 font-mono text-3xl font-bold tabular-nums text-rose-200 shadow-[0_0_30px_rgba(244,63,94,0.2)] sm:px-3 sm:py-2 sm:text-4xl md:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="mt-1.5 text-xs uppercase tracking-widest text-stone-500 sm:mt-2 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const { days, hours, minutes, seconds, isPast } = useCountdown();
  const { t } = useLanguage();

  if (isPast) {
    return (
      <section className="bg-[#0c0a0b] px-6 py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center font-serif text-3xl text-rose-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t.countdown.past}
        </motion.div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center bg-[#0c0a0b] px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <motion.h2
        className="mb-8 text-center font-serif text-3xl font-medium text-stone-100 sm:mb-12 sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t.countdown.title}
      </motion.h2>
      <motion.div
        className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4 sm:gap-6 md:gap-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <DigitBlock value={days} label={t.countdown.days} />
        <DigitBlock value={hours} label={t.countdown.hours} />
        <DigitBlock value={minutes} label={t.countdown.minutes} />
        <DigitBlock value={seconds} label={t.countdown.seconds} />
      </motion.div>
    </section>
  );
}
