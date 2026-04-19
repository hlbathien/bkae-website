"use client";
import { useContext, useEffect } from "react";
import { ScrollContext } from "@/components/chrome/SmoothScroll";

export function useLenisVelocity(callback: (v: number) => void) {
  const { lenis } = useContext(ScrollContext);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => {
      callback(lenis.velocity);
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis, callback]);
}
