"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { COUPLE_LABEL } from "@/lib/wedding";
import { Language, translations } from "@/lib/translations";
import { FlowerRain } from "./FlowerRain";

interface IntroExperienceProps {
  onEnter: () => void;
  onUnlockMusic: () => void;
  musicPlaying: boolean;
  onMusicToggle: () => void;
}

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("language");
  return saved === "ar" ? "ar" : "en";
}

const OPEN_MS = 900;

export function IntroExperience({
  onEnter,
  onUnlockMusic,
  musicPlaying,
  onMusicToggle,
}: IntroExperienceProps) {
  const [lang, setLang] = useState<Language>("en");
  const [open, setOpen] = useState(false);
  const entered = useRef(false);

  useEffect(() => {
    setLang(readStoredLanguage());
  }, []);

  const s = translations[lang].scrollInvite;

  const handleOpen = useCallback(() => {
    if (open || entered.current) return;
    setOpen(true);
    window.setTimeout(() => {
      if (entered.current) return;
      entered.current = true;
      onUnlockMusic();
      onEnter();
    }, OPEN_MS);
  }, [open, onEnter, onUnlockMusic]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50/50 to-amber-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <FlowerRain intensity="soft" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(251, 113, 133, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 80% 80%, rgba(253, 186, 116, 0.15) 0%, transparent 40%)`,
        }}
        aria-hidden
      />

      <motion.h1
        className="relative z-10 px-6 text-center font-serif text-2xl font-semibold tracking-wide text-rose-950/90 drop-shadow-sm sm:text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {COUPLE_LABEL}
      </motion.h1>

      <motion.p
        className="relative z-10 mt-3 max-w-sm px-6 text-center text-sm font-medium text-rose-800/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {s.envelopeHint}
      </motion.p>

      <motion.div
        className="relative z-10 mt-10 px-4"
        style={{ perspective: "1100px" }}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.2 }}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label={s.envelopeHint}
          className={`relative mx-auto h-64 w-[min(88vw,300px)] select-none [transform-style:preserve-3d] sm:w-[320px] ${open ? "pointer-events-none" : "cursor-pointer"}`}
        >
          {/* Inner card (behind pocket + flap) */}
          <motion.div
            className="absolute inset-x-7 top-12 bottom-[5.25rem] z-0 rounded-lg border border-rose-200 bg-white px-3 py-5 text-center shadow-inner sm:inset-x-8"
            animate={{
              y: open ? -22 : 0,
              scale: open ? 1.03 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-xs font-medium text-rose-900 sm:text-sm">
              {s.invitedLine1}
            </p>
            <p className="mt-1 font-serif text-[11px] text-rose-700/90 sm:text-xs">
              {s.invitedLine2}
            </p>
            <p className="mt-3 font-serif text-base text-rose-950 sm:text-lg">
              {COUPLE_LABEL}
            </p>
          </motion.div>

          {/* Pocket (lower half) */}
          <div className="absolute bottom-0 left-0 right-0 z-[1] h-[52%] rounded-b-2xl border-2 border-t-0 border-rose-300/90 bg-gradient-to-b from-rose-100 to-rose-50 shadow-[0_10px_40px_-10px_rgba(190,24,93,0.22)]" />

          {/* Flap (upper half, hinged at bottom edge) + seal */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-[2] h-[52%] origin-bottom rounded-t-2xl border-2 border-b-0 border-rose-300/90 bg-gradient-to-b from-rose-200 via-rose-100 to-rose-50/95 shadow-sm"
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            initial={false}
            animate={{ rotateX: open ? -175 : 0 }}
            transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-rose-400/80 bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg sm:h-16 sm:w-16"
              aria-hidden
            >
              <span className="text-xl text-rose-50 sm:text-2xl">✉</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 mt-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMusicToggle();
          }}
          className="text-sm text-rose-800/70 underline-offset-4 hover:text-rose-900 hover:underline"
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? s.musicHintPlaying : s.musicHintOff}
        </button>
      </motion.div>
    </motion.div>
  );
}
