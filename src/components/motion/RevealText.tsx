"use client";
import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

export default function RevealText({
  children,
  className = "",
  delay = 0,
  splitBy = "word",
}: {
  children: string;
  /**
   * Kept for prop API compatibility; component always renders a span.
   * If a different tag is needed, wrap externally.
   */
  as?: "span";
  className?: string;
  delay?: number;
  splitBy?: "char" | "word";
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = ensureGsap();
    const el = ref.current;
    const parts = el.querySelectorAll<HTMLElement>("[data-r]");
    gsap.set(parts, { yPercent: 110, opacity: 0, rotateX: -40 });
    const tween = gsap.to(parts, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: splitBy === "char" ? 0.018 : 0.06,
      delay,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, splitBy]);

  const renderWordChars = (word: string, baseKey: number) =>
    word.split("").map((c, i) => (
      <span
        key={`${baseKey}-${i}`}
        data-r
        style={{ display: "inline-block", willChange: "transform,opacity" }}
      >
        {c}
      </span>
    ));

  let content: React.ReactNode;
  if (splitBy === "char") {
    // Group chars by word so words never break mid-line.
    const parts = children.split(/(\s+)/);
    content = parts.map((t, i) =>
      t.match(/^\s+$/) ? (
        <span key={i}>{t}</span>
      ) : (
        <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {renderWordChars(t, i)}
        </span>
      ),
    );
  } else {
    const tokens = children.split(/(\s+)/);
    content = tokens.map((t, i) =>
      t.match(/^\s+$/) ? (
        <span key={i}>{t}</span>
      ) : (
        <span
          key={i}
          data-r
          style={{ display: "inline-block", willChange: "transform,opacity" }}
        >
          {t}
        </span>
      ),
    );
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", perspective: 800 }}
    >
      {content}
    </span>
  );
}
