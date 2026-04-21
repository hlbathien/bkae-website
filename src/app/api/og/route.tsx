import { ImageResponse } from "next/og";

export const runtime = "edge";
export const revalidate = 3600;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = (url.searchParams.get("title") ?? "Agentic Engineering").slice(0, 140);
  const kind = url.searchParams.get("kind") ?? "site";
  const eyebrow = url.searchParams.get("eyebrow") ?? kind.toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0C0C09",
          color: "#F5F0E8",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: "#D4870A" }}>
          <div style={{ width: 18, height: 18, background: "#D4870A" }} />
          agentic engineering
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#7A8490" }}>{eyebrow}</div>
          <div
            style={{
              fontSize: title.length > 60 ? 64 : 84,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#F5F0E8",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#7A8490",
          }}
        >
          <div>HCMUT · Ho Chi Minh City</div>
          <div style={{ color: "#D4870A" }}>inference.club</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
