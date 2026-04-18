"use client";
import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

export default function CountUp({
  to,
  suffix = "",
  duration = 1.6,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const obj = { v: 0 };
    const fmt = new Intl.NumberFormat("en-US");
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: "power3.out",
      snap: { v: 1 },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = fmt.format(obj.v) + suffix;
      },
      scrollTrigger: { trigger: ref.current, start: "top 90%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, suffix, duration]);
  return <span ref={ref} className={className}>0{suffix}</span>;
}
