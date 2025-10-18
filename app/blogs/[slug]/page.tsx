import { getBlogBySlug } from "@/features/blogs/action/get-blog";
import BlogContent from "@/features/blogs/components/BlogContent";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const blogData = await getBlogBySlug(slug);

  return (
    <main className="container min-h-[calc(100vh-150px)] mx-auto pt-8 scroll-mt-28 p-2">
      <h1 className="scroll-m-20 my-4 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
        {blogData?.title}
      </h1>
      <div className="flex justify-between">
        <div>
          {/* <p className="text-muted-foreground">
            created {new Date(blogData?.createdAt).toDateString()}
          </p>
          <p className="text-muted-foreground">
            {" "}
            updated {new Date(blogData?.updatedAt).toDateString()}
          </p> */}
        </div>
        <p>by {blogData?.author.name}</p>
      </div>
      <BlogContent html={blogData?.content} />
    </main>
  );
};

export default page;
