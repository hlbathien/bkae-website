"use client";
import RevealText from "@/components/motion/RevealText";
import MarqueeRow from "@/components/motion/MarqueeRow";
import Frame from "@/components/primitives/Frame";
import Link from "next/link";

const KEYWORDS = "VIBE CODING · DETERMINISTIC · BOUNDED · SHIP · MEASURE · TRACEABLE · REFUSABLE · ";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32 pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 25% 35%, rgba(240,160,32,0.10) 0%, transparent 60%)",
        }}
      />

      <div aria-hidden className="absolute top-[18%] left-0 right-0 -z-10 select-none">
        <MarqueeRow
          text={KEYWORDS.repeat(8)}
          speed={70}
          className="font-display text-[12vw] leading-none text-[var(--color-ivory)] opacity-[0.04]"
        />
      </div>
      <div aria-hidden className="absolute bottom-[12%] left-0 right-0 -z-10 select-none">
        <MarqueeRow
          text={KEYWORDS.repeat(8)}
          speed={90}
          reverse
          className="font-display text-[12vw] leading-none text-[var(--color-ivory)] opacity-[0.03]"
        />
      </div>

      <Frame className="relative z-10">
        <p className="eyebrow mb-6">[ Inference · HCMUT · Founded 2026 ]</p>

        <h1 className="font-display text-[var(--color-ivory)]" style={{ fontSize: "clamp(48px, 9vw, 168px)" }}>
          <RevealText splitBy="char">AGENTIC</RevealText>
          <br />
          <RevealText
            as="span"
            splitBy="word"
            className="font-serif-italic text-[var(--color-amber)]"
            delay={0.15}
          >
            engineering
          </RevealText>{" "}
          <RevealText splitBy="char" delay={0.25}>FOR THE</RevealText>
          <br />
          <RevealText splitBy="char" delay={0.35}>INEVITABLE.</RevealText>
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ivory2)]">
          <span>Data first</span>
          <span className="text-[var(--color-amber)]">●</span>
          <span>Bounded LLMs</span>
          <span className="text-[var(--color-amber)]">●</span>
          <span>Shipped systems</span>
        </div>

        <div className="mt-12">
          <Link
            href="#manifesto"
            className="bracket-link text-[12px] uppercase tracking-[0.22em] text-[var(--color-ivory)] hover:text-[var(--color-amber)]"
          >
            The thesis ↓
          </Link>
        </div>
      </Frame>
    </section>
  );
}
