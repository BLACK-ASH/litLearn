import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";

// ✅ 1. Merge your custom statements safely
const statements = {
  ...defaultStatements,
  blog: ["create", "update", "delete", "share"],
  comment: ["create", "delete"],
} as const;

// ✅ 2. Initialize access control
export const ac = createAccessControl(statements);

// ✅ 3. Define roles using `ac.newRole`
export const admin = ac.newRole({
  blog: ["create", "update", "delete", "share"],
  comment: ["create", "delete"],
});

export const editor = ac.newRole({
  blog: ["create", "update"],
  comment: ["create", "delete"],
});

export const user = ac.newRole({
  blog: ["create"],
  comment: ["create"],
});
