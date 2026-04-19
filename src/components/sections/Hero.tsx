"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import RevealText from "@/components/motion/RevealText";
import MarqueeRow from "@/components/motion/MarqueeRow";
import MagneticBtn from "@/components/motion/MagneticBtn";
import Frame from "@/components/primitives/Frame";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { ensureGsap } from "@/lib/gsap";

const HeroBlob = dynamic(() => import("@/components/motion/HeroBlob"), { ssr: false });

const KEYWORDS =
  "VIBE CODING · DETERMINISTIC · BOUNDED · SHIP · MEASURE · TRACEABLE · REFUSABLE · ";

function LiveClock() {
  const [t, setT] = useState<string>("ICT —:—:—");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    });
    const tick = () => setT(`ICT ${fmt.format(new Date())}`);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!root.current || !titleRef.current) return;
    const { gsap } = ensureGsap();
    const rootEl = root.current;
    const titleEl = titleRef.current;

    const ctx = gsap.context(() => {
      // scrub kinetic title — tiny tracking shift, stays in display-tight range so resting pose preserved
      gsap.fromTo(
        titleEl,
        { letterSpacing: "-0.035em" },
        {
          letterSpacing: "-0.025em",
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, rootEl);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      data-section="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[clamp(160px,18vh,220px)] pb-[var(--space-section-sm)]"
    >
      <HeroBlob />

      {/* Ghost keyword marquee — positioned below the signal strip band so it
          never collides w/ hero title. Opacity trimmed to 0.025 per SoT §15.4 restraint. */}
      <div aria-hidden className="pointer-events-none absolute bottom-[8%] left-0 right-0 z-0 select-none">
        <MarqueeRow
          text={KEYWORDS.repeat(8)}
          speed={110}
          className="font-display text-[10vw] leading-none text-[var(--color-ivory)] opacity-[0.025]"
        />
      </div>

      <Frame className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[var(--color-amber)]" />
          <p className="eyebrow">Agentic Engineering · HCMUT · Founded 2026</p>
        </div>

        <h1
          ref={titleRef}
          className="font-display text-[var(--color-ivory)] max-w-full"
          data-cursor="text"
          style={{
            fontSize: "clamp(48px, 9vw, 152px)",
            lineHeight: 0.94,
            textWrap: "balance",
            wordBreak: "normal",
            overflowWrap: "break-word",
          }}
        >
          <RevealText splitBy="word">AGENTIC</RevealText>{" "}
          <RevealText
            as="span"
            splitBy="word"
            className="font-serif-italic text-[var(--color-amber)] inline-block align-baseline"
            delay={0.15}
          >
            engineering
          </RevealText>{" "}
          <RevealText splitBy="word" delay={0.25}>
            FOR THE
          </RevealText>{" "}
          <RevealText splitBy="word" delay={0.35}>
            INEVITABLE.
          </RevealText>
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[var(--fs-eyebrow-sm)] uppercase tracking-[var(--tr-wide)] text-[var(--color-ivory2)]">
          <span>Data first</span>
          <span className="text-[var(--color-amber)]">●</span>
          <span>Bounded LLMs</span>
          <span className="text-[var(--color-amber)]">●</span>
          <span>Shipped systems</span>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticBtn
            href="/join"
            className="cta-fill inline-flex items-center gap-3 border border-[var(--color-amber)] bg-[var(--color-amber)] px-6 py-3 text-[12px] uppercase tracking-[var(--tr-wide)] text-[var(--color-ink)]"
          >
            Apply — founding cohort <ArrowRight size={14} />
          </MagneticBtn>
          <Link
            href="/projects"
            data-cursor="link"
            className="inline-flex items-center gap-2 border border-[var(--color-ink3)] px-6 py-3 text-[12px] uppercase tracking-[var(--tr-wide)] text-[var(--color-ivory)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] transition-colors duration-150"
          >
            View shipped work →
          </Link>
        </div>

        {/* Live build band */}
        <div className="mt-10 font-[var(--font-mono)] text-[var(--fs-eyebrow-sm)] normal-case tracking-normal text-[var(--color-steel)]">
          <LiveClock /> · v1.0.0-{process.env.NEXT_PUBLIC_BUILD_SHA || "dev"} · online · HCMUT
        </div>

        <div className="mt-14">
          <Link
            href="#manifesto"
            data-cursor="link"
            className="bracket-link text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-wide)] text-[var(--color-steel-light)] hover:text-[var(--color-amber)]"
          >
            The thesis ↓
          </Link>
        </div>
      </Frame>
    </section>
  );
}
