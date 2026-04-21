import type { GlobalConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

export const ManifestoPillars: GlobalConfig = {
  slug: "manifesto-pillars",
  admin: { group: "Globals" },
  access: { read: anyone, update: editorOrAdmin },
  fields: [
    {
      name: "pillars",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        { name: "body", type: "textarea", required: true, localized: true },
        { name: "icon", type: "text", admin: { description: "lucide-react name" } },
      ],
    },
  ],
};
