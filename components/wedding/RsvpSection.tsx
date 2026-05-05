"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const sectionShell = (embedded: boolean) =>
  embedded
    ? "bg-transparent px-4 py-16 sm:px-6 sm:py-20"
    : "min-h-[calc(100vh-5rem)] bg-[#fff7ed] px-4 py-12 sm:px-6 sm:py-16 md:py-24";

const thankYouShell = (embedded: boolean) =>
  embedded
    ? "flex flex-col items-center justify-center bg-transparent px-4 py-16 sm:px-6 sm:py-20"
    : "flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center bg-[#fff7ed] px-4 py-12 sm:px-6 sm:py-16 md:py-24";

export function RsvpSection({
  variant = "default",
}: {
  variant?: "default" | "embedded";
}) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();
  const embedded = variant === "embedded";

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !attendance) return;
      
      // Save message to localStorage
      if (typeof window !== "undefined") {
        const messages = JSON.parse(localStorage.getItem("weddingMessages") || "[]");
        const newMessage = {
          id: Date.now().toString(),
          name: name.trim(),
          attendance,
          message: message.trim(),
          date: new Date().toISOString(),
        };
        messages.push(newMessage);
        localStorage.setItem("weddingMessages", JSON.stringify(messages));
      }
      
      setSubmitted(true);
    },
    [name, attendance, message]
  );

  if (submitted) {
    return (
      <section className={thankYouShell(embedded)}>
        <motion.div
          className="mx-auto max-w-md text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block text-5xl sm:text-6xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            ❤️
          </motion.span>
          <h2 className="mt-6 font-serif text-2xl font-medium text-rose-800 sm:text-3xl">
            {t.rsvp.thankYou}
          </h2>
          <p className="mt-4 text-sm text-stone-600 sm:text-base">
            {t.rsvp.received}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className={sectionShell(embedded)}>
      <motion.h2
        className="mb-8 text-center font-serif text-3xl font-medium text-rose-950 sm:mb-12 sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t.rsvp.title}
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md space-y-5 sm:space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label htmlFor="rsvp-name" className="block text-sm text-stone-600">
            {t.rsvp.name}
          </label>
          <input
            id="rsvp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-rose-200 bg-white px-4 py-3 text-base text-stone-800 placeholder-stone-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            placeholder={t.rsvp.namePlaceholder}
          />
        </div>
        <div>
          <span className="block text-sm text-stone-600">{t.rsvp.attendance}</span>
          <div className="mt-2 flex gap-6">
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="radio"
                name="attendance"
                checked={attendance === "yes"}
                onChange={() => setAttendance("yes")}
                className="h-5 w-5 border-rose-300 bg-white text-rose-600 focus:ring-rose-400"
              />
              <span className="text-base text-stone-700">{t.rsvp.yes}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="radio"
                name="attendance"
                checked={attendance === "no"}
                onChange={() => setAttendance("no")}
                className="h-5 w-5 border-rose-300 bg-white text-rose-600 focus:ring-rose-400"
              />
              <span className="text-base text-stone-700">{t.rsvp.no}</span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="rsvp-message" className="block text-sm text-stone-600">
            {t.rsvp.message}
          </label>
          <textarea
            id="rsvp-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-rose-200 bg-white px-4 py-3 text-base text-stone-800 placeholder-stone-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            placeholder={t.rsvp.messagePlaceholder}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full rounded-full bg-rose-500 py-3.5 text-base font-medium text-white shadow-sm transition-colors active:bg-rose-600 sm:py-3 sm:hover:bg-rose-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t.rsvp.send}
        </motion.button>
      </motion.form>
    </section>
  );
}
