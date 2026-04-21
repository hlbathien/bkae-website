import type { CollectionConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "alt", group: "Content" },
  access: {
    read: anyone,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf", "video/*"],
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 300, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 1600, height: 1200, position: "centre" },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
  },
  fields: [
    { name: "alt", type: "text", required: true },
    { name: "credit", type: "text" },
  ],
};
