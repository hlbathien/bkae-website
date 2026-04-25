"use client";
import { useLayoutEffect, useRef } from "react";
import Frame from "@/components/primitives/Frame";
import RevealText from "@/components/motion/RevealText";
import type { ProcessNode } from "@/lib/cms";
import { ensureGsap } from "@/lib/gsap";
import {
  clampProcessScroll,
  PROCESS_DESKTOP_LAYOUT,
  PROCESS_SCROLL_SCRUB,
  getProcessMotionPlan,
  getProcessTrackCueState,
} from "./processDesktop";

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

      const mm = gsap.matchMedia();

      mm.add("(max-width: 1024px)", () => {
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
      });

      mm.add("(min-width: 1025px)", () => {
        const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-process-card]"));
        const lastCard = cards.at(-1);
        if (!lastCard) return;

        const getGutter = () => {
          const px = Number.parseFloat(getComputedStyle(trackEl).paddingLeft);
          return Number.isFinite(px) ? px : 0;
        };

        const readMotionPlan = () =>
          getProcessMotionPlan({
            lastCardLeft: lastCard.offsetLeft,
            lastCardWidth: lastCard.offsetWidth,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            gutter: getGutter(),
          });

        let motionPlan = readMotionPlan();
        const syncMotionPlan = () => {
          motionPlan = readMotionPlan();
          sectionEl.style.setProperty(
            "--process-scroll-height",
            `${motionPlan.scrollHeight}px`,
          );
          return motionPlan;
        };
        const applyTrackCue = (progress: number) => {
          const cueState = getProcessTrackCueState({
            progress,
            cueRatio: motionPlan.cueRatio,
            exitCueRatio: motionPlan.exitCueRatio,
          });
          gsap.set(trackEl, cueState);
        };

        syncMotionPlan();
        ScrollTrigger.addEventListener("refreshInit", syncMotionPlan);
        window.addEventListener("resize", syncMotionPlan);

        gsap.set(trackEl, { x: motionPlan.entryLead });
        applyTrackCue(0);

        const scrollTween = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: () => `+=${motionPlan.totalDistance}`,
            scrub: PROCESS_SCROLL_SCRUB,
            fastScrollEnd: false,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              syncMotionPlan();
              applyTrackCue(self.progress);
            },
            onUpdate: (self) => {
              applyTrackCue(self.progress);
            },
          },
        });
        scrollTween
          .fromTo(
            trackEl,
            { x: () => motionPlan.entryLead },
            { x: () => -motionPlan.travel, duration: 1 },
            0,
          );

        let isDown = false;
        let startX = 0;
        let startScrollY = 0;

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
          const trigger = scrollTween.scrollTrigger;
          if (!trigger) return;
          e.preventDefault();
          const dx = e.pageX - startX;
          const nextY = clampProcessScroll(startScrollY - dx * 2, trigger.start, trigger.end);
          window.scrollTo(0, nextY);
        };

        trackEl.addEventListener("pointerdown", down);
        window.addEventListener("pointerleave", leave);
        window.addEventListener("pointerup", up);
        window.addEventListener("pointermove", move);

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", syncMotionPlan);
          window.removeEventListener("resize", syncMotionPlan);
          sectionEl.style.removeProperty("--process-scroll-height");
          trackEl.removeEventListener("pointerdown", down);
          window.removeEventListener("pointerleave", leave);
          window.removeEventListener("pointerup", up);
          window.removeEventListener("pointermove", move);
        };
      });

      return () => {
        mm.revert();
      };
    }, sectionEl);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      ctx.revert();
    };
  }, [processNodes.length]);

  return (
    <section
      ref={section}
      id="process"
      data-section="process"
      className="relative overflow-hidden border-t border-[var(--color-ink3)] py-[var(--space-section)] lg:h-[var(--process-scroll-height,100vh)] lg:overflow-visible lg:py-0"
    >
      <Frame className="lg:hidden">
        <p className="eyebrow mb-6">The pipeline · 03</p>
        <h2 data-process-heading className="font-display h-display-l text-[var(--color-ivory)]">
          <RevealText splitBy="word">A contract at every edge.</RevealText>
        </h2>
        <ol
          ref={mobileTrack}
          data-process-mobile-list
          className="mt-[var(--space-block)] space-y-8"
        >
          {processNodes.map((n, i) => (
            <li key={n.id} className="border-l border-[var(--color-amber)] pl-5">
              <p className="eyebrow-sm text-[var(--color-amber)]">
                Stage {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display h-display-s mt-2 text-[var(--color-ivory)]">{n.label}</p>
              <p className="mt-2 text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-steel-light)]">
                {n.desc}
              </p>
            </li>
          ))}
        </ol>
      </Frame>

      <div data-process-desktop className="relative hidden h-full lg:sticky lg:top-0 lg:block lg:h-screen">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(245, 240, 232, 0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(212, 135, 10, 0.1), transparent 34%)",
            backgroundSize: "clamp(128px, 14vw, 220px) 100%, 100% 100%",
          }}
        />
        <Frame
          data-process-heading-frame
          className="absolute left-0 right-0 z-10"
          style={{ top: PROCESS_DESKTOP_LAYOUT.headingTop }}
        >
          <p className="eyebrow mb-3">The pipeline · 03</p>
          <h2
            data-process-heading
            className="font-display max-w-[1360px] text-[var(--color-ivory)]"
            style={{ fontSize: "clamp(40px, 4.35vw, 70px)", lineHeight: 0.98 }}
          >
            <RevealText splitBy="word">A contract at every edge.</RevealText>
          </h2>
        </Frame>
        <div
          data-process-track-window
          className="absolute inset-x-0 flex items-center"
          style={{
            top: PROCESS_DESKTOP_LAYOUT.trackTop,
            bottom: PROCESS_DESKTOP_LAYOUT.trackBottom,
          }}
        >
          <div
            ref={track}
            data-process-track
            data-cursor="drag"
            className="relative inline-flex items-stretch will-change-transform touch-none select-none"
            style={{
              gap: PROCESS_DESKTOP_LAYOUT.trackGap,
              paddingLeft: PROCESS_DESKTOP_LAYOUT.trackPaddingLeft,
              paddingRight: PROCESS_DESKTOP_LAYOUT.trackPaddingRight,
            }}
          >
            <div
              data-process-rail
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgba(212,135,10,0.55)]"
            />
            {processNodes.map((n, i) => (
              <div
                key={n.id}
                data-process-card
                className="relative flex shrink-0 flex-col pt-7"
                style={{ width: PROCESS_DESKTOP_LAYOUT.cardWidth }}
              >
                <div className="mb-4 flex items-center justify-between gap-8">
                  <span className="eyebrow-sm text-[var(--color-amber)]">
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px min-w-16 flex-1 bg-[rgba(212,135,10,0.22)]" />
                  <span className="eyebrow-sm text-[var(--color-steel)]">
                    {String(i + 1).padStart(2, "0")} / {String(processNodes.length).padStart(2, "0")}
                  </span>
                </div>
                <span
                  className="font-display text-[var(--color-ivory)] pointer-events-none"
                  style={{
                    fontSize: "clamp(58px, 6.5vw, 106px)",
                    lineHeight: 0.9,
                    letterSpacing: "var(--tr-display-tight)",
                  }}
                >
                  {n.label}
                </span>
                <span className="mt-6 max-w-[32rem] text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-steel-light)] pointer-events-none">
                  {n.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
