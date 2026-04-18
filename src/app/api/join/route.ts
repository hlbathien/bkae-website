import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email").refine((v) => v.endsWith("@hcmut.edu.vn"), {
    message: "Must be a valid HCMUT email (@hcmut.edu.vn)",
  }),
  year: z.string().min(1, "Year / Major is required"),
  shipped: z.string().min(40, "Please write at least 40 characters about what you have shipped"),
});

export async function POST(request: Request) {
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

    // v1: No persistence. Log to server console.
    console.log("[JOIN] Application received:", result.data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[JOIN] Error processing application:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
