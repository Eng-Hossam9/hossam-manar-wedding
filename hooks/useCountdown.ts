"use client";

import { useEffect, useState } from "react";
import { WEDDING_DATE } from "@/lib/wedding";

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getRemaining(target: Date): CountdownValues {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isPast: false };
}

export function useCountdown(targetDate: Date = WEDDING_DATE): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(() =>
    getRemaining(targetDate)
  );

  useEffect(() => {
    const tick = () => setValues(getRemaining(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return values;
}
