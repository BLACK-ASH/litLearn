import { getAllBlogs } from "@/features/blogs/action/get-blog";
import BlogsContainer from "@/features/blogs/components/BlogsContainer";
import BlogsContainerSkeleton from "@/features/blogs/Skeleton/BlogsContainerSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Lit Learn - Blogs",
  description: "Blogs",
};

export const revalidate = 3600; // revalidate every hour
const page = async () => {
  const blogs = await getAllBlogs();

  return (
    <div className="container mx-auto  min-h-[calc(100vh-150px)] pt-8 scroll-mt-28 p-2">
      <h1 className="scroll-m-20 text-center text-3xl md:text-5xl xl:text-7xl text-primary uppercase font-extrabold tracking-tight text-balance">
        blogs
      </h1>
      <Suspense fallback={<BlogsContainerSkeleton />}>
        <BlogsContainer blogs={blogs} />
      </Suspense>
    </div>
  );
};

export default page;
