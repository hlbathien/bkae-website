"use client";
import { useEffect, useState, createContext } from "react";
import Lenis from "lenis";
import { ensureGsap } from "@/lib/gsap";
import { useScrollSnap } from "@/hooks/useScrollSnap";

export const ScrollContext = createContext<{ lenis: Lenis | null }>({ lenis: null });

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scroll. Static import (no async race). Dedupe via window flag
 * to survive React StrictMode double-mount in dev. Keep wheel smoothing enabled
 * even when reduced motion is requested so Windows mice do not fall back to
 * native line-step scrolling.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // StrictMode dedupe — second mount finds live instance, noop.
    if (window.__lenis) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { gsap, ScrollTrigger } = ensureGsap();

    const lenis = new Lenis({
      duration: reduce ? 0.65 : 1.15,
      lerp: reduce ? 0.16 : 0.09,
      smoothWheel: true,
      wheelMultiplier: reduce ? 0.85 : 1,
      touchMultiplier: reduce ? 1 : 1.5,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    window.__lenis = lenis;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenisInstance(lenis);

    const syncLenisWithGsap = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(syncLenisWithGsap);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    const refresh = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => ScrollTrigger.refresh());
      } else {
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    };
    const onLoad = () => refresh();
    const onResize = () => refresh();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    refresh();

    return () => {
      gsap.ticker.remove(syncLenisWithGsap);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      lenis.destroy();
      delete window.__lenis;
      setLenisInstance(null);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ lenis: lenisInstance }}>
      <ScrollSnapActivator />
      {children}
    </ScrollContext.Provider>
  );
}

function ScrollSnapActivator() {
  useScrollSnap();
  return null;
}
