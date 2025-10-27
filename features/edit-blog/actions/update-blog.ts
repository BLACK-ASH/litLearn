"use server";

import { sanitizeHTML } from "@/features/create-blog/actions/sanitizeHtml";
import connectDB from "@/lib/Database/connection";
import Blog from "@/lib/Database/Models/blog.model";
import mongoose from "mongoose";
import { revalidatePath, updateTag } from "next/cache";
import type { EditBlogFormData } from "../components/EditBlogForm";
import { auth } from "@/lib/Auth/auth";
import { headers } from "next/headers";

interface Result {
  status: "success" | "error";
  slug: string;
  message: string;
}

export const updateBlog = async (
  data: EditBlogFormData,
): Promise<Result | undefined> => {
  try {
    // ✅ Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        status: "error",
        slug: "",
        message: "Unauthorized access – please log in.",
      };
    }

    // ✅ Check if user has permission to update blog
    const permissionCheck = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: {
          blog: ["update"], // 👈 matches your access control
        },
      },
    });

    // ✅ Allow if user is the author OR has update permission
    if (!permissionCheck.success && session.user.id !== data.author.id) {
      return {
        status: "error",
        slug: "",
        message: "You do not have permission to update this blog.",
      };
    }

    // ✅ Proceed with DB operation
    await connectDB();

    const id = new mongoose.Types.ObjectId(data.author.id);

    // 🧼 Sanitize inputs before saving
    const sanitizedTitle = await sanitizeHTML(data.title);
    const sanitizedDescription = await sanitizeHTML(data.description);
    const sanitizedContent = await sanitizeHTML(data.content);
    const sanitizedCategory = await sanitizeHTML(data.category || "General");
    const sanitizedTags =
      data.tags?.map((tag) => tag.trim().toLowerCase()) || [];

    const blog = await Blog.findOneAndUpdate(
      { slug: data.slug },
      {
        title: sanitizedTitle,
        content: sanitizedContent,
        description: sanitizedDescription,
        coverImage: data.coverImage,
        author: {
          name: data.author.name,
          id,
          image: data?.author.image ?? undefined,
        },
        tags: sanitizedTags,
        category: sanitizedCategory,
      },
      { new: true },
    );

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

    // Revalidate cache
    updateTag(blog.slug);

    return {
      status: "success",
      slug: blog.slug,
      message: "Blog updated successfully.",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating blog:", error);
      return {
        status: "error",
        slug: "",
        message: error.message,
      };
    }
  }
};
