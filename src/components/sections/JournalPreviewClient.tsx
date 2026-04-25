"use client";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/cms";

function CascadeTitle({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <h3 className={className} style={style}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          className="cascade-char block"
          style={{ transitionDelay: `${i * 12}ms` }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </h3>
  );
}

import Frame from "@/components/primitives/Frame";
import RevealText from "@/components/motion/RevealText";
import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

export default function JournalPreviewClient({ posts }: { posts: Post[] }) {
  const root = useRef<HTMLElement>(null);
  const [hero, ...rest] = posts;
  const side = rest.slice(0, 2);

  useEffect(() => {
    if (typeof window === "undefined" || !root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const heading = root.current!.querySelector("[data-journal-heading]");
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

  if (!hero) return null;

  return (
    <section ref={root} data-section="journal" className="border-t border-[var(--color-ink3)] section-pad">
      <Frame>
        <header className="mb-[var(--space-block)] flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">Journal · 05</p>
            <h2 data-journal-heading className="font-display h-display-l text-[var(--color-ivory)]">
              <RevealText splitBy="word">Field notes from the discipline.</RevealText>
            </h2>
          </div>
          <Link
            href="/journal"
            className="bracket-link hidden whitespace-nowrap shrink-0 text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-wide)] text-[var(--color-ivory)] hover:text-[var(--color-amber)] md:inline-block"
          >
            All posts →
          </Link>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <Link
            href={`/journal/${hero.slug}`}
            data-cursor="read"
            className="group col-span-1 row-span-2 border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-8 transition-colors duration-150 hover:border-[var(--color-amber)] md:col-span-2"
          >
            <div className="journal-cover-wrap aspect-[16/9] w-full">
              <div className="journal-cover-img h-full w-full relative">
                <Image
                  src={hero.cover}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              <div className="journal-scanline" />
            </div>
            <div className="mt-6 flex items-center gap-3 eyebrow-sm text-[var(--color-steel)]">
              <span className="text-[var(--color-amber)]">{hero.category}</span>
              <span>·</span>
              <span>{hero.readingTime}</span>
            </div>
            <CascadeTitle
              text={hero.title}
              className="font-display h-display-m mt-3 text-[var(--color-ivory)] transition-colors duration-150 flex flex-wrap"
            />
            <p className="mt-4 max-w-xl text-[var(--fs-body)] leading-[var(--lh-body)] text-[var(--color-steel-light)]">
              {hero.excerpt}
            </p>
          </Link>

          {side.map((p) => (
            <Link
              key={p.slug}
              href={`/journal/${p.slug}`}
              data-cursor="read"
              className="group border border-[var(--color-ink3)] bg-[var(--color-ink2)] p-6 transition-colors duration-150 hover:border-[var(--color-amber)]"
            >
              <div className="journal-cover-wrap aspect-[4/3] w-full">
                <div className="journal-cover-img h-full w-full relative">
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="journal-scanline" />
              </div>
              <div className="mt-4 flex items-center gap-3 eyebrow-sm text-[var(--color-steel)]">
                <span className="text-[var(--color-amber)]">{p.category}</span>
                <span>·</span>
                <span>{p.readingTime}</span>
              </div>
              <CascadeTitle
                text={p.title}
                className="font-display mt-2 text-[var(--color-ivory)] transition-colors duration-150 flex flex-wrap"
                style={{ fontSize: "clamp(20px, 1.8vw, 26px)", letterSpacing: "var(--tr-display-tight)" }}
              />
            </Link>
          ))}
        </div>
      </Frame>
    </section>
  );
}
