"use client";
import { useRef, useLayoutEffect } from "react";
import Frame from "@/components/primitives/Frame";
import RevealText from "@/components/motion/RevealText";
import { ensureGsap } from "@/lib/gsap";

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const numeralRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !textRef.current || !rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const { gsap } = ensureGsap();
    
    const ctx = gsap.context(() => {
      // Background lerp
      gsap.fromTo(
        rootRef.current,
        { backgroundColor: "#0c0c09", color: "#f5f0e8" },
        {
          backgroundColor: "#f5f0e8",
          color: "#0c0c09",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          }
        }
      );

      // Giant 01 parallax
      if (numeralRef.current) {
        gsap.to(numeralRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    });

    // GSAP runs after DOM repaints and fonts load, but just in case, wait a tick
    const t = setTimeout(() => {
      const words = Array.from(textRef.current!.querySelectorAll("[data-r]")) as HTMLElement[];
      if (words.length === 0) return;
      
      let currentLineY = words[0].offsetTop;
      let currentLine: HTMLElement[] = [];
      const lines: HTMLElement[][] = [];
      
      words.forEach(w => {
        if (Math.abs(w.offsetTop - currentLineY) > 12) {
          lines.push(currentLine);
          currentLine = [w];
          currentLineY = w.offsetTop;
        } else {
          currentLine.push(w);
        }
      });
      if (currentLine.length) lines.push(currentLine);

      const sweeps: HTMLDivElement[] = [];
      textRef.current!.style.position = "relative";
      
      lines.forEach(line => {
        if (line.length === 0) return;
        const first = line[0];
        const last = line[line.length - 1];
        
        const sweep = document.createElement("div");
        sweep.className = "absolute h-[2px] bg-[var(--color-amber)]";
        
        const y = first.offsetTop + first.offsetHeight + 2;
        const x = first.offsetLeft;
        const width = last.offsetLeft + last.offsetWidth - x;
        
        sweep.style.top = `${y}px`;
        sweep.style.left = `${x}px`;
        sweep.style.width = `${width}px`;
        sweep.style.transformOrigin = "left center";
        sweep.style.transform = "scaleX(0)";
        
        textRef.current!.appendChild(sweep);
        sweeps.push(sweep);
      });
      
      gsap.to(sweeps, {
        scaleX: 1,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        }
      });
    }, 100);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="manifesto"
      data-section="manifesto"
      className="relative flex min-h-[90svh] items-center overflow-hidden section-pad bg-[var(--color-ivory)] text-[var(--color-ink)]"
    >
      {/* ink/amber floating editorial marks */}
      <span
        ref={numeralRef}
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
          ref={textRef}
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
