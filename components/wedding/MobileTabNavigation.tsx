"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export type TabId = "home" | "story" | "countdown" | "location" | "rsvp" | "messages";

interface Tab {
  id: TabId;
  icon: string;
}

const TABS: Tab[] = [
  { id: "home", icon: "🏠" },
  { id: "story", icon: "💕" },
  { id: "countdown", icon: "⏰" },
  { id: "location", icon: "📍" },
  { id: "rsvp", icon: "✉️" },
  { id: "messages", icon: "💌" },
];

interface MobileTabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function MobileTabNavigation({
  activeTab,
  onTabChange,
}: MobileTabNavigationProps) {
  const { t } = useLanguage();
  
  const getTabLabel = (id: TabId) => {
    switch (id) {
      case "home": return t.tabs.home;
      case "story": return t.tabs.story;
      case "countdown": return t.tabs.countdown;
      case "location": return t.tabs.location;
      case "rsvp": return t.tabs.rsvp;
      case "messages": return t.tabs.messages;
      default: return "";
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-800/50 bg-[#0c0a0b]/95 backdrop-blur-md safe-area-inset-bottom"
      role="navigation"
      aria-label="Main navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-1 py-2 sm:px-2 sm:py-2.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const label = getTabLabel(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[10px] transition-colors active:opacity-70 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-2 focus:ring-offset-[#0c0a0b] sm:gap-1 sm:px-2 sm:py-2 sm:text-xs"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`text-lg transition-transform sm:text-xl ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              >
                {tab.icon}
              </span>
              <span
                className={`font-medium transition-colors ${
                  isActive ? "text-rose-300" : "text-stone-500"
                }`}
              >
                {label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute -top-0.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-rose-500"
                  layoutId="activeTab"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
