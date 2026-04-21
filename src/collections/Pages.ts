import type { CollectionConfig } from "payload";
import { editorOrAdmin, publishedOrAuthed } from "../access/roles";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "slug", "_status"],
  },
  access: {
    read: publishedOrAuthed,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "blocks",
      type: "blocks",
      blocks: [
        {
          slug: "hero",
          fields: [
            { name: "eyebrow", type: "text", localized: true },
            { name: "headline", type: "text", required: true, localized: true },
            { name: "sub", type: "textarea", localized: true },
          ],
        },
        {
          slug: "pullquote",
          fields: [
            { name: "quote", type: "textarea", required: true, localized: true },
            { name: "attribution", type: "text" },
          ],
        },
        {
          slug: "twoCol",
          fields: [
            { name: "left", type: "richText", localized: true },
            { name: "right", type: "richText", localized: true },
          ],
        },
        {
          slug: "gallery",
          fields: [
            {
              name: "images",
              type: "array",
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
                { name: "caption", type: "text", localized: true },
              ],
            },
          ],
        },
        {
          slug: "faq",
          fields: [
            {
              name: "items",
              type: "array",
              fields: [
                { name: "q", type: "text", required: true, localized: true },
                { name: "a", type: "textarea", required: true, localized: true },
              ],
            },
          ],
        },
        {
          slug: "ctaBand",
          fields: [
            { name: "label", type: "text", required: true, localized: true },
            { name: "href", type: "text", required: true },
          ],
        },
        {
          slug: "statsGrid",
          fields: [
            {
              name: "stats",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true, localized: true },
                { name: "value", type: "number", required: true },
                { name: "suffix", type: "text" },
              ],
            },
          ],
        },
        {
          slug: "embed",
          fields: [{ name: "url", type: "text", required: true }],
        },
        {
          slug: "code",
          fields: [
            { name: "language", type: "text", defaultValue: "ts" },
            { name: "code", type: "code", required: true },
          ],
        },
      ],
    },
  ],
};
