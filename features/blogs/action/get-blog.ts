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


export const getAllBlogs = cache(
  async (slug?: string, page = 1, limit = 10): Promise<{ data: BlogData[]; total: number }> => {
    try {
      await connectDB();

      const skip = (page - 1) * limit;
      const query: any = {};

      if (slug) {
        // Case-insensitive partial match using regex
        query.slug = { $regex: slug, $options: "i" };
      }

      const blogs = await Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<BlogData[]>();

      const total = await Blog.countDocuments(query);

      return { data: JSON.parse(JSON.stringify(blogs)), total };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return { data: [], total: 0 };
    }
  }
);


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