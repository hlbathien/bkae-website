import type { Access } from "payload";

export const anyone: Access = () => true;

export const isAdmin: Access = ({ req: { user } }) =>
  !!user?.roles?.includes("admin");

export const editorOrAdmin: Access = ({ req: { user } }) =>
  !!user?.roles?.some((r: string) => ["admin", "editor"].includes(r));

export const authorOrAbove: Access = ({ req: { user } }) =>
  !!user?.roles?.some((r: string) => ["admin", "editor", "author"].includes(r));

// Read published only for public; logged-in sees drafts
export const publishedOrAuthed: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};
