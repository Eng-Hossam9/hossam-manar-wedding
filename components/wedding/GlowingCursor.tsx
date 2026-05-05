"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function GlowingCursor() {
  const [mounted, setMounted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { damping: 25, stiffness: 200 };
  const xS = useSpring(x, spring);
  const yS = useSpring(y, spring);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    if (isTouch) return;
    setDisabled(false);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!mounted || disabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
      style={{ x: xS, y: yS }}
      aria-hidden
    />
  );
}
