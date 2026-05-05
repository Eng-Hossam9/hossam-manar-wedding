"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountdown } from "@/hooks/useCountdown";
import {
  BRIDE_NAME,
  GROOM_NAME,
  getPartyWeekdayLabel,
  getTimelineSteps,
  getWeddingDateDots,
  getWeddingDateLabel,
  venueForLanguage,
  partyTimeForLanguage,
  WEDDING_MAP_EMBED_URL,
} from "@/lib/wedding";
import { fadeUp, joySpring, joySpringSlow, popIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { FlowerRain } from "./FlowerRain";
import { RsvpSection } from "./RsvpSection";
import { MessagesSection } from "./MessagesSection";

const HERO_DECOR = ["🌹", "🌸", "🌷", "🌿"] as const;

function CountdownCell({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-rose-200/80 bg-white/80 px-3 py-3 shadow-md shadow-rose-100/50 backdrop-blur-sm sm:px-4 sm:py-4">
      <motion.span
        key={value}
        className="font-mono text-3xl tabular-nums text-rose-600 sm:text-4xl md:text-5xl"
        initial={{ opacity: 0.5, y: -10, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={joySpring}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-rose-800/70 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

interface InvitationScrollPageProps {
  isPlaying: boolean;
  onMusicToggle: () => void;
}

export function InvitationScrollPage({
  isPlaying,
  onMusicToggle,
}: InvitationScrollPageProps) {
  const { t, language } = useLanguage();
  const s = t.scrollInvite;
  const { days, hours, minutes, seconds, isPast } = useCountdown();
  const timeline = getTimelineSteps(language);
  const dateDots = getWeddingDateDots();
  const dateLong = getWeddingDateLabel(language);
  const weekday = getPartyWeekdayLabel(language);
  const venue = venueForLanguage(language);
  const partyTime = partyTimeForLanguage(language);

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#fffdfb] via-[#fff4ec] to-[#ffe8f0] pb-32 text-stone-800">
      <FlowerRain intensity="full" />

      {/* Soft celebratory glow */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
        <motion.div
          className="absolute -left-1/4 top-0 h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-gradient-to-br from-rose-200/45 to-amber-200/35 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 top-1/3 h-[min(60vw,360px)] w-[min(60vw,360px)] rounded-full bg-gradient-to-bl from-fuchsia-200/35 to-rose-200/40 blur-3xl"
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-5 pt-20 pb-16 text-center">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rose-100/90 via-orange-50/50 to-transparent"
            aria-hidden
          />

          <motion.div
            className="mb-10 flex justify-center gap-5 text-2xl sm:gap-6 sm:text-3xl md:text-4xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            aria-hidden
          >
            {HERO_DECOR.map((emoji, i) => (
              <motion.span
                key={emoji + i}
                variants={popIn}
                className="inline-block drop-shadow-sm"
                whileHover={{
                  scale: 1.18,
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.45 },
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="text-[11px] font-medium uppercase tracking-[0.35em] text-rose-700 sm:text-xs"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
          >
            {s.invitedLine1}
          </motion.p>
          <motion.p
            className="mt-2 text-[11px] uppercase tracking-[0.35em] text-amber-900/70 sm:text-xs"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {s.invitedLine2}
          </motion.p>

          <motion.h1
            className="mt-10 bg-gradient-to-r from-rose-900 via-rose-700 to-amber-800 bg-clip-text font-serif text-4xl font-semibold tracking-wide text-transparent drop-shadow-sm sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, ...joySpringSlow }}
          >
            {GROOM_NAME}
          </motion.h1>
          <motion.p
            className="mt-2 font-serif text-2xl text-rose-500 sm:text-3xl"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.38, ...joySpring }}
          >
            &
          </motion.p>
          <motion.h1
            className="mt-2 bg-gradient-to-r from-rose-900 via-rose-700 to-amber-800 bg-clip-text font-serif text-4xl font-semibold tracking-wide text-transparent sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, ...joySpringSlow }}
          >
            {BRIDE_NAME}
          </motion.h1>

          <motion.p
            className="mt-10 font-serif text-xl tracking-[0.28em] text-rose-800 sm:text-2xl md:text-3xl"
            initial={{ opacity: 0, letterSpacing: "0.15em" }}
            animate={{ opacity: 1, letterSpacing: "0.28em" }}
            transition={{ delay: 0.55, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {dateDots}
          </motion.p>

          <motion.p
            className="mt-10 text-xs font-medium uppercase tracking-[0.3em] text-rose-800/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            {s.untilBigDay}
          </motion.p>

          <motion.div
            className="mt-5 flex flex-row flex-wrap items-end justify-center gap-2 sm:gap-3"
            dir="ltr"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, ...joySpringSlow }}
          >
            {isPast ? (
              <p className="font-serif text-xl text-rose-700">{t.countdown.past}</p>
            ) : (
              <>
                <CountdownCell value={days} label={s.countdownShortDays} />
                <span className="pb-7 font-mono text-2xl text-rose-300 sm:text-3xl">:</span>
                <CountdownCell value={hours} label={s.countdownShortHrs} />
                <span className="pb-7 font-mono text-2xl text-rose-300 sm:text-3xl">:</span>
                <CountdownCell value={minutes} label={s.countdownShortMin} />
                <span className="pb-7 font-mono text-2xl text-rose-300 sm:text-3xl">:</span>
                <CountdownCell value={seconds} label={s.countdownShortSec} />
              </>
            )}
          </motion.div>
        </section>

        {/* Welcome */}
        <section className="border-t border-rose-200/50 bg-white/55 px-5 py-16 shadow-inner shadow-rose-100/30 backdrop-blur-sm sm:py-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="font-serif text-3xl text-rose-950 sm:text-4xl">{s.welcomeTitle}</h2>
            <p className="mt-6 text-sm leading-relaxed text-stone-600 sm:text-base">
              {t.invitation.text}
            </p>
          </motion.div>
        </section>

        {/* Our Moments */}
        <section className="border-t border-rose-200/50 px-5 py-16 sm:py-20">
          <motion.div
            className="mx-auto max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.p
              variants={popIn}
              className="text-center text-xs font-medium uppercase tracking-[0.35em] text-rose-500"
            >
              ✦
            </motion.p>
            <motion.h2
              variants={popIn}
              className="mt-3 text-center font-serif text-3xl text-rose-950 sm:text-4xl"
            >
              {s.momentsTitle}
            </motion.h2>
            <motion.p
              variants={popIn}
              className="mt-2 text-center text-sm font-medium text-amber-900/65"
            >
              {dateLong} · {s.momentsSubtitle}
            </motion.p>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {timeline.map((step, i) => (
                <motion.div
                  key={step.id}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-rose-200/90 bg-white shadow-lg shadow-rose-100/40 ring-1 ring-rose-100/60"
                  variants={popIn}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4, transition: joySpring }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-rose-950/88 via-rose-900/40 to-transparent p-3 pt-10">
                    <p className="text-center font-serif text-xs text-white sm:text-sm">{step.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* The Happy Couple */}
        <section className="border-t border-rose-200/50 bg-gradient-to-b from-white/60 to-amber-50/25 px-5 py-16 backdrop-blur-[2px] sm:py-20">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="font-serif text-3xl text-rose-950 sm:text-4xl">{s.coupleTitle}</h2>
            <p className="mt-2 text-sm font-medium italic text-rose-600">{s.coupleTagline}</p>
            <motion.p
              className="mt-8 font-serif text-2xl text-rose-950 sm:text-3xl"
              whileInView={{ scale: [1, 1.02, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {GROOM_NAME}
            </motion.p>
            <p className="mt-1 text-2xl text-rose-500">♡</p>
            <p className="mt-1 font-serif text-2xl text-rose-950 sm:text-3xl">{BRIDE_NAME}</p>
            <p className="mt-10 text-lg leading-relaxed text-stone-700 sm:text-xl">﷽</p>
            <p className="mt-6 text-base leading-loose text-stone-600 sm:text-lg" dir="rtl">
              {s.verse}
            </p>
            <p className="mt-4 text-sm font-medium text-rose-600">{s.verseSource}</p>
          </motion.div>
        </section>

        {/* When & Where */}
        <section className="border-t border-rose-200/50 px-5 py-16 sm:py-20">
          <motion.div
            className="mx-auto max-w-3xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-center font-serif text-3xl text-rose-950 sm:text-4xl">{s.whenWhereTitle}</h2>
            <p className="mt-2 text-center text-sm font-medium text-amber-900/65">{s.whenWhereSubtitle}</p>

            <motion.div
              className="mt-12 space-y-8 rounded-3xl border border-rose-200/90 bg-white/90 p-8 shadow-xl shadow-rose-100/50 sm:p-10"
              whileHover={{ boxShadow: "0 24px 48px -12px rgba(251, 113, 133, 0.2)" }}
              transition={joySpring}
            >
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-600">
                  {s.ourWeddingParty}
                </p>
                <p className="mt-3 font-serif text-2xl tracking-[0.2em] text-rose-950 sm:text-3xl">{dateDots}</p>
                <p className="mt-2 text-xs text-rose-400">✦</p>
                <p className="mt-3 font-serif text-xl capitalize text-stone-800">{weekday}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-rose-800/60">
                  {s.fridayTimeLabel}
                </p>
                <p className="mt-2 text-lg font-medium text-rose-700">{partyTime}</p>
              </div>

              <div className="border-t border-rose-100 pt-8">
                <p className="text-center text-2xl" aria-hidden>
                  🏛️
                </p>
                <p className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-rose-800/60">
                  {s.venueLabel}
                </p>
                <p className="mt-2 text-center font-serif text-lg text-stone-800 sm:text-xl">{venue}</p>
                <p className="mt-6 text-center text-xs font-semibold uppercase tracking-widest text-rose-800/60">
                  {s.locationLabel}
                </p>
                <p className="mt-2 text-center text-sm text-stone-600">{venue}</p>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 overflow-hidden rounded-2xl border border-rose-200/90 shadow-lg shadow-rose-100/40 ring-1 ring-amber-100/50"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={joySpringSlow}
            >
              <iframe
                src={WEDDING_MAP_EMBED_URL}
                width="100%"
                height="280"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding venue location"
                className="block sm:h-[320px]"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Wedding song */}
        <section className="border-t border-rose-200/50 bg-white/45 px-5 py-14 backdrop-blur-sm sm:py-16">
          <motion.div
            className="mx-auto flex max-w-md flex-col items-center text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              className="text-3xl"
              aria-hidden
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎵
            </motion.p>
            <h2 className="mt-3 font-serif text-2xl text-rose-950 sm:text-3xl">{s.weddingSongTitle}</h2>
            <p className="mt-1 text-sm font-medium text-rose-800/70">
              ♪ {s.weddingSongPlaying}
            </p>
            <motion.button
              type="button"
              onClick={onMusicToggle}
              className="mt-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-rose-200 bg-gradient-to-br from-rose-400 to-rose-600 text-2xl text-white shadow-lg shadow-rose-200/60 outline-none ring-rose-200/50 focus-visible:ring-4"
              aria-label={isPlaying ? "Pause music" : "Play music"}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={joySpring}
            >
              {isPlaying ? "⏸" : "▶"}
            </motion.button>
          </motion.div>
        </section>

        <div className="border-t border-rose-200/50 bg-amber-50/20">
          <RsvpSection variant="embedded" />
        </div>
        <div className="border-t border-rose-200/50 bg-white/40">
          <MessagesSection variant="embedded" />
        </div>
      </div>
    </main>
  );
}
