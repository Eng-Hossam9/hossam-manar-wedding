"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const HEART = "❤️";
const COUNT = 12;
const FALL_DISTANCE = 1200;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function FloatingHearts() {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: reduced ? 0 : COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 10,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 6,
        size: 12 + Math.random() * 16,
        opacity: 0.15 + Math.random() * 0.2,
      })),
    [reduced]
  );

  if (particles.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-rose-400/80"
          style={{
            left: `${p.x}%`,
            top: "100%",
            fontSize: p.size,
          }}
          animate={{
            y: [-20, -FALL_DISTANCE],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {HEART}
        </motion.span>
      ))}
    </div>
  );
}
