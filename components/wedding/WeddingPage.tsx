"use client";

import { AnimatePresence } from "framer-motion";
import { useWeddingPhase } from "@/hooks/useWeddingPhase";
import { useWeddingAudio } from "@/hooks/useWeddingAudio";
import { LoadingScreen } from "./LoadingScreen";
import { IntroExperience } from "./IntroExperience";
import { InvitationScrollPage } from "./InvitationScrollPage";
import { LanguageToggle } from "./LanguageToggle";

export function WeddingPage() {
  const [phase, , goToMain] = useWeddingPhase();
  const {
    audioRef,
    isPlaying,
    toggle: onMusicToggle,
    unlock: onUnlockMusic,
  } = useWeddingAudio();

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/romantic.mp3"
        loop
        preload="metadata"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        {phase === "loading" && <LoadingScreen key="loading" />}
        {phase === "intro" && (
          <IntroExperience
            key="intro"
            onEnter={goToMain}
            onUnlockMusic={onUnlockMusic}
            musicPlaying={isPlaying}
            onMusicToggle={onMusicToggle}
          />
        )}
      </AnimatePresence>

      {phase === "main" && (
        <>
          <LanguageToggle />
          <InvitationScrollPage
            isPlaying={isPlaying}
            onMusicToggle={onMusicToggle}
          />
        </>
      )}
    </>
  );
}
