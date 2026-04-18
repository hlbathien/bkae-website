"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import Tag from "@/components/primitives/Tag";
import CountUp from "@/components/motion/CountUp";
import { projects, type Project } from "@/lib/cms";
import { ensureGsap } from "@/lib/gsap";

function ProjectScene({ p, idx }: { p: Project; idx: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !stack.current) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const layers = stack.current.querySelectorAll<HTMLElement>("[data-layer]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.2,
        },
      });
      layers.forEach((l, i) => {
        tl.to(
          l,
          { yPercent: -8 * (i + 1), xPercent: 4 * i, rotate: -3 + i * 2, ease: "none" },
          0
        );
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrap}
      className="relative grid grid-cols-1 items-center gap-10 py-32 lg:grid-cols-12 lg:gap-16"
    >
      <div className="lg:col-span-5">
        <p className="eyebrow mb-6">{p.eyebrow}</p>
        <h3
          className="font-display text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(32px, 4.5vw, 64px)" }}
        >
          {p.title}
        </h3>

        <dl className="mt-10 space-y-6 text-[var(--color-ivory2)]">
          <div>
            <dt className="eyebrow mb-1">Problem</dt>
            <dd>{p.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Constraint</dt>
            <dd>{p.constraint}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Outcome</dt>
            <dd className="font-serif-italic text-[var(--color-amber)]" style={{ fontSize: "20px" }}>
              {p.outcome}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6">
          {p.stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-display text-[var(--color-amber)]"
                style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
              >
                <CountUp to={s.value} suffix={s.suffix ?? ""} />
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={`/projects/${p.slug}`}
            className="bracket-link text-[12px] uppercase tracking-[0.22em] text-[var(--color-ivory)] hover:text-[var(--color-amber)]"
          >
            Read the build →
          </Link>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div
          ref={stack}
          className="relative aspect-[4/3] w-full"
          style={{ perspective: "1400px" }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              data-layer
              className="absolute inset-0 border border-[var(--color-ink3)] bg-gradient-to-br from-[var(--color-ink2)] to-[var(--color-ink)] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              style={{
                transform: `translate3d(${i * 12}px, ${i * 14}px, 0) rotate(${-3 + i * 2}deg)`,
                zIndex: 10 - i,
              }}
            >
              <div className="flex h-9 items-center gap-1 border-b border-[var(--color-ink3)] px-3">
                <span className="h-2 w-2 rounded-full bg-[var(--color-ink3)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--color-ink3)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--color-ink3)]" />
                <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
                  {p.slug}/layer-{i}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1 p-4">
                {Array.from({ length: 84 }).map((_, k) => (
                  <span
                    key={k}
                    className="h-1.5 rounded-sm"
                    style={{
                      background:
                        k % 13 === idx
                          ? "var(--color-amber)"
                          : "rgba(122,132,144,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative border-t border-[var(--color-ink3)]">
      <Frame>
        <header className="flex items-end justify-between py-16">
          <div>
            <p className="eyebrow mb-3">[ Evidence · 02 ]</p>
            <h2
              className="font-display text-[var(--color-ivory)]"
              style={{ fontSize: "clamp(36px, 5vw, 80px)" }}
            >
              Two systems.
              <br />
              <span className="font-serif-italic text-[var(--color-amber)]">Both shipped.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="bracket-link hidden text-[12px] uppercase tracking-[0.22em] text-[var(--color-ivory)] hover:text-[var(--color-amber)] md:inline-block"
          >
            All projects →
          </Link>
        </header>

        {projects.map((p, i) => (
          <ProjectScene key={p.slug} p={p} idx={i} />
        ))}
      </Frame>
    </section>
  );
}
