import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email").refine((v) => v.endsWith("@hcmut.edu.vn"), {
    message: "Must be a valid HCMUT email (@hcmut.edu.vn)",
  }),
  year: z.string().min(1, "Year / Major is required"),
  shipped: z.string().min(40, "Please write at least 40 characters about what you have shipped"),
});

// In-memory rate limiter (per-IP). Replace with upstash/ratelimit in prod.
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_REQ;
}

function fingerprint(data: { email: string; name: string }) {
  return createHash("sha256").update(`${data.email}|${data.name}`).digest("hex").slice(0, 12);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Privacy: never log PII. Record only a stable per-applicant fingerprint.
    console.log(
      `[join] received fp=${fingerprint(result.data)} len=${result.data.shipped.length}`,
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[join] error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
