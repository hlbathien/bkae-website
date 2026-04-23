"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Announcement } from "@/lib/cms";

export default function MarqueeBarClient({ announcements }: { announcements: Announcement[] }) {
  const [i, setI] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty("--marquee-height", dismissed ? "0px" : "36px");
    return () => {
      document.documentElement.style.setProperty("--marquee-height", "0px");
    };
  }, [dismissed]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(sessionStorage.getItem("ae:marquee-dismissed") === "1");
    }
  }, []);

  useEffect(() => {
    if (isHovered || dismissed || !announcements.length) return;
    const t = setInterval(() => setI((p) => (p + 1) % announcements.length), 6000);
    return () => clearInterval(t);
  }, [isHovered, dismissed, announcements.length]);

  if (dismissed || !announcements.length) return null;
  const a = announcements[i % announcements.length];

  return (
    <div
      className="group fixed left-0 right-0 top-0 z-50 h-9 border-b border-[var(--color-ink3)] bg-[var(--color-ink2)] text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] text-[var(--color-ivory2)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-[var(--gutter)] relative">
        <Link href={a.href} className="flex-1 flex items-center justify-between">
          <span className="text-[var(--color-steel-light)]">
            <span className="text-[var(--color-amber)]">●</span> {a.text}
          </span>
          <span className="inline-flex items-center gap-1 text-[var(--color-amber)] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[var(--color-amber-hot)]">
            Learn more <ArrowUpRight size={12} />
          </span>
        </Link>
        <button
          className="ml-6 flex items-center justify-center text-[var(--color-steel)] hover:text-[var(--color-amber)] transition-colors"
          aria-label="Dismiss announcement"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            sessionStorage.setItem("ae:marquee-dismissed", "1");
            setDismissed(true);
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
