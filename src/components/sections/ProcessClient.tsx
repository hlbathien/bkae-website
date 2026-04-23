"use client";
import { useLayoutEffect, useRef } from "react";
import Frame from "@/components/primitives/Frame";
import type { ProcessNode } from "@/lib/cms";
import { ensureGsap } from "@/lib/gsap";

export default function ProcessClient({ processNodes }: { processNodes: ProcessNode[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const mobileTrack = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    if (!section.current || !track.current) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const sectionEl = section.current;
    const trackEl = track.current;

    const ctx = gsap.context(() => {
      // Heading reveal — Phase 35 liveliness
      const headings = sectionEl.querySelectorAll("[data-process-heading]");
      headings.forEach((h) => {
        gsap.from(h, {
          y: 40,
          opacity: 0,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: { trigger: h, start: "top 85%" },
        });
      });

      if (window.matchMedia("(max-width: 1024px)").matches) {
        if (mobileTrack.current) {
          gsap.from(mobileTrack.current.children, {
            opacity: 0,
            y: 24,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileTrack.current,
              start: "top 80%",
            },
          });
        }
        return;
      }

      const getDistance = () => trackEl.scrollWidth - window.innerWidth + 200;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          pinType: "fixed",
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
      });

      const edges = trackEl.querySelectorAll("[data-process-edge]");
      if (edges.length) {
        tl.fromTo(
          edges,
          { scaleX: 0 },
          { scaleX: 1, stagger: 0.2, ease: "none", duration: tl.duration() },
          0,
        );
      }

      let isDown = false;
      let startX: number;
      let startScrollY: number;

      const down = (e: PointerEvent) => {
        isDown = true;
        startX = e.pageX;
        startScrollY = window.scrollY;
        trackEl.style.cursor = "grabbing";
      };
      const leave = () => {
        isDown = false;
        trackEl.style.cursor = "";
      };
      const up = () => {
        isDown = false;
        trackEl.style.cursor = "";
      };
      const move = (e: PointerEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const dx = e.pageX - startX;
        window.scrollTo(0, startScrollY - dx * 2);
      };

      trackEl.addEventListener("pointerdown", down);
      window.addEventListener("pointerleave", leave);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointermove", move);

      return () => {
        trackEl.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerleave", leave);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointermove", move);
      };
    }, sectionEl);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
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
        <h2 data-process-heading className="font-display h-display-l text-[var(--color-ivory)]">
          A contract at every edge.
        </h2>
        <ol ref={mobileTrack} className="mt-[var(--space-block)] space-y-8">
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
          <h2 data-process-heading className="font-display h-display-l text-[var(--color-ivory)]">
            A contract at every edge.
          </h2>
        </Frame>
        <div
          ref={track}
          data-cursor="drag"
          className="mt-[var(--space-block)] inline-flex items-end gap-24 pl-[var(--gutter)] pr-[20vw] will-change-transform touch-none select-none"
        >
          {processNodes.map((n, i) => (
            <div key={n.id} className="flex w-[56vw] flex-col">
              <span className="eyebrow-sm text-[var(--color-amber)]">Stage {String(i + 1).padStart(2, "0")}</span>
              <span
                className="font-display mt-4 text-[var(--color-ivory)] pointer-events-none"
                style={{ fontSize: "clamp(56px, 7.5vw, 120px)", lineHeight: 0.92, letterSpacing: "var(--tr-display-tight)" }}
              >
                {n.label}
              </span>
              <span className="mt-6 max-w-md text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-steel-light)] pointer-events-none">{n.desc}</span>
              {i < processNodes.length - 1 && (
                <div data-process-edge className="mt-10 h-px w-[36vw] self-start origin-left bg-[var(--color-amber)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
