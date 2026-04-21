import type { CollectionAfterChangeHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

const tagFor = (slug: string) => slug;

const make =
  (collection: string, basePath: string): CollectionAfterChangeHook =>
  ({ doc, previousDoc }) => {
    revalidateTag(tagFor(collection), "max");
    if (basePath) {
      revalidatePath(basePath, "page");
      if (doc?.slug) revalidatePath(`${basePath}/${doc.slug}`, "page");
      if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
        revalidatePath(`${basePath}/${previousDoc.slug}`, "page");
      }
    } else {
      // Pages without base path: re-render root layout so any page can pick
      // up updated data (nav, footer, etc.).
      revalidatePath("/", "layout");
      if (doc?.slug) revalidatePath(`/${doc.slug}`, "page");
    }
    return doc;
  };

export const revalidateProject = make("projects", "/projects");
export const revalidatePost = make("posts", "/journal");
export const revalidateEvent = make("events", "/events");
export const revalidateMember = make("members", "/about/members");
export const revalidatePage = make("pages", "");
