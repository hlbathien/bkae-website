"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    let dx = 0,
      dy = 0,
      rx = 0,
      ry = 0,
      mx = 0,
      my = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      dx = mx;
      dy = my;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-8 w-8 rounded-full border border-[var(--color-amber)] mix-blend-difference"
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 rounded-full bg-[var(--color-amber)]"
      />
    </>
  );
}
