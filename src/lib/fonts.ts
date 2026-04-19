import { Syne, Instrument_Serif, DM_Mono } from "next/font/google";

export const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

// Class helpers for manual application when Tailwind is insufficient.
export const fontClass = {
  display: "font-display",
  serifItalic: "font-serif-italic",
  mono: "font-[var(--font-mono)]",
} as const;
