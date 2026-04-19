"use client";
import Frame from "@/components/primitives/Frame";
import RevealText from "@/components/motion/RevealText";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      data-section="manifesto"
      className="relative flex min-h-[90svh] items-center overflow-hidden section-pad"
      style={{ backgroundColor: "var(--color-ivory)", color: "var(--color-ink)" }}
    >
      {/* ink/amber floating editorial marks */}
      <span
        aria-hidden
        className="font-display absolute left-[calc(var(--gutter)*-0.3)] top-[var(--space-section-sm)] text-[var(--color-ink)] opacity-[0.05] pointer-events-none select-none"
        style={{ fontSize: "clamp(160px, 28vw, 480px)", lineHeight: 0.8, fontWeight: 800 }}
      >
        01
      </span>
      <span
        aria-hidden
        className="font-serif-italic absolute right-[calc(var(--gutter)*-0.2)] bottom-[var(--space-section-sm)] text-[var(--color-amber)] opacity-40 select-none pointer-events-none"
        style={{ fontSize: "clamp(72px, 12vw, 180px)", lineHeight: 0.8 }}
      >
        §
      </span>

      <Frame className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-amber-hot)]" />
          <p
            className="font-[var(--font-mono)] uppercase"
            style={{
              fontSize: "var(--fs-eyebrow)",
              letterSpacing: "var(--tr-eyebrow)",
              color: "#9a5a00",
            }}
          >
            Manifesto · 01
          </p>
        </div>

        <h2
          className="mt-10 max-w-[22ch] text-[var(--color-ink)] font-serif-italic"
          style={{
            fontSize: "var(--fs-display-xl)",
            lineHeight: "var(--lh-display)",
            letterSpacing: "var(--tr-display-loose)",
          }}
        >
          <RevealText>
            We don&apos;t teach AI. We institutionalize the engineering discipline AI-native
            software demands.
          </RevealText>
        </h2>

        <div className="mt-[var(--space-block)] grid gap-10 max-w-5xl sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              k: "01",
              t: "Bounded",
              d: "Every model has a contract. Inputs shape; outputs schema. Nothing leaks.",
            },
            {
              k: "02",
              t: "Deterministic edges",
              d: "Classifiers, extractors, validators are pure functions. LLMs live inside.",
            },
            {
              k: "03",
              t: "Refusable",
              d: "Unsupported claims return uncertainty, not prose. Silence is a feature.",
            },
          ].map((p) => (
            <div
              key={p.k}
              className="min-w-0 border-t border-[#2d2820]/25 pt-5"
            >
              <div
                className="font-[var(--font-mono)] uppercase"
                style={{
                  fontSize: "var(--fs-eyebrow-sm)",
                  letterSpacing: "var(--tr-eyebrow)",
                  color: "#9a5a00",
                }}
              >
                {p.k}
              </div>
              <div
                className="mt-3 font-display text-[var(--color-ink)] break-words"
                style={{
                  fontSize: "clamp(22px, 2.2vw, 30px)",
                  lineHeight: 1.05,
                  letterSpacing: "var(--tr-display-tight)",
                }}
              >
                {p.t}
              </div>
              <p className="mt-3 text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-ink)]/75">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </Frame>
    </section>
  );
}
