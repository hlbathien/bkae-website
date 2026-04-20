"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function GridOverlay() {
  const [debug, setDebug] = useState(false);
  const [trace, setTrace] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleGrid = useCallback(() => setDebug(d => !d), []);
  const toggleTrail = useCallback(() => setTrace(t => !t), []);
  const toggleMatrix = useCallback(() => setMatrix(m => !m), []);

  useEffect(() => {
    // Console API
    window.__ae = {
      grid: toggleGrid,
      trail: toggleTrail,
      matrix: toggleMatrix,
      about: () => ({
        name: "Agentic Engineering",
        founded: "2026",
        hq: "HCMUT",
        discipline: "Bounded LLMs · Contract-based pipelines · Shipped systems",
        mission: "Institutionalizing the engineering discipline AI-native software demands.",
      }),
      invert: () => {
        document.documentElement.classList.toggle("invert-mode");
        console.log("%c[ INVERSION TOGGLED ]", "color:#d4870a;font-family:monospace;");
      }
    };

    // Console greeting (once)
    if (!window.__inferenceGreeted) {
      window.__inferenceGreeted = true;
      try {
        console.log(
          "%cAgentic Engineering — Bounded LLMs. Contract-based pipelines. Shipped systems.",
          "color:#d4870a;font-family:monospace;font-size:13px;letter-spacing:0.08em;",
        );
        console.log(
          "%c//  press g for grid · ↑↑↓↓←→←→ba for trace mode · try window.__ae",
          "color:#7a8490;font-family:monospace;font-size:11px;",
        );
      } catch {
        // ignore
      }
    }

    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      )
        return;

      if (e.key === "Escape") {
        setMatrix(false);
        setTrace(false);
        setDebug(false);
        return;
      }

      if (e.key === "g" && !e.metaKey && !e.ctrlKey) setDebug((d) => !d);

      seq.push(e.key);
      if (seq.length > KONAMI.length) seq = seq.slice(-KONAMI.length);
      if (
        seq.length === KONAMI.length &&
        seq.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())
      ) {
        setMatrix((m) => !m);
        seq = [];
        try {
          console.log("%c[ MATRIX MODE ENGAGED ]", "color:#f0a020;font-family:monospace;font-size:12px;");
        } catch {}
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleGrid, toggleTrail, toggleMatrix]);

  useEffect(() => {
    if (!matrix || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columns = Math.floor(width / 20);
    const drops = new Array(columns).fill(0);

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(12, 12, 9, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#d4870a";
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96);
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, [matrix]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-30">
        <div className="mx-auto h-full max-w-[1600px] px-[var(--gutter)]">
          <div className="grid h-full grid-cols-12 gap-x-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border-l"
                style={{
                  borderColor: debug || trace ? "rgba(212,135,10,0.22)" : "rgba(122,132,144,0.06)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {matrix && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[100] pointer-events-none"
        />
      )}

      {trace && (
        <div
          aria-hidden
          className="pointer-events-none fixed bottom-4 left-4 z-[55] rounded-sm border border-[var(--color-amber)] bg-[var(--color-ink)]/85 px-3 py-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-amber)] backdrop-blur"
        >
          TRACE · konami engaged · scrollY={typeof window !== "undefined" ? Math.round(window.scrollY) : 0}
        </div>
      )}
    </>
  );
}

declare global {
  interface Window {
    __inferenceGreeted?: boolean;
    __ae?: {
      grid: () => void;
      trail: () => void;
      matrix: () => void;
      about: () => object;
      invert: () => void;
    };
  }
}
