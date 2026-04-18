"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { announcements } from "@/lib/cms";

export default function MarqueeBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % announcements.length), 6000);
    return () => clearInterval(t);
  }, []);
  const a = announcements[i];

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-9 border-b border-[var(--color-ink3)] bg-[var(--color-ink2)] text-[11px] uppercase tracking-[0.18em] text-[var(--color-ivory2)]">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-[var(--gutter)]">
        <span className="text-[var(--color-steel-light)]">
          <span className="text-[var(--color-amber)]">●</span> {a.text}
        </span>
        <Link
          href={a.href}
          className="inline-flex items-center gap-1 text-[var(--color-amber)] hover:text-[var(--color-amber-hot)]"
        >
          Learn more <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  );
}
