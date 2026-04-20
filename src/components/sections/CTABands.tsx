"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ensureGsap } from "@/lib/gsap";
import { useClickRipple } from "@/hooks/useClickRipple";

const BANDS = [
  {
    href: "/join",
    label: "Join the founding cohort",
    kicker: "Apply · 4 slots open",
    accent: true,
    img: "/cover-lumen.svg", // placeholder
  },
  {
    href: "/projects",
    label: "View open-source projects",
    kicker: "Evidence · 02 shipped",
    accent: false,
    img: "/cover-atlas.svg", // placeholder
  },
  {
    href: "/journal",
    label: "Read the engineering journal",
    kicker: "Field notes · 03 essays",
    accent: false,
    img: "/cover-lumen.svg", // placeholder
  },
];

function Band({
  href,
  label,
  kicker,
  accent,
  img,
  index,
}: {
  href: string;
  label: string;
  kicker: string;
  accent: boolean;
  img: string;
  index: number;
}) {
  const root = useRef<HTMLAnchorElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  useClickRipple(root);

  useEffect(() => {
    if (typeof window === "undefined" || !imgWrap.current || !root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = ensureGsap();
    
    const xTo = gsap.quickTo(imgWrap.current, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(imgWrap.current, "y", { duration: 0.4, ease: "power3.out" });
    const scaleTo = gsap.quickTo(imgWrap.current, "scale", { duration: 0.3, ease: "back.out(1.5)" });

    gsap.set(imgWrap.current, { scale: 0, xPercent: -50, yPercent: -50 });

    const handleEnter = () => scaleTo(1);
    const handleLeave = () => scaleTo(0);
    const handleMove = (e: MouseEvent) => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      
      xTo(cx);
      yTo(cy);

      const w = word.current;
      if (w) {
        w.style.setProperty("--mx", `${(cx / r.width) * 100}%`);
        w.style.setProperty("--my", `${(cy / r.height) * 100}%`);
      }
    };

    const el = root.current;
    if (el) {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
      el.addEventListener("mousemove", handleMove);
    }
    return () => {
      if (el) {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
        el.removeEventListener("mousemove", handleMove);
      }
    };
  }, []);

  return (
    <Link
      ref={root}
      href={href}
      data-cursor={accent ? "magnet" : "link"}
      className="group relative flex items-baseline justify-between gap-6 overflow-hidden border-b border-[var(--color-ink3)] px-[var(--gutter)] py-[clamp(32px,5vw,72px)] isolate"
      style={{
        backgroundColor: accent ? "var(--color-ink2)" : "var(--color-ink)",
      }}
    >
      <div 
        ref={imgWrap} 
        className="pointer-events-none absolute left-0 top-0 z-0 h-[200px] w-[300px] overflow-hidden rounded opacity-[0.25] mix-blend-screen"
      >
        <Image 
          src={img} 
          alt="" 
          fill 
          className="object-cover" 
          sizes="300px"
        />
      </div>

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
          <span className="draw-underline font-[var(--font-mono)] text-[var(--fs-eyebrow-sm)] uppercase tracking-[var(--tr-wide)]">
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
