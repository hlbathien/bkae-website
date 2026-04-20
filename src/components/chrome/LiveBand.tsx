"use client";
import { useEffect, useState, useRef } from "react";

export default function LiveBand() {
  const [time, setTime] = useState("");
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Determine static text immediately if reduced-motion
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    });

    const updateTime = () => {
      setTime(fmt.format(new Date()));
    };

    updateTime();

    if (reducedMotion) return;

    const startTick = () => {
      if (!tickRef.current) {
        tickRef.current = setInterval(updateTime, 1000);
      }
    };
    const stopTick = () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };

    startTick();

    const handleVisibility = () => {
      if (document.hidden) stopTick();
      else startTick();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopTick();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || "a1b2c3d";

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-6 items-center justify-between border-b border-[var(--color-ink3)] bg-[var(--color-ink)] px-[var(--gutter)] text-[10px] uppercase tracking-[var(--tr-wide)] text-[var(--color-steel-light)] font-[var(--font-mono)]">
      <div className="flex gap-4">
        <span>ICT {time}</span>
        <span className="hidden sm:inline">· BUILD {sha}</span>
        <span className="hidden md:inline">· COMMIT 2h ago</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-amber)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-amber)]"></span>
        </span>
        STATUS ONLINE
      </div>
    </div>
  );
}
