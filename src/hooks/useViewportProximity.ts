"use client";
import { useState, useEffect, RefObject } from "react";

export function useViewportProximity(ref: RefObject<HTMLElement | null>, threshold = 240) {
  const [proximity, setProximity] = useState({ x: 0, y: 0, mx: 0, my: 0, near: false, distance: Infinity });

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let mx = -1000;
    let my = -1000;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // Calculate closest point on rect to mouse
        const cx = Math.max(rect.left, Math.min(mx, rect.right));
        const cy = Math.max(rect.top, Math.min(my, rect.bottom));
        
        const dx = mx - cx;
        const dy = my - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        setProximity({
          x: mx - (rect.left + rect.width / 2),
          y: my - (rect.top + rect.height / 2),
          mx,
          my,
          near: distance < threshold,
          distance
        });
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [ref, threshold]);

  return proximity;
}
