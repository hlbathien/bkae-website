"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setSetMounted] = useState(false);

  useEffect(() => {
    // Defer to avoid cascading renders warning
    const t = setTimeout(() => {
      setSetMounted(true);
      const stored = localStorage.getItem("ae:audio");
      if (stored === "true") {
        setEnabled(true);
      }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("ae:audio", String(next));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Global listener for "hover-tick" and "swoosh" custom events
    const handleTick = () => {
      if (!enabled) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      playTick();
    };

    const handleSwoosh = () => {
      if (!enabled) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      playSwoosh();
    };

    window.addEventListener("ae:audio-tick", handleTick);
    window.addEventListener("ae:audio-swoosh", handleSwoosh);
    
    // Auto-attach to all data-cursor="link" / "magnet" / "button"
    const onHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.matches('a, button, [data-cursor="link"], [data-cursor="magnet"]')) {
        handleTick();
      }
    };

    window.addEventListener("mouseover", onHover);

    return () => {
      window.removeEventListener("ae:audio-tick", handleTick);
      window.removeEventListener("ae:audio-swoosh", handleSwoosh);
      window.removeEventListener("mouseover", onHover);
    };
  }, [enabled]);

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
        enabled 
          ? "border-[var(--color-amber)] text-[var(--color-amber)] bg-[var(--color-amber)]/10" 
          : "border-[var(--color-ink3)] text-[var(--color-steel)] hover:border-[var(--color-steel)]"
      )}
      aria-label={enabled ? "Disable audio" : "Enable audio"}
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}

// Simple WebAudio synth
let audioCtx: AudioContext | null = null;

function getCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

function playTick() {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore context errors
  }
}

function playSwoosh() {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // Ignore
  }
}
