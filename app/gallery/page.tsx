"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#fff7ed] px-6 py-24">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-serif text-4xl font-medium text-rose-950">
          Gallery
        </h1>
        <p className="mt-4 text-stone-600">
          Our full gallery is on the main page. Come back to explore.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-rose-400/50 px-6 py-3 text-rose-200 transition-colors hover:border-rose-400/80"
        >
          Back to our story
        </Link>
      </motion.div>
    </div>
  );
}
