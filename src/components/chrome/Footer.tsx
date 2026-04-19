"use client";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

function Clock() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    });
    const tick = () => {
      if (ref.current) ref.current.textContent = `${fmt.format(new Date())} ICT`;
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return <span ref={ref} suppressHydrationWarning />;
}

export default function Footer() {
  const word = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!word.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const el = word.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { letterSpacing: "-0.04em", opacity: 0.55, color: "#1a1a15" },
        {
          letterSpacing: "0.01em",
          opacity: 1,
          color: "#d4870a",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "bottom bottom", scrub: 1 },
        },
      );
    }, el);
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
      ctx.revert();
    };
  }, []);

  return (
    <footer className="relative mt-[var(--space-section)] border-t border-[var(--color-ink3)] bg-[var(--color-ink)]">
      <div className="mx-auto max-w-[1600px] px-[var(--gutter)] pt-[var(--space-section-sm)] pb-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="eyebrow mb-3">Agentic Engineering</p>
            <p className="text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-steel-light)] max-w-xs">
              Agentic Engineering at HCMUT. Bounded LLMs. Contract-based pipelines. Shipped systems.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Sitemap</p>
            <ul className="space-y-2 text-[var(--fs-body)] text-[var(--color-ivory2)]">
              <li>
                <Link href="/projects" data-cursor="link" className="draw-underline">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/journal" data-cursor="link" className="draw-underline">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/manifesto" data-cursor="link" className="draw-underline">
                  Manifesto
                </Link>
              </li>
              <li>
                <Link href="/join" data-cursor="link" className="draw-underline">
                  Join
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Contact</p>
            <ul className="space-y-2 text-[var(--fs-body)] text-[var(--color-ivory2)]">
              <li>
                <a className="draw-underline" data-cursor="link" href="mailto:hello@inference.club">
                  hello@inference.club
                </a>
              </li>
              <li>
                <a className="draw-underline" data-cursor="link" href="https://github.com/inference-club">
                  github/inference-club
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Colophon</p>
            <ul className="space-y-2 text-[var(--fs-body)] text-[var(--color-steel-light)]">
              <li>Type: Syne · Instrument Serif · DM Mono</li>
              <li>Stack: Next 16 · React 19 · GSAP · Lenis · ogl · Tailwind v4</li>
              <li>Deploy: Vercel · Neon · R2</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] text-[var(--color-steel)]">
          <span>
            Crafted in{" "}
            <span className="font-serif-italic text-[var(--color-amber)] normal-case">
              Ho Chi Minh City
            </span>
          </span>
          <span className="font-[var(--font-mono)] normal-case tracking-normal text-[var(--color-ivory2)]">
            <Clock />
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none overflow-hidden px-[var(--gutter)] flex flex-col items-center justify-center"
      >
        <h2
          ref={word}
          className="font-display leading-[0.85] text-center flex flex-col"
          style={{ fontSize: "clamp(50px, 14vw, 220px)", marginBottom: "-0.3em", letterSpacing: "var(--tr-display-tight)" }}
        >
          <span>AGENTIC</span>
          <span>ENGINEERING</span>
        </h2>
      </div>
    </footer>
  );
}
