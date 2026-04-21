import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { isSafeSlug, safeEqual } from "@/lib/crypto";

const COLLECTION_TO_PATH: Record<string, string> = {
  projects: "/projects",
  posts: "/journal",
  events: "/events",
  members: "/about/members",
  pages: "",
};

const ALLOWED_COLLECTIONS = new Set(Object.keys(COLLECTION_TO_PATH));

async function enablePreview(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const headerSecret = req.headers.get("x-preview-secret");
  const slug = url.searchParams.get("slug") ?? "";
  const collection = url.searchParams.get("collection") ?? "pages";

  const expected = process.env.PREVIEW_SECRET;
  if (!expected) return new Response("preview not configured", { status: 503 });

  const supplied = headerSecret ?? secret;
  if (!safeEqual(supplied, expected)) {
    return new Response("invalid preview secret", { status: 401 });
  }
  if (!ALLOWED_COLLECTIONS.has(collection)) {
    return new Response("invalid collection", { status: 400 });
  }
  if (slug && !isSafeSlug(slug)) {
    return new Response("invalid slug", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  const base = COLLECTION_TO_PATH[collection] ?? "";
  redirect(`${base}/${slug}`);
}

// POST is preferred (state change). GET kept for Payload admin Live-Preview
// iframe which only issues GETs; the secret is required either way.
export const GET = enablePreview;
export const POST = enablePreview;
