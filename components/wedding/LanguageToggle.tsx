"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-4 z-50 flex items-center gap-2 rounded-full border border-rose-200/90 bg-white/90 px-4 py-2 text-sm font-medium text-rose-950 shadow-sm backdrop-blur-md transition-colors active:bg-rose-50 sm:top-6 sm:hover:bg-rose-50/90"
      style={{
        [language === "ar" ? "left" : "right"]: "1rem",
        [language === "ar" ? "right" : "left"]: "auto",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
    >
      <span className="text-base">{language === "en" ? "🇺🇸" : "🇸🇦"}</span>
      <span className="hidden sm:inline">{language === "en" ? "English" : "العربية"}</span>
      <span className="sm:hidden">{language === "en" ? "EN" : "AR"}</span>
    </motion.button>
  );
}
