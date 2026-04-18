"use client";
import Frame from "@/components/primitives/Frame";
import RevealText from "@/components/motion/RevealText";

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative flex min-h-[80svh] items-center py-32">
      <span
        aria-hidden
        className="font-display absolute left-2 top-10 text-[var(--color-amber)] opacity-[0.12]"
        style={{ fontSize: "clamp(80px, 14vw, 240px)", lineHeight: 0.8 }}
      >
        “
      </span>
      <span
        aria-hidden
        className="font-display absolute right-2 bottom-10 text-[var(--color-amber)] opacity-[0.12]"
        style={{ fontSize: "clamp(80px, 14vw, 240px)", lineHeight: 0.8 }}
      >
        ”
      </span>

      <Frame>
        <p className="eyebrow mb-10">[ Manifesto · 01 ]</p>
        <h2
          className="font-serif-italic max-w-5xl text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(34px, 5.6vw, 88px)", lineHeight: 1.05 }}
        >
          <RevealText>
            We don&apos;t teach AI. We institutionalize the engineering discipline AI-native
            software demands.
          </RevealText>
        </h2>
      </Frame>
    </section>
  );
}
