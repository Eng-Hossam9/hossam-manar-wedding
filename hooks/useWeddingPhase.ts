"use client";

import { useCallback, useEffect, useState } from "react";

export type WeddingPhase = "loading" | "intro" | "main";

const LOADING_DURATION_MS = 2200;

export function useWeddingPhase(): [
  WeddingPhase,
  (phase: WeddingPhase) => void,
  () => void
] {
  const [phase, setPhase] = useState<WeddingPhase>("loading");

  const goToMain = useCallback(() => {
    setPhase("main");
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => setPhase("intro"), LOADING_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  return [phase, setPhase, goToMain];
}
