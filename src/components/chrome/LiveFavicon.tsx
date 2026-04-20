"use client";

import { useEffect, useRef } from "react";

export default function LiveFavicon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create a hidden canvas
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    if (!link.parentNode) document.head.appendChild(link);

    let lastScroll = -1;
    let idleTime = 0;

    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

      // Only redraw if progress changed significantly or for idle pulse
      if (Math.abs(progress - lastScroll) < 0.001 && idleTime < 5000) {
        idleTime += 100;
        return;
      }
      
      if (Math.abs(progress - lastScroll) >= 0.001) {
        idleTime = 0;
      } else {
        idleTime += 100;
      }
      
      lastScroll = progress;

      ctx.clearRect(0, 0, 32, 32);

      // Base circle
      ctx.strokeStyle = "rgba(122, 132, 144, 0.2)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(16, 16, 12, 0, Math.PI * 2);
      ctx.stroke();

      // Progress arc
      ctx.strokeStyle = "#d4870a";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(16, 16, 12, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
      ctx.stroke();

      // Center dot with idle pulse
      const pulse = idleTime > 4000 ? Math.sin((idleTime - 4000) / 200) * 0.5 + 0.5 : 0;
      ctx.fillStyle = `rgba(212, 135, 10, ${0.8 + pulse * 0.2})`;
      ctx.beginPath();
      ctx.arc(16, 16, 4 + pulse, 0, Math.PI * 2);
      ctx.fill();

      link.href = canvas.toDataURL("image/png");
    };

    const interval = setInterval(update, 100);
    return () => clearInterval(interval);
  }, []);

  return null;
}
