"use client";
import { useEffect, useState } from "react";

export default function GridOverlay() {
  const [debug, setDebug] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) setDebug((d) => !d);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <div className="mx-auto h-full max-w-[1600px] px-[var(--gutter)]">
        <div className="grid h-full grid-cols-12 gap-x-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="border-l"
              style={{
                borderColor: debug ? "rgba(212,135,10,0.25)" : "rgba(122,132,144,0.06)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
