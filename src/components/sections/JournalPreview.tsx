// Server wrapper: fetches Posts via Payload facade.
import { fetchPosts } from "@/lib/cms-server";
import JournalPreviewClient from "./JournalPreviewClient";

export default async function JournalPreview() {
  const posts = await fetchPosts();
  return <JournalPreviewClient posts={posts} />;
}
