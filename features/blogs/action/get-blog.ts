"use server";

import connectDB from "@/lib/Database/connection";
import Blog, { type BlogData } from "@/lib/Database/Models/blog.model";
import { cacheTag } from "next/cache";
import { cache } from "react";

export const getBlogViews = cache(
  async (slug: string): Promise<number | null> => {
    try {
      await connectDB();
      const blog: BlogData | null = await Blog.findOneAndUpdate(
        { slug },
        { $inc: { views: 1 } },
        { timestamps: false },
      );
      if (!blog) return null;
      return blog.views;
    } catch (error) {
      console.error("Error increasing blog views:", error);
      return null;
    }
  },
);

export const getAllBlogs = cache(
  async (
    slug?: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: BlogData[]; total: number }> => {
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
  },
);

export const getBlogBySlug = cache(
  async (slug: string): Promise<BlogData | null> => {
    "use cache";
    cacheTag(slug);
    try {
      await connectDB();
      const blog = (await Blog.findOne({ slug }).lean()) as BlogData | null;
      if (!blog) return null;
      return JSON.parse(JSON.stringify(blog));
    } catch (error) {
      console.error("Error fetching blog by slug:", error);
      return null;
    }
  },
);
