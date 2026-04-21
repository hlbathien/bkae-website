import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const COLLECTION_TO_PATH: Record<string, string> = {
  projects: "/projects",
  posts: "/journal",
  events: "/events",
  members: "/about/members",
  pages: "",
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug") ?? "";
  const collection = url.searchParams.get("collection") ?? "pages";

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const base = COLLECTION_TO_PATH[collection] ?? "";
  redirect(`${base}/${slug}`);
}
