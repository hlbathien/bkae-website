import type { GlobalConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

// 5-stage pipeline visualized in Process section (horizontal scroll-jack).
// Editable from /admin. Surfaced by `fetchProcessNodes()` in cms-server.
export const ProcessFlow: GlobalConfig = {
  slug: "process-flow",
  admin: { group: "Globals" },
  access: { read: anyone, update: editorOrAdmin },
  versions: { drafts: { autosave: { interval: 800 } } },
  fields: [
    {
      name: "nodes",
      type: "array",
      minRows: 3,
      maxRows: 8,
      fields: [
        { name: "id", type: "text", required: true, admin: { description: "stable id (input/tags/writer/...)" } },
        { name: "label", type: "text", required: true, localized: true },
        { name: "desc", type: "textarea", required: true, localized: true },
        {
          name: "icon",
          type: "select",
          defaultValue: "dot",
          options: ["dot", "cpu", "tag", "pen", "database", "send", "shield", "git-branch"],
        },
      ],
    },
  ],
};
