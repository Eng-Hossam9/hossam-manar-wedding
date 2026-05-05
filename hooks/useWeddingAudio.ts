"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useWeddingAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.play().then(() => {
      setIsPlaying(true);
      setIsUnlocked(true);
    }).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const unlock = useCallback(() => {
    play();
  }, [play]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    el.addEventListener("ended", onEnded);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("play", onPlay);
    };
  }, []);

  return {
    audioRef,
    isPlaying,
    isUnlocked,
    play,
    pause,
    toggle,
    unlock,
  };
}
