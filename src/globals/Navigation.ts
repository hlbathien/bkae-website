import type { GlobalConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  admin: { group: "Globals" },
  access: { read: anyone, update: editorOrAdmin },
  fields: [
    {
      name: "primary",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "utility",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "label", type: "text", localized: true },
        { name: "href", type: "text" },
      ],
    },
  ],
};
