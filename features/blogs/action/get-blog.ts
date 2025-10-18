"use server"

import connectDB from "@/lib/Database/connection";
import Blog from "@/lib/Database/Models/blog.model";

 export const getBlogBySlug = async (slug: string) => {
    try {
        await connectDB();
        const blog = await Blog.findOne({ slug });
        return blog;
    } catch (error) {
        console.error("Error fetching blog by slug:", error);
        return null;
    }
}