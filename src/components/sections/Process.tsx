"use client";
import { useLayoutEffect, useRef } from "react";
import Frame from "@/components/primitives/Frame";
import { processNodes } from "@/lib/cms";
import { ensureGsap } from "@/lib/gsap";

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!section.current || !track.current) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const sectionEl = section.current;
    const trackEl = track.current;

    const ctx = gsap.context(() => {
      const getDistance = () => trackEl.scrollWidth - window.innerWidth + 200;
      gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          // Lenis moves page via transform on html/body; stacking pinType:"transform"
          // on top causes double-translate → ghost frames. "fixed" pins via
          // position:fixed which composites cleanly with Lenis.
          pinType: "fixed",
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionEl);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      ScrollTrigger.getAll().forEach((tr) => {
        if (tr.trigger && sectionEl.contains(tr.trigger)) tr.kill();
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={section}
      id="process"
      data-section="process"
      className="relative overflow-hidden border-t border-[var(--color-ink3)] section-pad lg:h-screen lg:py-0"
    >
      <Frame className="lg:hidden">
        <p className="eyebrow mb-6">The pipeline · 03</p>
        <h2 className="font-display h-display-l text-[var(--color-ivory)]">
          A contract at every edge.
        </h2>
        <ol className="mt-[var(--space-block)] space-y-8">
          {processNodes.map((n, i) => (
            <li key={n.id} className="border-l border-[var(--color-amber)] pl-5">
              <p className="eyebrow-sm text-[var(--color-amber)]">Stage {String(i + 1).padStart(2, "0")}</p>
              <p className="font-display h-display-s mt-2 text-[var(--color-ivory)]">{n.label}</p>
              <p className="mt-2 text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-steel-light)]">{n.desc}</p>
            </li>
          ))}
        </ol>
      </Frame>

      <div className="hidden h-full lg:flex lg:flex-col lg:justify-center">
        <Frame>
          <p className="eyebrow mb-3">The pipeline · 03</p>
          <h2 className="font-display h-display-l text-[var(--color-ivory)]">
            A contract at every edge.
          </h2>
        </Frame>
        <div
          ref={track}
          data-cursor="drag"
          className="mt-[var(--space-block)] inline-flex items-end gap-24 pl-[var(--gutter)] pr-[20vw] will-change-transform"
        >
          {processNodes.map((n, i) => (
            <div key={n.id} className="flex w-[56vw] flex-col">
              <span className="eyebrow-sm text-[var(--color-amber)]">Stage {String(i + 1).padStart(2, "0")}</span>
              <span
                className="font-display mt-4 text-[var(--color-ivory)]"
                style={{ fontSize: "clamp(56px, 7.5vw, 120px)", lineHeight: 0.92, letterSpacing: "var(--tr-display-tight)" }}
              >
                {n.label}
              </span>
              <span className="mt-6 max-w-md text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-steel-light)]">{n.desc}</span>
              {i < processNodes.length - 1 && (
                <svg className="mt-10 h-px w-[36vw] self-start" viewBox="0 0 100 1" preserveAspectRatio="none">
                  <line
                    x1="0"
                    y1="0.5"
                    x2="100"
                    y2="0.5"
                    stroke="var(--color-amber)"
                    strokeDasharray="2 4"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
