"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    // Console greeting (once)
    if (!window.__inferenceGreeted) {
      window.__inferenceGreeted = true;
      try {
        console.log(
          "%cInference — Bounded LLMs. Contract-based pipelines. Shipped systems.",
          "color:#d4870a;font-family:monospace;font-size:13px;letter-spacing:0.08em;",
        );
        console.log(
          "%c//  press g for grid · ↑↑↓↓←→←→ba for trace mode",
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
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) setDebug((d) => !d);

      seq.push(e.key);
      if (seq.length > KONAMI.length) seq = seq.slice(-KONAMI.length);
      if (
        seq.length === KONAMI.length &&
        seq.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())
      ) {
        setTrace((t) => !t);
        seq = [];
        try {
          console.log("%c[ TRACE MODE ENGAGED ]", "color:#f0a020;font-family:monospace;font-size:12px;");
        } catch {}
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
  }
}
