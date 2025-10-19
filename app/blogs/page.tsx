import { getAllBlogs } from "@/features/blogs/action/get-blog";
import BlogCard from "@/features/blogs/components/BlogCard";

export const metadata = {
  title: "Lit Learn - Blogs",
  description: "Blogs",
}
const page = async () => {
  const blogs = await getAllBlogs();

  return (
    <div className="container mx-auto  min-h-[calc(100vh-150px)] pt-8 scroll-mt-28 p-2">
      <h1 className="scroll-m-20 text-center text-3xl md:text-5xl xl:text-7xl text-primary uppercase font-extrabold tracking-tight text-balance">
        blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default page;
