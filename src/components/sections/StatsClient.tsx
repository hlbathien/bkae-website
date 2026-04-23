"use client";
import { useEffect, useRef } from "react";
import Frame from "@/components/primitives/Frame";
import CountUp from "@/components/motion/CountUp";
import Sparkline from "@/components/primitives/Sparkline";
import type { Stat } from "@/lib/cms";
import { ensureGsap } from "@/lib/gsap";

export default function StatsClient({ stats }: { stats: Stat[] }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      const labels = root.current!.querySelectorAll("[data-stat-label]");
      gsap.fromTo(
        labels,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
          },
        }
      );

      // Heading reveal — Phase 35 liveliness
      const heading = root.current!.querySelector("[data-stats-heading]");
      if (heading) {
        gsap.from(heading, {
          y: 40,
          opacity: 0,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-section="stats" className="border-t border-[var(--color-ink3)] section-pad">
      <Frame>
        <p className="eyebrow mb-4">Authority · 04</p>
        <h2
          data-stats-heading
          className="font-display h-display-l text-[var(--color-ivory)] mb-12"
        >
          The receipts.{" "}
          <span className="font-serif-italic text-[var(--color-amber)]">Counted.</span>
        </h2>
        <div className="grid max-w-[1280px] grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => {
            const sparkData = s.sparkline?.length
              ? s.sparkline
              : Array.from({ length: 8 }).map(() => Math.random() * 10 + i * 2);
            return (
              <div key={s.label} className="min-w-0">
                <div className="mb-6 h-[40px] w-full max-w-[120px] opacity-70">
                  <Sparkline data={sparkData} className="h-full w-full" />
                </div>
                <div
                  className="font-display text-[var(--color-amber)] stat-mask"
                  style={{
                    fontSize: "var(--fs-stat-xl)",
                    lineHeight: 1,
                    letterSpacing: "var(--tr-display-tight)",
                  }}
                >
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div
                  data-stat-label
                  className="mt-3 eyebrow-sm text-[var(--color-steel-light)]"
                  style={{ clipPath: "inset(0 0 0 0)" }}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </Frame>
    </section>
  );
}
