"use client";

import { motion } from "framer-motion";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  visible: boolean;
}

export function MusicPlayer({ isPlaying, onToggle, visible }: MusicPlayerProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-24 right-4 z-50 sm:bottom-6 sm:right-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-400/30 bg-rose-950/80 shadow-lg transition-colors active:bg-rose-900/80 sm:h-14 sm:w-14 sm:hover:bg-rose-900/80"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <span className="text-xl sm:text-2xl">{isPlaying ? "⏸" : "▶"}</span>
      </button>
    </motion.div>
  );
}
