import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "roles"],
    group: "Admin",
  },
  auth: {
    tokenExpiration: 60 * 60 * 2, // 2h
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user?.roles?.includes("admin"),
    update: ({ req: { user } }) => !!user?.roles?.some((r: string) => ["admin"].includes(r)),
    delete: ({ req: { user } }) => !!user?.roles?.includes("admin"),
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["editor"],
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Author", value: "author" },
      ],
    },
  ],
};
