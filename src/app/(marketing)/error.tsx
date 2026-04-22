"use client";

import { useEffect } from "react";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-ink)] text-[var(--color-ivory)]">
      <Frame className="flex flex-col items-center text-center">
        <h1
          className="font-display leading-none text-[var(--color-amber)]"
          style={{ fontSize: "clamp(120px, 25vw, 400px)", letterSpacing: "-0.02em" }}
        >
          500
        </h1>
        
        <p className="mt-8 font-serif-italic text-[var(--fs-display-s)] italic opacity-80">
          The system encountered an unhandled exception.
        </p>

        <div className="mt-12 flex gap-8">
          <button
            onClick={() => reset()}
            className="bracket-link text-[12px] uppercase tracking-[0.2em] text-[var(--color-amber)]"
          >
            Attempt reset
          </button>
          <Link 
            href="/" 
            className="bracket-link text-[12px] uppercase tracking-[0.2em] text-[var(--color-ivory)] hover:text-[var(--color-amber)]"
          >
            Return to systems
          </Link>
        </div>
      </Frame>
    </main>
  );
}
