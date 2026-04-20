"use client";
import { useEffect } from "react";

export function useClickRipple<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onClick = (e: MouseEvent) => {
      // Create ripple element
      const ripple = document.createElement("span");
      ripple.classList.add("cta-ripple-element");
      
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      el.appendChild(ripple);
      
      // Cleanup after animation
      setTimeout(() => {
        if (el.contains(ripple)) {
          el.removeChild(ripple);
        }
      }, 500);
    };

    el.addEventListener("mousedown", onClick);
    return () => el.removeEventListener("mousedown", onClick);
  }, [ref]);
}
