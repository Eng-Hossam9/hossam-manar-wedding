"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTimelineSteps } from "@/lib/wedding";

export function LoveStoryTimeline() {
  const { t, language } = useLanguage();
  const timelineSteps = getTimelineSteps(language);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] bg-[#0c0a0b] px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="mb-8 text-center font-serif text-3xl font-medium text-stone-100 sm:mb-12 sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {t.loveStory.title}
        </motion.h2>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-px bg-gradient-to-b from-rose-500/50 via-rose-400/30 to-transparent md:block"
            aria-hidden
          />
          {timelineSteps.map((step, i) => (
            <motion.article
              key={step.id}
              className="relative flex flex-col gap-4 py-8 sm:gap-6 sm:py-10 md:flex-row md:items-center md:gap-12 md:py-12"
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`flex flex-1 flex-col md:flex-row md:items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-xl sm:h-56 md:h-64 md:w-72">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 288px"
                    unoptimized
                  />
                </div>
                <div
                  className={`mt-3 flex flex-1 flex-col sm:mt-4 md:mt-0 ${
                    i % 2 === 1 ? "md:items-end md:text-right" : ""
                  }`}
                >
                  <h3 className="font-serif text-xl font-medium text-rose-200 sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400 sm:text-base">{step.body}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
