"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  name: string;
  attendance: "yes" | "no";
  message: string;
  date: string;
}

const listSectionClass = (embedded: boolean) =>
  embedded
    ? "bg-transparent px-4 py-16 sm:px-6 sm:py-20"
    : "min-h-[calc(100vh-5rem)] bg-[#fff7ed] px-4 py-12 sm:px-6 sm:py-16 md:py-24";

const emptyOrLoadingClass = (embedded: boolean) =>
  embedded
    ? "flex flex-col items-center justify-center bg-transparent px-4 py-16 sm:px-6 sm:py-20"
    : "flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center bg-[#fff7ed] px-4 py-12 sm:px-6 sm:py-16 md:py-24";

export function MessagesSection({
  variant = "default",
}: {
  variant?: "default" | "embedded";
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();
  const embedded = variant === "embedded";

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("weddingMessages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Sort by date, newest first
        const sorted = parsed.sort(
          (a: Message, b: Message) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setMessages(sorted);
      } catch (e) {
        console.error("Error parsing messages:", e);
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Show loading state during hydration
  if (!mounted) {
    return (
      <section className={emptyOrLoadingClass(embedded)}>
        <div className="mx-auto max-w-md text-center">
          <div className="inline-block text-5xl sm:text-6xl">💌</div>
          <h2 className="mt-6 font-serif text-2xl font-medium text-rose-800 sm:text-3xl">
            {t.messages.loading}
          </h2>
        </div>
      </section>
    );
  }

  if (messages.length === 0) {
    return (
      <section className={emptyOrLoadingClass(embedded)}>
        <motion.div
          className="mx-auto max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block text-5xl sm:text-6xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💌
          </motion.span>
          <h2 className="mt-6 font-serif text-2xl font-medium text-rose-800 sm:text-3xl">
            {t.messages.noMessages}
          </h2>
          <p className="mt-4 text-sm text-stone-600 sm:text-base">
            {t.messages.beFirst}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className={listSectionClass(embedded)}>
      <motion.h2
        className="mb-8 text-center font-serif text-3xl font-medium text-rose-950 sm:mb-12 sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t.messages.title}
      </motion.h2>
      <div className="mx-auto max-w-2xl space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            className="rounded-xl border border-rose-200/90 bg-white p-6 shadow-sm sm:rounded-2xl sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-xl font-medium text-rose-900 sm:text-2xl">
                    {msg.name}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      msg.attendance === "yes"
                        ? "bg-green-100 text-green-800"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {msg.attendance === "yes" ? t.messages.attending : t.messages.notAttending}
                  </span>
                </div>
                {msg.message && (
                  <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
                    {msg.message}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-4 text-xs text-stone-500 sm:text-sm">
              {formatDate(msg.date)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
