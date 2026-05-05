"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const BLOSSOMS = ["🌸", "🌺", "🌷", "🌼", "💮", "🪷", "✿", "❀"] as const;
const COUNT = 32;
const MAX_DRIFT = 56;

export function FlowerRain({ intensity = "full" }: { intensity?: "full" | "soft" }) {
  const reduceMotion = useReducedMotion();
  const count = reduceMotion ? 0 : intensity === "soft" ? 14 : COUNT;

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const left = (i * 37 + Math.random() * 28) % 100;
        const delay = Math.random() * 6;
        const duration = 9 + Math.random() * 10;
        const size = 0.85 + Math.random() * 0.95;
        const blossom = BLOSSOMS[i % BLOSSOMS.length];
        const drift = (Math.random() - 0.5) * MAX_DRIFT * 2;
        const spin = 180 + Math.random() * 540;
        const peakOpacity = intensity === "soft" ? 0.22 + Math.random() * 0.12 : 0.35 + Math.random() * 0.25;
        return { id: i, left, delay, duration, size, blossom, drift, spin, peakOpacity };
      }),
    [count, intensity]
  );

  if (petals.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute will-change-transform select-none"
          style={{
            left: `${p.left}%`,
            top: "-8%",
            fontSize: `${1.1 * p.size}rem`,
            filter: "drop-shadow(0 1px 2px rgba(225, 29, 72, 0.12))",
          }}
          initial={{ opacity: 0, y: 0, rotate: 0, x: 0 }}
          animate={{
            y: ["0vh", "108vh"],
            x: [0, p.drift * 0.45, p.drift * -0.35, p.drift * 0.2, 0],
            rotate: [0, p.spin * 0.4, p.spin],
            opacity: [0, p.peakOpacity, p.peakOpacity, p.peakOpacity * 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.12, 0.45, 0.78, 1],
          }}
        >
          {p.blossom}
        </motion.span>
      ))}
    </div>
  );
}
