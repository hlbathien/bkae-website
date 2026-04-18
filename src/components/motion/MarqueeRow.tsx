"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MarqueeRow({
  text,
  speed = 30,
  reverse = false,
  className = "",
}: {
  text: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      xPercent: reverse ? 0 : -50,
      x: reverse ? "-50%" : 0,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [speed, reverse]);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={ref} className="inline-flex" style={{ willChange: "transform" }}>
        <span className="px-8">{text}</span>
        <span className="px-8">{text}</span>
        <span className="px-8">{text}</span>
        <span className="px-8">{text}</span>
      </div>
    </div>
  );
}
