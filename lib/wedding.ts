import { Language } from "./translations";

export const GROOM_NAME = "Hossam";
export const BRIDE_NAME = "Manar";
export const COUPLE_LABEL = `${GROOM_NAME} ❤️ ${BRIDE_NAME}`;

/** Countdown target; override with NEXT_PUBLIC_WEDDING_ISO */
export const WEDDING_DATE_ISO =
  process.env.NEXT_PUBLIC_WEDDING_ISO ?? "2026-06-18T19:00:00";
export const WEDDING_DATE = new Date(WEDDING_DATE_ISO);

/** Display venue — set NEXT_PUBLIC_VENUE_NAME_EN / _AR to customize */
export const VENUE_DISPLAY_EN =
  process.env.NEXT_PUBLIC_VENUE_NAME_EN ??
  "Shubra — Nile Corniche — Heaven Hall";
export const VENUE_DISPLAY_AR =
  process.env.NEXT_PUBLIC_VENUE_NAME_AR ??
  "شبرا — كورنيش النيل — قاعة هيفين";

export const PARTY_TIME_EN =
  process.env.NEXT_PUBLIC_PARTY_TIME_EN ?? "7:00 PM";
export const PARTY_TIME_AR =
  process.env.NEXT_PUBLIC_PARTY_TIME_AR ?? "7:00 م";

export function venueForLanguage(lang: Language): string {
  return lang === "ar" ? VENUE_DISPLAY_AR : VENUE_DISPLAY_EN;
}

export function partyTimeForLanguage(lang: Language): string {
  return lang === "ar" ? PARTY_TIME_AR : PARTY_TIME_EN;
}

/** Google Maps embed — Heaven Hall / Shubra Nile (exact pin from shared Maps link) */
const WEDDING_MAP_LAT = 30.1101837;
const WEDDING_MAP_LNG = 31.243557;

export const WEDDING_MAP_EMBED_URL =
  process.env.NEXT_PUBLIC_MAP_EMBED_URL ??
  `https://maps.google.com/maps?q=${WEDDING_MAP_LAT},${WEDDING_MAP_LNG}&hl=ar&z=17&output=embed`;

export function getWeddingDateLabel(lang: Language): string {
  const date = WEDDING_DATE;
  if (lang === "ar") {
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** e.g. 18 . 06 . 2026 (reference-style) */
export function getWeddingDateDots(): string {
  const date = WEDDING_DATE;
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  return `${dd} . ${mm} . ${yyyy}`;
}

export function getPartyWeekdayLabel(lang: Language): string {
  return WEDDING_DATE.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
    weekday: "long",
  });
}

export interface TimelineStep {
  id: string;
  title: string;
  body: string;
  image: string;
}

const PLACEHOLDER_IMAGE = "/gallery/placeholder.svg";

export function getTimelineSteps(lang: Language): TimelineStep[] {
  const { timeline } = require("./translations").translations[lang];
  return [
    {
      id: "first-meet",
      title: timeline.firstMeet.title,
      body: timeline.firstMeet.body,
      image: "/gallery/first-meet.png",
    },
    {
      id: "first-message",
      title: timeline.firstMessage.title,
      body: timeline.firstMessage.body,
      image: "/gallery/first-message.png",
    },
    {
      id: "story-began",
      title: timeline.storyBegan.title,
      body: timeline.storyBegan.body,
      image: "/gallery/our-story-began.png",
    },
    {
      id: "engagement",
      title: timeline.engagement.title,
      body: timeline.engagement.body,
      image: "/gallery/engagement.png",
    },
  ];
}

export const GALLERY_IMAGES = Array.from({ length: 6 }, () => PLACEHOLDER_IMAGE);

export const INVITATION_TEXT =
  "With joy in our hearts, we invite you to celebrate the beginning of our forever. Your presence will make our wedding day complete. Come share in our love, laughter, and the promise of a new chapter together. We cannot wait to see you there.";
