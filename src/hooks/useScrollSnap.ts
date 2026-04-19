"use client";
import { useCallback, useRef, useContext, useEffect } from "react";
import { useLenisVelocity } from "@/hooks/useLenisVelocity";
import { ScrollContext } from "@/components/chrome/SmoothScroll";
import { usePathname } from "next/navigation";

export function useScrollSnap() {
  const { lenis } = useContext(ScrollContext);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleSnap = useCallback(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = document.querySelectorAll<HTMLElement>("section[data-section]");
    let closestTop = Infinity;
    let targetElement: HTMLElement | null = null;
    
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (Math.abs(rect.top) < Math.abs(closestTop)) {
        closestTop = rect.top;
        targetElement = sec;
      }
    });

    if (!targetElement) return;

    // Disabled for first 300px after a section top
    // (i.e. if viewport is 0-300px down from section top)
    if (closestTop < 0 && closestTop >= -300) {
      return;
    }

    if (Math.abs(closestTop) > 5 && Math.abs(closestTop) < 800) { // arbitrary threshold to avoid wild jumping across the whole page
      lenis.scrollTo(targetElement, {
        duration: 1.2,
        offset: 0,
      });
    }
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
