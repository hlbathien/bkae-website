import type { CollectionBeforeChangeHook } from "payload";
import { stripMd } from "../lib/markdown";

const WORDS_PER_MIN = 220;

function lexicalToText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  if (typeof n.text === "string") return n.text;
  const children = (n.children as unknown[]) ?? [];
  return children.map(lexicalToText).join(" ");
}

export const computeReadingTime: CollectionBeforeChangeHook = ({ data }) => {
  const md = typeof data?.bodyMarkdown === "string" ? data.bodyMarkdown : "";
  const text = md
    ? stripMd(md)
    : lexicalToText((data?.body as { root?: unknown })?.root);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MIN));
  return { ...data, readingTime: `${minutes} min` };
};
