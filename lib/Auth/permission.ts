import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

// Define all actions possible in your app
const statement = {
  ...defaultStatements,
  blog: ["create", "update", "delete", "share"], // You can customize this
} as const;

// Create Access Control instance
export const ac = createAccessControl(statement);

// Define roles
export const admin = ac.newRole({
  blog: ["create", "update", "delete", "share"],
  ...adminAc.statements,
});

export const editor = ac.newRole({
  blog: ["create", "update"],
});

export const user = ac.newRole({
  blog: ["create"],
});
