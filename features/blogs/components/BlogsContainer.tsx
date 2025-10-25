import type { BlogData } from "@/lib/Database/Models/blog.model";
import BlogCard from "./BlogCard";

const BlogsContainer = ({ blogs }: { blogs: BlogData[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsContainer;
