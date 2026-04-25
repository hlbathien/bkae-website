"use client";
import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

export default function Sparkline({
  data = [5, 12, 8, 15, 10, 22, 14, 28, 20, 35],
  className = "",
}: {
  data?: number[];
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !svgRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = ensureGsap();

    const svg = svgRef.current;
    const ctx = gsap.context(() => {
      const path = svg.querySelector("path[data-spark-path]") as SVGPathElement;
      const dot = svg.querySelector("circle[data-spark-dot]") as SVGCircleElement;

      // Handle edge case where path length might not be computable immediately
      const len = path.getTotalLength() || 1000;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const obj = { t: 0 };
      gsap.to(obj, {
        t: len,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
        },
        onUpdate() {
          gsap.set(path, { strokeDashoffset: len - obj.t });
          try {
            const pt = path.getPointAtLength(obj.t);
            if (!Number.isFinite(pt.x) || !Number.isFinite(pt.y)) return;
            gsap.set(dot, { attr: { cx: pt.x, cy: pt.y }, opacity: 1 });
          } catch {
            // Ignore error if point can't be computed yet
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const safeData = Array.isArray(data) && data.length >= 2 ? data : [0, 0];
  const max = Math.max(...safeData);
  const min = Math.min(...safeData);
  const stepX = 100 / (safeData.length - 1);
  const pts = safeData.map((d, i) => {
    const x = i * stepX;
    const range = max - min || 1;
    const y = 30 - ((d - min) / range) * 30;
    return `${Number.isFinite(x) ? x : 0},${Number.isFinite(y) ? y : 0}`;
  });

  const smoothD = pts.reduce(
    (acc, point, i) => (i === 0 ? `M ${point}` : `${acc} L ${point}`),
    ""
  );

  return (
    <svg
      ref={svgRef}
      viewBox="-4 -4 108 38"
      className={`overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      <path
        data-spark-path
        d={smoothD}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle
        data-spark-dot
        cx="0"
        cy="0"
        r="3"
        fill="var(--color-amber-hot)"
        opacity="0"
      />
    </svg>
  );
}
