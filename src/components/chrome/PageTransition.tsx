"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LogoMark from "@/components/primitives/LogoMark";

/**
 * PageTransition
 * - First visit only: curtain-rise intro w/ INFERENCE wordmark.
 * - Subsequent route changes: quick fade overlay (400ms).
 * sessionStorage gate. Reduced-motion → bypass.
 */
function shouldShowIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (sessionStorage.getItem("inference:intro-seen")) return false;
  return true;
}

export default function PageTransition() {
  // Lazy-init avoids effect-driven setState on mount.
  const [intro, setIntro] = useState<boolean>(() => false);
  const [routeOverlay, setRouteOverlay] = useState<boolean>(false);
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (!shouldShowIntro()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: transient overlay on mount
    setIntro(true);
    const t = setTimeout(() => {
      setIntro(false);
      sessionStorage.setItem("inference:intro-seen", "1");
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: transient overlay on route change
    setRouteOverlay(true);
    const t = setTimeout(() => setRouteOverlay(false), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {intro && (
        <div
          aria-hidden
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--color-ink)]"
          style={{ animation: "introRise 1.4s cubic-bezier(0.76,0,0.24,1) forwards" }}
        >
          <div className="flex flex-col items-center gap-6">
            <div
              className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--color-amber)]"
              style={{ animation: "introFade 600ms ease 120ms both" }}
            >
              [ agentic engineering · v1 · 2026 ]
            </div>
            <div
              className="font-display text-[var(--color-ivory)] flex flex-col items-center gap-8"
              style={{
                animation: "introFade 700ms ease 240ms both",
              }}
            >
              <div 
                className="logo-mark-draw flex items-center justify-center text-[var(--color-amber)]"
                style={{ 
                  animation: "introStroke 480ms ease 240ms both",
                  '--draw-length': '3800'
                } as React.CSSProperties}
              >
                <LogoMark size={80} style={{
                  fill: "transparent",
                  stroke: "currentColor",
                  strokeWidth: "8px",
                  strokeDasharray: "var(--draw-length)",
                  strokeDashoffset: "var(--draw-length)"
                }} />
              </div>
              <div style={{
                fontSize: "clamp(48px, 14vw, 200px)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                textAlign: "center"
              }}>
                AGENTIC ENGINEERING<span className="text-[var(--color-amber)]">.</span>
              </div>
            </div>
            <div
              className="relative h-[1px] w-48 overflow-hidden bg-[var(--color-ink3)]"
              style={{ animation: "introFade 600ms ease 360ms both" }}
            >
              <span
                className="absolute inset-0 origin-left bg-[var(--color-amber)]"
                style={{ animation: "introBar 900ms ease 360ms both" }}
              />
            </div>
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
        @keyframes introRise {
          0% { transform: translateY(0); }
          70% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @keyframes introFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes introBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes routeFade {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes introStroke {
          from {
            stroke-dashoffset: var(--draw-length);
            fill: transparent;
          }
          to {
            stroke-dashoffset: 0;
            fill: currentColor;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-mark-draw {
            animation: introFade 80ms ease both !important;
          }
          .logo-mark-draw svg {
            fill: currentColor !important;
            stroke-dasharray: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
