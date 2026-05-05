"use client";

import { useCallback, useEffect, useState } from "react";

export function useTypingText(
  text: string,
  options: { speedMs?: number; startAfterMs?: number; enabled?: boolean } = {}
) {
  const { speedMs = 40, startAfterMs = 300, enabled = true } = options;
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  const reset = useCallback(() => {
    setDisplay("");
    setDone(false);
  }, []);

  useEffect(() => {
    if (!enabled || !text) {
      setDisplay(text);
      setDone(true);
      return;
    }
    setDisplay("");
    setDone(false);
    const start = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speedMs);
      return () => clearInterval(id);
    }, startAfterMs);
    return () => clearTimeout(start);
  }, [text, speedMs, startAfterMs, enabled]);

  return { display, done, reset };
}
