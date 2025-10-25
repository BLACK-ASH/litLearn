"use server"

import connectDB from "@/lib/Database/connection";
import Blog, { type BlogData } from "@/lib/Database/Models/blog.model";
import { cache } from "react";

const increaseViews = async (slug: string): Promise<boolean> => {
  try {
    await connectDB();

    const blog: BlogData | null = await Blog.findOne({ slug });
    if (!blog) return false;

    blog.views++;

    // Save without updating the 'updatedAt' field
    await blog.save({ timestamps: false });

    return true;
  } catch (error) {
    console.error("Error increasing blog views:", error);
    return false;
  }
};


export const getAllBlogs = cache(async (): Promise<BlogData[]> => {
  try {
    await connectDB();
    const blogs = (await Blog.find().sort({ createdAt: -1 }).lean()) as unknown as BlogData[];
    if (!blogs) return [];
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return [];
  }
})


export const getBlogBySlug = cache(async (slug: string): Promise<BlogData | null> => {
  try {
    await connectDB();
    await increaseViews(slug);
    const blog = await Blog.findOne({ slug }).lean() as BlogData | null;
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
})