"use client";
import { useEffect, useRef, createElement } from "react";
import type { ElementType } from "react";
import { ensureGsap } from "@/lib/gsap";

export default function RevealText({
  children,
  as = "span",
  className = "",
  delay = 0,
  splitBy = "word",
}: {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  splitBy?: "char" | "word";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap, ScrollTrigger } = ensureGsap();
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

  const tokens =
    splitBy === "char"
      ? children.split("")
      : children.split(/(\s+)/);

  return createElement(
    as,
    {
      ref,
      className,
      style: { display: "inline-block", perspective: 800 },
    },
    tokens.map((t, i) =>
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
      )
    )
  );
}
