import React from "react";
import LogoMark from "@/components/primitives/LogoMark";

export default function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "'DM Mono', monospace",
        letterSpacing: "0.02em",
        color: "var(--theme-text)",
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          color: "#D4870A",
        }}
      >
        <LogoMark size={14} />
      </span>
      <strong style={{ fontWeight: 600 }}>
        agentic engineering<span style={{ color: "#D4870A" }}>.</span>
      </strong>
      <span style={{ opacity: 0.55, marginLeft: 8, fontSize: 11 }}>admin</span>
    </div>
  );
}
