"use server";

import type { BlogFormData } from "@/features/create-blog/components/BlogForm";
import connectDB from "@/lib/Database/connection";
import Blog from "@/lib/Database/Models/blog.model";
import mongoose from "mongoose";
import { sanitizeHTML } from "./sanitizeHtml";

interface Result {
  status: "success" | "error";
  slug: string;
  message: string;
}

export const createBlog = async (data: BlogFormData): Promise<Result | undefined> => {
  try {
    await connectDB();

    const id = new mongoose.Types.ObjectId(data.author.id);

    // 🧼 Sanitize inputs before saving to DB
    const sanitizedTitle = await sanitizeHTML(data.title);
    const sanitizedContent = await sanitizeHTML(data.content);
    const sanitizedCategory = await sanitizeHTML(data.category || "");
    const sanitizedTags = data.tags?.map(tag => tag.trim().toLowerCase()) || [];

    const blog = await Blog.create({
      title: sanitizedTitle,
      content: sanitizedContent,
      coverImage: data.coverImage,
      author: { name: data.author.name, id },
      tags: sanitizedTags,
      category: sanitizedCategory,
    });

    return {
      status: "success",
      slug: blog.slug,
      message: "Blog created successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating blog:", error);
      return {
        status: "error",
        message: error.message,
        slug: "",
      };
    }
  }
};
