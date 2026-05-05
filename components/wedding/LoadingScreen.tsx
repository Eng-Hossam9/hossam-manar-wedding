"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-orange-50/40 to-amber-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="h-1 w-48 overflow-hidden rounded-full bg-rose-200/80"
        initial={{ opacity: 1 }}
      >
        <motion.div
          className="h-full rounded-full bg-rose-500/90"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.p
        className="mt-6 font-serif text-lg tracking-widest text-rose-800/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
}
