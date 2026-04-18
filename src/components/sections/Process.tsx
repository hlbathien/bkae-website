"use client";
import { useEffect, useRef } from "react";
import Frame from "@/components/primitives/Frame";
import { processNodes } from "@/lib/cms";
import { ensureGsap } from "@/lib/gsap";

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!section.current || !track.current) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const { gsap, ScrollTrigger } = ensureGsap();

    const ctx = gsap.context(() => {
      const t = track.current!;
      const distance = t.scrollWidth - window.innerWidth + 200;
      gsap.to(t, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="process"
      className="relative overflow-hidden border-t border-[var(--color-ink3)] py-24 lg:h-screen lg:py-0"
    >
      <Frame className="lg:hidden">
        <p className="eyebrow mb-6">[ The pipeline · 03 ]</p>
        <h2
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(32px, 6vw, 64px)" }}
        >
          A contract at every edge.
        </h2>
        <ol className="mt-10 space-y-6">
          {processNodes.map((n, i) => (
            <li key={n.id} className="border-l border-[var(--color-amber)] pl-5">
              <p className="eyebrow">Stage {i + 1}</p>
              <p className="font-display text-2xl text-[var(--color-ivory)]">{n.label}</p>
              <p className="text-[var(--color-steel-light)]">{n.desc}</p>
            </li>
          ))}
        </ol>
      </Frame>

      <div className="hidden h-full lg:flex lg:flex-col lg:justify-center">
        <Frame>
          <p className="eyebrow mb-3">[ The pipeline · 03 ]</p>
          <h2
            className="font-display text-[var(--color-ivory)]"
            style={{ fontSize: "clamp(40px, 5.5vw, 88px)" }}
          >
            A contract at every edge.
          </h2>
        </Frame>
        <div ref={track} className="mt-16 inline-flex gap-24 pl-[var(--gutter)] pr-[20vw] will-change-transform">
          {processNodes.map((n, i) => (
            <div key={n.id} className="flex w-[60vw] flex-col">
              <span className="eyebrow">Stage {String(i + 1).padStart(2, "0")}</span>
              <span
                className="font-display mt-4 text-[var(--color-ivory)]"
                style={{ fontSize: "clamp(60px, 9vw, 160px)", lineHeight: 0.9 }}
              >
                {n.label}
              </span>
              <span className="mt-6 max-w-md text-[var(--color-steel-light)]">{n.desc}</span>
              {i < processNodes.length - 1 && (
                <svg
                  className="mt-10 h-px w-[40vw]"
                  viewBox="0 0 100 1"
                  preserveAspectRatio="none"
                >
                  <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--color-amber)" strokeDasharray="2 4" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
