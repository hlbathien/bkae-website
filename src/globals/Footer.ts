import type { GlobalConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

export const FooterGlobal: GlobalConfig = {
  slug: "footer",
  admin: { group: "Globals" },
  access: { read: anyone, update: editorOrAdmin },
  fields: [
    {
      name: "columns",
      type: "array",
      fields: [
        { name: "heading", type: "text", required: true, localized: true },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true, localized: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "colophon",
      type: "array",
      fields: [{ name: "line", type: "text", required: true, localized: true }],
    },
  ],
};
