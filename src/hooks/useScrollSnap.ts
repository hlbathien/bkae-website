"use client";
import { useCallback, useRef, useContext, useEffect } from "react";
import { useLenisVelocity } from "@/hooks/useLenisVelocity";
import { ScrollContext } from "@/components/chrome/SmoothScroll";
import { usePathname } from "next/navigation";

const SCROLL_JACK_SECTIONS = new Set(["projects", "process"]);

function isScrollJackSectionInViewport() {
  const viewportHeight = window.innerHeight;
  return Array.from(document.querySelectorAll<HTMLElement>("section[data-section]")).some((sec) => {
    const tag = sec.getAttribute("data-section");
    if (!tag || !SCROLL_JACK_SECTIONS.has(tag)) return false;

    const rect = sec.getBoundingClientRect();
    return rect.top < viewportHeight * 0.72 && rect.bottom > viewportHeight * 0.28;
  });
}

export function useScrollSnap() {
  const { lenis } = useContext(ScrollContext);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleSnap = useCallback(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isScrollJackSectionInViewport()) return;

    const sections = document.querySelectorAll<HTMLElement>("section[data-section]");
    let bestDist = Infinity;
    let bestTop = 0;
    let targetElement: HTMLElement | null = null;

    sections.forEach((sec) => {
      // Skip pinned/scroll-jack sections — Projects + Process own scroll.
      const tag = sec.getAttribute("data-section");
      if (tag && SCROLL_JACK_SECTIONS.has(tag)) return;
      const rect = sec.getBoundingClientRect();
      const d = Math.abs(rect.top);
      if (d < bestDist) {
        bestDist = d;
        bestTop = rect.top;
        targetElement = sec;
      }
    });

    if (!targetElement) return;

    // Only snap if very close (≤ 180px). Prevent yanking user across page.
    if (bestDist > 5 && bestDist < 180) {
      lenis.scrollTo(targetElement, {
        duration: 0.9,
        offset: 0,
      });
    }
    void bestTop;
  }, [lenis]);

  const handleVelocity = useCallback((v: number) => {
    if (Math.abs(v) < 0.02) {
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          handleSnap();
        }, 200);
      }
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [handleSnap]);

  useLenisVelocity(handleVelocity);

  // Clear timeout on unmount or route change
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);
}
