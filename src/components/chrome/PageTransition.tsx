"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import LogoMark from "@/components/primitives/LogoMark";
import { ensureGsap } from "@/lib/gsap";

function getVisitCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(sessionStorage.getItem("ae:visit-count") || "0", 10);
}

function incrementVisitCount() {
  if (typeof window === "undefined") return;
  const c = getVisitCount();
  sessionStorage.setItem("ae:visit-count", (c + 1).toString());
}

export default function PageTransition() {
  const [mode, setMode] = useState<"full" | "mini" | "none">("none");
  const [routeOverlay, setRouteOverlay] = useState<boolean>(false);
  const pathname = usePathname();
  const firstRun = useRef(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = getVisitCount();
    
    if (prefersReducedMotion) {
      incrementVisitCount();
      return; // "none"
    }
    
    if (count === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode("full");
    } else {
       
      setMode("mini");
    }
  }, []);

  useLayoutEffect(() => {
    if (mode === "none") return;
    const { gsap } = ensureGsap();
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setMode("none");
          incrementVisitCount();
        }
      });

      if (mode === "mini") {
        // Only Stage A (320ms hairline)
        gsap.set(containerRef.current, { backgroundColor: "transparent" });
        tl.fromTo(hairlineRef.current, 
          { scaleX: 0, transformOrigin: "left" }, 
          { scaleX: 1, duration: 0.32, ease: "power2.inOut" }
        ).to(hairlineRef.current, { autoAlpha: 0, duration: 0.1 });
        return;
      }

      // Full intro timeline
      // Stage A (0-280ms): hairline
      tl.to(hairlineRef.current, { scaleX: 1, duration: 0.28, ease: "power2.inOut", transformOrigin: "left" });
      
      // Stage B (280-760ms): Logo + eyebrow
      // Stroke draw is approx 480ms starting right after hairline
      // We will do stroke dashoffset in css or directly via gsap.
      const path = logoRef.current?.querySelector("path");
      const pathLength = 3800; // estimated from previous dasharray
      
      if (path) {
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength, fill: "transparent", stroke: "currentColor", strokeWidth: 8 });
        tl.to(path, { strokeDashoffset: 0, fill: "currentColor", duration: 0.48, ease: "power2.out" }, "stageB");
      }
      
      // Eyebrow types "loading discipline..." char by char
      if (eyebrowRef.current) {
        const chars = eyebrowRef.current.querySelectorAll(".char");
        tl.fromTo(chars, 
          { autoAlpha: 0 }, 
          { autoAlpha: 1, stagger: 0.02, duration: 0.01 }, 
          "stageB"
        );
      }

      // Stage C (760-1200ms): wordmark rises
      if (wordmarkRef.current) {
        const letters = wordmarkRef.current.querySelectorAll(".wm-char");
        tl.fromTo(letters,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.44, stagger: 0.03, ease: "power3.out" },
          "stageB+=0.48" // 280 + 480 = 760
        );
      }

      // Stage D (1200-1600ms): counter 0-100 + curtain wipe
      if (counterRef.current) {
        tl.fromTo(counterRef.current, { innerHTML: 0 }, {
            innerHTML: 100,
            duration: 0.4,
            ease: "power2.inOut",
            snap: { innerHTML: 1 },
            onUpdate: function() {
              if (counterRef.current) {
                  counterRef.current.innerHTML = Math.round(this.targets()[0].innerHTML).toString().padStart(2, '0');
              }
            }
        }, "stageB+=0.92"); // 280+920 = 1200
      }

      tl.to(panelsRef.current, {
        yPercent: -100,
        duration: 0.6,
        stagger: 0.05,
        ease: "expo.out"
      }, "stageB+=1.32"); // Start wipe upward at end of D (1600 total is finish of counter, stagger overlap)

    });

    return () => ctx.revert();
  }, [mode]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRouteOverlay(true);
    const t = setTimeout(() => setRouteOverlay(false), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  const loadingText = "loading discipline...".split("");
  const wordmark1 = "AGENTIC".split("");
  const wordmark2 = "ENGINEERING.".split("");

  return (
    <>
      {mode !== "none" && (
        <div 
          ref={containerRef}
          aria-hidden
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--color-ink)]"
        >
          {mode === "full" && (
            <>
              {/* 4-panel curtain */}
              <div className="absolute inset-0 flex">
                <div ref={el => { panelsRef.current[0] = el; }} className="h-full w-1/4 bg-[var(--color-ink)]" />
                <div ref={el => { panelsRef.current[1] = el; }} className="h-full w-1/4 bg-[var(--color-ink)]" />
                <div ref={el => { panelsRef.current[2] = el; }} className="h-full w-1/4 bg-[var(--color-ink)]" />
                <div ref={el => { panelsRef.current[3] = el; }} className="h-full w-1/4 bg-[var(--color-ink)]" />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center items-center gap-8">
                <div className="text-[var(--color-amber)]" ref={logoRef}>
                  <LogoMark size={80} />
                </div>
                <div 
                  ref={eyebrowRef} 
                  className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-amber)]"
                >
                  {loadingText.map((c, i) => (
                    <span key={i} className="char inline-block" style={{ opacity: 0 }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  ))}
                </div>
                <div 
                  ref={wordmarkRef}
                  className="font-display text-[var(--color-ivory)] overflow-hidden flex flex-col items-center"
                  style={{
                    fontSize: "clamp(48px, 11vw, 180px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                    textAlign: "center"
                  }}
                >
                  <div className="overflow-hidden">
                    {wordmark1.map((c, i) => (
                      <span key={i} className="wm-char inline-block translate-y-full">{c}</span>
                    ))}
                  </div>
                  <div className="overflow-hidden">
                    {wordmark2.map((c, i) => (
                      <span key={i} className={`wm-char inline-block translate-y-full ${c === '.' ? 'text-[var(--color-amber)]' : ''}`}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom-left counter */}
              <div className="absolute bottom-6 left-6 font-[var(--font-mono)] text-[14px] text-[var(--color-amber)]">
                <span ref={counterRef}>00</span>%
              </div>
            </>
          )}

          {/* Hairline (Stage A) */}
          <div className="absolute top-0 left-0 right-0 h-[1px]">
            <div 
              ref={hairlineRef}
              className="h-full w-full bg-[var(--color-amber)] origin-left scale-x-0" 
            />
          </div>
        </div>
      )}

      {routeOverlay && (
        <div
          aria-hidden
          className="fixed inset-0 z-[80] bg-[var(--color-ink)]"
          style={{ animation: "routeFade 400ms ease forwards" }}
        />
      )}
      <style>{`
        @keyframes routeFade {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
