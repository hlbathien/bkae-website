"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const BANDS = [
  {
    href: "/join",
    label: "Join the founding cohort",
    kicker: "Apply · 4 slots open",
    accent: true,
  },
  {
    href: "/projects",
    label: "View open-source projects",
    kicker: "Evidence · 02 shipped",
    accent: false,
  },
  {
    href: "/journal",
    label: "Read the engineering journal",
    kicker: "Field notes · 03 essays",
    accent: false,
  },
];

function Band({
  href,
  label,
  kicker,
  accent,
  index,
}: {
  href: string;
  label: string;
  kicker: string;
  accent: boolean;
  index: number;
}) {
  const root = useRef<HTMLAnchorElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  // Text mask reveal: amber text overlays ivory text, clipped by circle at cursor
  const onMove = (e: React.MouseEvent) => {
    const el = root.current;
    const w = word.current;
    if (!el || !w) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    w.style.setProperty("--mx", `${x}%`);
    w.style.setProperty("--my", `${y}%`);
  };

  return (
    <Link
      ref={root}
      href={href}
      data-cursor={accent ? "magnet" : "link"}
      onMouseMove={onMove}
      className="group relative flex items-baseline justify-between gap-6 overflow-hidden border-b border-[var(--color-ink3)] px-[var(--gutter)] py-[clamp(32px,5vw,72px)]"
      style={{
        backgroundColor: accent ? "var(--color-ink2)" : "var(--color-ink)",
      }}
    >
      {/* amber wipe bg on hover — <200ms to respect motion contract */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[var(--color-amber)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
      <span className="relative z-10 font-[var(--font-mono)] text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-wide)] text-[var(--color-amber)] group-hover:text-[var(--color-ink)] transition-colors duration-150 self-center shrink-0">
        0{index + 1} · {kicker}
      </span>

      <span
        ref={word}
        className="band-word relative z-10 flex-1 font-display text-[var(--color-ivory)] group-hover:text-[var(--color-ink)] transition-colors duration-150"
        style={{
          fontSize: "clamp(28px, 5vw, 84px)",
          letterSpacing: "var(--tr-display-tight)",
          lineHeight: 0.95,
        }}
      >
        {label}
      </span>

      <span className="relative z-10 flex items-center gap-3 text-[var(--color-amber)] group-hover:text-[var(--color-ink)] transition-colors duration-150 self-center shrink-0">
        {accent && (
          <span className="font-[var(--font-mono)] text-[var(--fs-eyebrow-sm)] uppercase tracking-[var(--tr-wide)]">
            → apply
          </span>
        )}
        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2 w-[clamp(20px,2.4vw,32px)] h-[clamp(20px,2.4vw,32px)]" />
      </span>
    </Link>
  );
}

export default function CTABands() {
  return (
    <section id="cta" data-section="cta" className="border-t border-[var(--color-ink3)]">
      {BANDS.map((b, i) => (
        <Band key={b.href} {...b} index={i} />
      ))}
    </section>
  );
}
