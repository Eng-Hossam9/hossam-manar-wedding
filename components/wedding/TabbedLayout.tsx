"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { MobileTabNavigation, TabId } from "./MobileTabNavigation";
import { HeroSection } from "./HeroSection";
import { LoveStoryTimeline } from "./LoveStoryTimeline";
import { CountdownSection } from "./CountdownSection";
import { EventDetailsSection } from "./EventDetailsSection";
import { RsvpSection } from "./RsvpSection";
import { InvitationSection } from "./InvitationSection";
import { MessagesSection } from "./MessagesSection";

const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -20,
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "easeInOut" as const,
  duration: 0.3,
};

export function TabbedLayout() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [mounted, setMounted] = useState(false);

  // Only access sessionStorage after component mounts (client-side)
  useEffect(() => {
    setMounted(true);
    const savedTab = sessionStorage.getItem("activeTab") as TabId | null;
    if (savedTab && ["home", "story", "countdown", "location", "rsvp", "messages"].includes(savedTab)) {
      setActiveTab(savedTab);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab, mounted]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="min-h-screen">
            <HeroSection />
            <InvitationSection />
          </div>
        );
      case "story":
        return <LoveStoryTimeline />;
      case "countdown":
        return <CountdownSection />;
      case "location":
        return <EventDetailsSection />;
      case "rsvp":
        return <RsvpSection />;
      case "messages":
        return <MessagesSection />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen pb-24 sm:pb-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
      <MobileTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
