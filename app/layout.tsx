import type { Metadata } from "next";
import { Cormorant_Garamond, Quicksand } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-app-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Quicksand({
  variable: "--font-app-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hossam & Manar | Our Wedding",
  description:
    "Join us in celebrating our love. Hossam and Manar are getting married June 18, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#fff4ec] text-stone-800 font-sans selection:bg-rose-200 selection:text-stone-900"
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
