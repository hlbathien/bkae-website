import type { CollectionAfterChangeHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

const tagFor = (slug: string) => slug;

const make =
  (collection: string, basePath: string): CollectionAfterChangeHook =>
  ({ doc, previousDoc }) => {
    revalidateTag(tagFor(collection), "max");
    if (doc?.slug) revalidatePath(`${basePath}/${doc.slug}`, "page");
    revalidatePath(basePath, "page");
    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
      revalidatePath(`${basePath}/${previousDoc.slug}`, "page");
    }
    return doc;
  };

export const revalidateProject = make("projects", "/projects");
export const revalidatePost = make("posts", "/journal");
export const revalidateEvent = make("events", "/events");
export const revalidateMember = make("members", "/about/members");
export const revalidatePage = make("pages", "");
