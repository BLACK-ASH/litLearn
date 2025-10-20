import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, editor, user } from "./permission";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    // Access control plugin
    adminClient({
      ac,
      roles: {
        admin,
        editor,
        user,
      },
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;

export type User = typeof authClient.$Infer.Session.user;

export const { useSession } = authClient;

// Check if the user has permission to update a blog
export const hasPermissionToUpdateBlog = async () => {

  return await authClient.admin.hasPermission({
    permissions: {
      blog: ["update"],
    },
  });

}

// Check if the user has permission to delete a blog
export const hasPermissionToDeleteBlog = async () => {

  return await authClient.admin.hasPermission({
    permissions: {
      blog: ["delete"],
    },
  });

}
