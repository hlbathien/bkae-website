"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight === 0) return;
      const currentProgress = window.scrollY / scrollHeight;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[100] h-[2px] w-full pointer-events-none">
      <div 
        className="h-full bg-[var(--color-amber)] transition-transform duration-75 ease-out origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
