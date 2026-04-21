import { revalidatePath, revalidateTag } from "next/cache";
import { safeEqual } from "@/lib/crypto";

export async function POST(req: Request) {
  const expected = process.env.PREVIEW_SECRET;
  if (!expected) return new Response("not configured", { status: 503 });

  const headerSecret = req.headers.get("x-revalidate-secret");
  if (!safeEqual(headerSecret, expected)) {
    return new Response("unauthorized", { status: 401 });
  }

  const url = new URL(req.url);
  const tag = url.searchParams.get("tag");
  const path = url.searchParams.get("path");

  if (tag) revalidateTag(tag, "max");
  if (path) revalidatePath(path, "page");

  return Response.json({ ok: true, tag, path });
}
