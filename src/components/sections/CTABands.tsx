import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BANDS = [
  { href: "/projects", label: "View open-source projects", bg: "bg-[var(--color-ink)]" },
  { href: "/journal", label: "Read the engineering journal", bg: "bg-[var(--color-ink2)]" },
  { href: "/join", label: "Join the founding cohort", bg: "bg-[var(--color-ink3)]" },
];

export default function CTABands() {
  return (
    <section className="border-t border-[var(--color-ink3)]">
      {BANDS.map((b, i) => (
        <Link
          key={b.href}
          href={b.href}
          className={`cta-fill group flex items-center justify-between gap-6 border-b border-[var(--color-ink3)] px-[var(--gutter)] py-10 ${b.bg}`}
        >
          <span className="eyebrow">0{i + 1}</span>
          <span
            className="font-display flex-1 text-[var(--color-ivory)] group-hover:text-[var(--color-ink)]"
            style={{ fontSize: "clamp(28px, 5vw, 80px)" }}
          >
            {b.label}
          </span>
          <ArrowRight
            size={32}
            className="text-[var(--color-amber)] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--color-ink)]"
          />
        </Link>
      ))}
    </section>
  );
}
