"use server";

import connectDB from "@/lib/Database/connection";
import Blog from "@/lib/Database/Models/blog.model";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/Auth/auth"; // 👈 from your Better Auth config
import { headers } from "next/headers";

interface Result {
  status: "success" | "error";
  slug: string | undefined;
  message: string;
}

export const deleteBlog = async (
  slug: string,
  authorId: string,
): Promise<Result | undefined> => {
  try {
    // ✅ Get the current session
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });
    if (!session?.user) {
      return {
        status: "error",
        slug: "",
        message: "Unauthorized access – please log in.",
      };
    }

    // ✅ Check if user has permission to delete blog
    const permissionCheck = await auth.api.userHasPermission({
      body: {
        userId: session.user.id, // current logged-in user's ID
        permissions: {
          blog: ["delete"], // 👈 adjust based on your access control
        },
      },
    });

    if (permissionCheck.success || session.user.id === authorId) {
      // ✅ Proceed with DB deletion
      await connectDB();

      const blog = await Blog.findOneAndDelete({ slug });
      if (!blog) {
        return {
          status: "error",
          slug: "",
          message: "Blog not found.",
        };
      }

      // ✅ Revalidate cache paths
      revalidatePath("/blogs");
      revalidatePath(`/blogs/${blog.slug}`);

      return {
        status: "success",
        slug: blog.slug,
        message: "Blog deleted successfully.",
      };
    }

    return {
      status: "error",
      slug: "",
      message: "You do not have permission to delete blogs.",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting blog:", error);
      return {
        status: "error",
        slug: "",
        message: error.message,
      };
    }
  }
};
