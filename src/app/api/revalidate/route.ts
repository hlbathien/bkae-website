import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("unauthorized", { status: 401 });
  }

  const tag = url.searchParams.get("tag");
  const path = url.searchParams.get("path");
  if (tag) revalidateTag(tag, "max");
  if (path) revalidatePath(path, "page");

  return Response.json({ ok: true, tag, path });
}
