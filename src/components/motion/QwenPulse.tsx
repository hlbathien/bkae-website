"use client";

import { useState } from "react";

export default function QwenPulse() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] pointer-events-none opacity-0 animate-qwen-pulse bg-[var(--color-amber)]" 
      onAnimationEnd={() => setVisible(false)}
    />
  );
}
