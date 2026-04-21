import React from "react";

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
          display: "inline-block",
          width: 14,
          height: 14,
          background: "#D4870A",
          borderRadius: 2,
        }}
      />
      <strong style={{ fontWeight: 600 }}>
        agentic engineering<span style={{ color: "#D4870A" }}>.</span>
      </strong>
      <span style={{ opacity: 0.55, marginLeft: 8, fontSize: 11 }}>admin</span>
    </div>
  );
}
