"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.08,
      smoothWheel: true,
    });

    const { gsap, ScrollTrigger } = ensureGsap();

    function raf(time: number) {
      lenis.raf(time);
    }
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    document.body.classList.add("lenis");

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.body.classList.remove("lenis");
    };
  }, []);

  return <>{children}</>;
}
