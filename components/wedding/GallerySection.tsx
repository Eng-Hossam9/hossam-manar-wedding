"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GALLERY_IMAGES } from "@/lib/wedding";

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close]);

  return (
    <section className="bg-[#0c0a0b] px-6 py-24">
      <motion.h2
        className="mb-16 text-center font-serif text-4xl font-medium text-stone-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Gallery
      </motion.h2>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {GALLERY_IMAGES.map((src, i) => (
          <motion.button
            key={src + i}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => open(i)}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              unoptimized
            />
            <div
              className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onKeyDown={(e) => e.key === "Escape" && close()}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            tabIndex={-1}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-4xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[lightboxIndex]}
                alt=""
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto rounded-lg object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
