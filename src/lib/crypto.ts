import { timingSafeEqual } from "crypto";

export function safeEqual(a: string | undefined | null, b: string | undefined | null): boolean {
  if (!a || !b) return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/**
 * Validate a slug used to build an internal redirect. Reject anything that
 * can escape the intended route (traversal, protocol, backslashes, whitespace).
 */
export function isSafeSlug(slug: string): boolean {
  if (!slug) return false;
  if (slug.length > 200) return false;
  if (!/^[a-z0-9][a-z0-9-_]*$/i.test(slug)) return false;
  return true;
}
