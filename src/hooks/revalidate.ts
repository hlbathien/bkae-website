import type { CollectionAfterChangeHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

const tagFor = (slug: string) => slug;

const make =
  (collection: string, basePath: string): CollectionAfterChangeHook =>
  ({ doc, previousDoc }) => {
    try {
      revalidateTag(tagFor(collection), "max");
      if (basePath) {
        revalidatePath(basePath, "page");
        if (doc?.slug) revalidatePath(`${basePath}/${doc.slug}`, "page");
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
          revalidatePath(`${basePath}/${previousDoc.slug}`, "page");
        }
      } else {
        revalidatePath("/", "layout");
        if (doc?.slug) revalidatePath(`/${doc.slug}`, "page");
      }
    } catch (err) {
      // Outside Next request context (seed scripts, migrations): no-op.
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[revalidate] skipped ${collection} (no request ctx):`, (err as Error)?.message);
      }
    }
    return doc;
  };

export const revalidateProject = make("projects", "/projects");
export const revalidatePost = make("posts", "/journal");
export const revalidateEvent = make("events", "/events");
export const revalidateMember = make("members", "/about/members");
export const revalidatePage = make("pages", "");
