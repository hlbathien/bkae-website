"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ensureGsap } from "@/lib/gsap";
import Frame from "@/components/primitives/Frame";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !textRef.current || !containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = ensureGsap();

    const onMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const { innerWidth } = window;
      const progress = clientX / innerWidth;
      
      // Scrub letter-spacing from -0.05em to 0.2em
      const spacing = -0.05 + progress * 0.25;
      
      gsap.to(textRef.current, {
        letterSpacing: `${spacing}em`,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <main 
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-ink)] text-[var(--color-ivory)]"
    >
      <Frame className="flex flex-col items-center text-center">
        <h1
          ref={textRef}
          className="font-display leading-none text-[var(--color-amber)]"
          style={{ fontSize: "clamp(120px, 25vw, 400px)", letterSpacing: "-0.05em" }}
        >
          404
        </h1>
        
        <p className="mt-8 font-serif-italic text-[var(--fs-display-s)] italic opacity-80">
          &quot;Unsupported claims return uncertainty, not prose.&quot;
        </p>

        <div className="mt-12">
          <Link 
            href="/" 
            className="bracket-link text-[12px] uppercase tracking-[0.2em] text-[var(--color-ivory)] hover:text-[var(--color-amber)]"
          >
            Return to systems
          </Link>
        </div>
      </Frame>

      {/* Background aesthetic noise */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] select-none">
        <div className="h-full w-full bg-[url('/noise.png')] bg-repeat" />
      </div>
    </main>
  );
}
